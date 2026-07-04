export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface LLMProvider {
  chat(messages: ChatMessage[], onChunk: (chunk: string) => void): Promise<void>
}
