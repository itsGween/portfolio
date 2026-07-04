import type { ChatMessage, LLMProvider } from './llm-provider'

export class GroqProvider implements LLMProvider {
  private readonly url = 'https://api.groq.com/openai/v1/chat/completions'
  private readonly apiKey: string
  private readonly model: string

  constructor(
    apiKey = import.meta.env.VITE_GROQ_API_KEY ?? '',
    model = import.meta.env.VITE_GROQ_MODEL ?? 'llama-3.3-70b-versatile',
  ) {
    this.apiKey = apiKey
    this.model = model
  }

  get available(): boolean {
    return Boolean(this.apiKey)
  }

  async chat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<void> {
    if (!this.apiKey) throw new Error('Groq API key not configured')

    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    if (!res.ok || !res.body) {
      throw new Error(`Groq ${res.status}: ${await res.text()}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      for (const line of text.split('\n')) {
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
          // ignore malformed SSE lines
        }
      }
    }
  }
}
