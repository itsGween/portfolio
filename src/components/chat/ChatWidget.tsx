import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ChatButton from './ChatButton'
import ChatTeaser from './ChatTeaser'
import ChatPanel from './ChatPanel'
import { OllamaProvider } from '@/lib/ollama-provider'
import { getFallbackResponse } from '@/lib/fallback-responses'
import { SYSTEM_PROMPT } from '@/data/knowledge-base'
import type { ChatMessage } from '@/lib/llm-provider'

export interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
}

// ── Rate-limit config ─────────────────────────────────────────────────────────
const MSG_LIMIT = 10
const MAX_INPUT_LEN = 600
// Keep only the last N exchanges in the LLM context (prevents context overflow)
const MAX_HISTORY = 14

const provider = new OllamaProvider()

export default function ChatWidget() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [userMsgCount, setUserMsgCount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'bot', text: t('chat.welcome') },
  ])
  const historyRef = useRef<ChatMessage[]>([])
  const teaserTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (dismissed) return
    teaserTimer.current = setTimeout(() => setTeaser(true), 4000)
    return () => { if (teaserTimer.current) clearTimeout(teaserTimer.current) }
  }, [dismissed])

  const addMessage = useCallback((role: Message['role'], text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role, text }])
  }, [])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return
    // ── Rate limit ──────────────────────────────────────────────────────────
    if (userMsgCount >= MSG_LIMIT) return
    // ── Input length cap ───────────────────────────────────────────────────
    const userText = text.trim().slice(0, MAX_INPUT_LEN)

    setInput('')
    addMessage('user', userText)
    setTyping(true)

    const newCount = userMsgCount + 1
    setUserMsgCount(newCount)

    // Push user message and trim history to prevent context overflow
    historyRef.current.push({ role: 'user', content: userText })
    if (historyRef.current.length > MAX_HISTORY) {
      historyRef.current = historyRef.current.slice(-MAX_HISTORY)
    }

    const systemPrompt: ChatMessage = { role: 'system', content: SYSTEM_PROMPT(lang) }
    const allMessages: ChatMessage[] = [systemPrompt, ...historyRef.current]

    let fullResponse = ''

    try {
      await provider.chat(allMessages, (chunk) => {
        fullResponse += chunk
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (last?.role === 'bot' && last.id === 'streaming') {
            return [...prev.slice(0, -1), { ...last, text: fullResponse }]
          }
          return [...prev, { id: 'streaming', role: 'bot', text: fullResponse }]
        })
      })
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.id === 'streaming') {
          return [...prev.slice(0, -1), { ...last, id: crypto.randomUUID() }]
        }
        return prev
      })
    } catch {
      fullResponse = getFallbackResponse(userText, lang)
      addMessage('bot', fullResponse)
    } finally {
      setTyping(false)
      historyRef.current.push({ role: 'assistant', content: fullResponse })

      // ── Rate limit reached: show contact CTA after last answer ──────────
      if (newCount >= MSG_LIMIT) {
        const contactMsg = lang === 'fr'
          ? `Tu as utilisé tes ${MSG_LIMIT} questions — merci de t'intéresser à Gween ! 😊\n\nPour aller plus loin, contacte-la directement :\n📧 kangahhansberryl7@outlook.com\n📞 819 592-8576`
          : `You've used your ${MSG_LIMIT} questions — thanks for your interest in Gween! 😊\n\nTo continue, contact her directly:\n📧 kangahhansberryl7@outlook.com\n📞 819 592-8576`
        setTimeout(() => addMessage('bot', contactMsg), 900)
      }
    }
  }, [userMsgCount, addMessage, lang])

  const quickReplies = t('chat.quick', { returnObjects: true }) as string[]

  return (
    <>
      <AnimatePresence>
        {teaser && !open && !dismissed && (
          <ChatTeaser
            text={t('chat.teaser')}
            onOpen={() => { setOpen(true); setTeaser(false) }}
            onDismiss={() => { setTeaser(false); setDismissed(true) }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <ChatPanel
            messages={messages}
            typing={typing}
            input={input}
            quickReplies={quickReplies}
            onInput={setInput}
            onSend={sendMessage}
            onClose={() => setOpen(false)}
            lang={lang}
            msgCount={userMsgCount}
            msgLimit={MSG_LIMIT}
            maxInputLen={MAX_INPUT_LEN}
          />
        )}
      </AnimatePresence>

      <ChatButton
        hidden={open}
        onClick={() => { setOpen(true); setTeaser(false) }}
      />
    </>
  )
}
