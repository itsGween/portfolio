// Limitation de débit de /api/chat : fenêtre glissante de 60 s, par IP et globale.
//
// LIMITE CONNUE : les compteurs vivent dans la mémoire de l'instance. Sur Vercel,
// chaque instance de la fonction a sa propre mémoire et elle est perdue au
// redémarrage : sous forte charge (plusieurs instances), un visiteur peut donc
// dépasser 10 req/min au total. C'est une protection de base, pas une garantie.
// Pour une limite exacte, remplacer ces compteurs par un stockage partagé
// (ex. Upstash Redis + @upstash/ratelimit, slidingWindow(10, '60 s')).
//
// Le préfixe « _ » du fichier empêche Vercel de l'exposer comme route.

const WINDOW_MS = 60_000
export const IP_LIMIT = 10
export const GLOBAL_LIMIT = 60
const MAX_TRACKED_IPS = 5000

const ipHits = new Map<string, number[]>()
let globalHits: number[] = []

// Sur Vercel, x-forwarded-for est écrit par la plateforme (non falsifiable par le
// client). L'IP n'est jamais lue dans le corps de la requête.
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown'
}

function retryAfterSeconds(hits: number[], now: number): number {
  return Math.max(1, Math.ceil((hits[0] + WINDOW_MS - now) / 1000))
}

function tooManyRequests(scope: 'ip' | 'global', retryAfter: number): Response {
  return new Response(
    JSON.stringify({
      error: 'rate_limited',
      scope,
      message: `Too many requests. Retry in ${retryAfter} seconds.`,
      retry_after: retryAfter,
    }),
    {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) },
    },
  )
}

// Renvoie une réponse 429 si la requête dépasse une limite, sinon null (et la
// requête est comptée). Les requêtes refusées ne sont pas comptées.
export function rateLimitResponse(request: Request, now: number = Date.now()): Response | null {
  const cutoff = now - WINDOW_MS
  const ip = getClientIp(request)

  const hits = (ipHits.get(ip) ?? []).filter((t) => t > cutoff)
  if (hits.length >= IP_LIMIT) {
    ipHits.set(ip, hits)
    return tooManyRequests('ip', retryAfterSeconds(hits, now))
  }

  globalHits = globalHits.filter((t) => t > cutoff)
  if (globalHits.length >= GLOBAL_LIMIT) {
    return tooManyRequests('global', retryAfterSeconds(globalHits, now))
  }

  // Purge des IP inactives pour borner la mémoire.
  if (ipHits.size >= MAX_TRACKED_IPS) {
    for (const [key, value] of ipHits) {
      if (value.every((t) => t <= cutoff)) ipHits.delete(key)
    }
  }

  hits.push(now)
  ipHits.set(ip, hits)
  globalHits.push(now)
  return null
}
