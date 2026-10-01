import { SYSTEM_PROMPT } from '../src/data/knowledge-base.js'

// Proxy serveur vers Groq : la clé reste dans les variables d'environnement Vercel
// (GROQ_API_KEY, sans préfixe VITE_) et n'est jamais envoyée au navigateur.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MAX_MESSAGES = 14
const MAX_CONTENT_LEN = 600

interface IncomingMessage {
  role: 'user' | 'assistant'
  content: string
}

function isValidMessage(m: unknown): m is IncomingMessage {
  if (typeof m !== 'object' || m === null) return false
  const { role, content } = m as Record<string, unknown>
  return (role === 'user' || role === 'assistant') && typeof content === 'string' && content.length <= MAX_CONTENT_LEN
}

function json(status: number, body: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return json(503, { error: 'llm_not_configured' })

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return json(400, { error: 'invalid_json' })
  }

  const { messages, lang } = (payload ?? {}) as { messages?: unknown; lang?: unknown }
  if (lang !== 'fr' && lang !== 'en') return json(400, { error: 'invalid_lang' })
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES || !messages.every(isValidMessage)) {
    return json(400, { error: 'invalid_messages' })
  }

  // llama-3.3-70b-versatile est réservé aux comptes Enterprise chez Groq (404 model_not_found
  // avec une clé standard) : on utilise gpt-oss-120b, surchargeable par GROQ_MODEL.
  const model = process.env.GROQ_MODEL ?? 'openai/gpt-oss-120b'
  const isReasoningModel = model.startsWith('openai/gpt-oss')

  const upstream = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT(lang) }, ...messages],
      stream: true,
      // Les modèles de raisonnement consomment des jetons avant de répondre : marge plus large.
      max_tokens: isReasoningModel ? 1024 : 512,
      temperature: 0,
      ...(isReasoningModel ? { reasoning_effort: 'low' } : {}),
    }),
  })

  if (!upstream.ok || !upstream.body) {
    // Message complet journalisé côté serveur (logs Vercel) ; le client ne reçoit que
    // le statut et le code d'erreur Groq (ex. invalid_api_key), utiles au diagnostic.
    const detail = await upstream.text()
    console.error(`[api/chat] Groq ${upstream.status}: ${detail.slice(0, 300)}`)
    let code = 'unknown'
    try {
      const parsed = JSON.parse(detail) as { error?: { code?: string; type?: string } }
      code = parsed.error?.code ?? parsed.error?.type ?? code
    } catch {
      // corps non JSON
    }
    return json(502, { error: 'llm_upstream_error', upstream_status: String(upstream.status), upstream_code: code })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
