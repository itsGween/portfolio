import type { ChatMessage, LLMProvider } from './llm-provider'

export class OllamaProvider implements LLMProvider {
  private url: string
  private model: string

  constructor(
    url = import.meta.env.VITE_OLLAMA_URL ?? 'http://localhost:11434',
    model = import.meta.env.VITE_OLLAMA_MODEL ?? 'llama3.2:3b'
  ) {
    this.url = url
    this.model = model
  }

  async chat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<void> {
    const res = await fetch(`${this.url}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages,
        stream: true,
      }),
    })

    if (!res.ok || !res.body) throw new Error(`Ollama error: ${res.status}`)

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      for (const line of text.split('\n')) {
        if (!line.trim()) continue
        try {
          const json = JSON.parse(line) as { message?: { content?: string }; done?: boolean }
          if (json.message?.content) onChunk(json.message.content)
          if (json.done) return
        } catch {
          // skip malformed lines
        }
      }
    }
  }
}
