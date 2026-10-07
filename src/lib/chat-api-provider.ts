import type { ChatMessage, LLMProvider } from './llm-provider'

// Levée quand /api/chat répond 429 (limite de débit du serveur, pas celle de Groq).
export class RateLimitError extends Error {
  readonly retryAfter: number

  constructor(retryAfter: number) {
    super(`/api/chat 429: retry after ${retryAfter}s`)
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

// Appelle la fonction serveur /api/chat (api/chat.ts), qui détient la clé Groq.
// Le system prompt est ajouté côté serveur : on n'envoie que l'historique.
export class ChatApiProvider implements LLMProvider {
  private readonly lang: () => 'fr' | 'en'

  constructor(lang: () => 'fr' | 'en') {
    this.lang = lang
  }

  async chat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<void> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang: this.lang(),
        messages: messages.filter((m) => m.role !== 'system'),
      }),
    })

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get('Retry-After'))
      throw new RateLimitError(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 60)
    }

    if (!res.ok || !res.body) {
      throw new Error(`/api/chat ${res.status}: ${await res.text()}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      // Une ligne SSE peut être coupée entre deux paquets : on garde la fin incomplète.
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue
        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') return
        try {
          const json = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string } }>
          }
          const content = json.choices?.[0]?.delta?.content
          if (content) onChunk(content)
        } catch {
          // ligne SSE mal formée : ignorée
        }
      }
    }
  }
}
