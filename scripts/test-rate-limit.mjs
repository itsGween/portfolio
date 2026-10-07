// Vérifie la limitation de débit de /api/chat.
//
//   node scripts/test-rate-limit.mjs                 → test local du limiteur (aucun appel à Groq)
//   node scripts/test-rate-limit.mjs https://site    → 11 vraies requêtes sur <site>/api/chat
//                                                      (consomme jusqu'à 10 appels Groq)
//
// Nécessite Node ≥ 22.18 (import direct du fichier TypeScript).

import assert from 'node:assert/strict'

const target = process.argv[2]

if (target) {
  const url = new URL('/api/chat', target)
  const body = JSON.stringify({ lang: 'fr', messages: [{ role: 'user', content: 'Bonjour' }] })
  const statuses = []
  let last
  for (let i = 0; i < 11; i++) {
    last = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    statuses.push(last.status)
    if (i < 10) await last.body?.cancel()
  }
  console.log(`Statuts : ${statuses.join(', ')}`)
  assert.equal(last.status, 429, 'la 11e requête doit recevoir un 429')
  assert.ok(last.headers.get('Retry-After'), 'en-tête Retry-After attendu')
  console.log(`OK : 11e requête → 429, Retry-After = ${last.headers.get('Retry-After')} s`, await last.json())
} else {
  const { rateLimitResponse, IP_LIMIT, GLOBAL_LIMIT } = await import('../api/_rate-limit.ts')
  const req = (headers) => new Request('http://localhost/api/chat', { method: 'POST', headers })
  const t0 = 1_000_000

  // 1. Limite par IP : 10 requêtes passent, la 11e reçoit un 429.
  for (let i = 0; i < IP_LIMIT; i++) {
    assert.equal(rateLimitResponse(req({ 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }), t0 + i), null)
  }
  const blocked = rateLimitResponse(req({ 'x-forwarded-for': '203.0.113.7' }), t0 + 500)
  assert.equal(blocked?.status, 429)
  assert.equal(blocked.headers.get('Retry-After'), '60')
  assert.deepEqual(await blocked.json(), {
    error: 'rate_limited',
    scope: 'ip',
    message: 'Too many requests. Retry in 60 seconds.',
    retry_after: 60,
  })

  // 2. Une autre IP n'est pas affectée ; x-real-ip sert de secours.
  assert.equal(rateLimitResponse(req({ 'x-forwarded-for': '198.51.100.1' }), t0 + 600), null)
  assert.equal(rateLimitResponse(req({ 'x-real-ip': '198.51.100.2' }), t0 + 700), null)

  // 3. La fenêtre glisse : la première IP repasse après 60 s.
  assert.equal(rateLimitResponse(req({ 'x-forwarded-for': '203.0.113.7' }), t0 + 61_000), null)

  // 4. Plafond global : 60 requêtes d'IP différentes passent, la 61e reçoit un 429.
  const t1 = t0 + 200_000
  for (let i = 0; i < GLOBAL_LIMIT; i++) {
    assert.equal(rateLimitResponse(req({ 'x-forwarded-for': `192.0.2.${i}` }), t1 + i), null)
  }
  const globalBlocked = rateLimitResponse(req({ 'x-forwarded-for': '192.0.2.200' }), t1 + 1000)
  assert.equal(globalBlocked?.status, 429)
  assert.equal((await globalBlocked.json()).scope, 'global')
  assert.ok(globalBlocked.headers.get('Retry-After'))

  console.log('OK : 11e requête par IP → 429 ; 61e requête globale → 429 ; Retry-After présent.')
}
