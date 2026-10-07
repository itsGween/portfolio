import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ChatButton from './ChatButton'
import ChatTeaser from './ChatTeaser'
import ChatPanel from './ChatPanel'
import { ChatApiProvider, RateLimitError } from '@/lib/chat-api-provider'
import { OllamaProvider } from '@/lib/ollama-provider'
import { getFallbackResponse } from '@/lib/fallback-responses'
import { SYSTEM_PROMPT } from '@/data/knowledge-base'
import type { ChatMessage, LLMProvider } from '@/lib/llm-provider'

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

// /api/chat (Groq côté serveur) → mots-clés en repli.
// En local sans `vercel dev`, VITE_CHAT_PROVIDER=ollama utilise Ollama à la place.
const useOllama = import.meta.env.VITE_CHAT_PROVIDER === 'ollama'

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
  const langRef = useRef(lang)
  langRef.current = lang
  const [provider] = useState<LLMProvider>(() =>
    useOllama ? new OllamaProvider() : new ChatApiProvider(() => langRef.current),
  )
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

    // Ollama (local) reçoit le system prompt ici ; /api/chat l'ajoute côté serveur.
    const allMessages: ChatMessage[] = useOllama
      ? [{ role: 'system', content: SYSTEM_PROMPT(lang) }, ...historyRef.current]
      : [...historyRef.current]

    let fullResponse = ''
    let serverRateLimited = false

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
    } catch (err) {
      if (err instanceof RateLimitError) {
        // 429 de notre serveur : message poli, pas de repli par mots-clés.
        serverRateLimited = true
        addMessage('bot', t('chat.rateLimited', { seconds: err.retryAfter }))
      } else {
        console.warn('[Gigi] LLM indisponible, réponse de repli utilisée :', err)
        fullResponse = getFallbackResponse(userText, lang)
        addMessage('bot', fullResponse)
      }
    } finally {
      setTyping(false)

      if (serverRateLimited) {
        // Question non traitée : elle sort de l'historique et ne compte pas dans le quota.
        historyRef.current.pop()
        setUserMsgCount((c) => c - 1)
      } else {
        historyRef.current.push({ role: 'assistant', content: fullResponse })

        // ── Rate limit reached: show contact CTA after last answer ──────────
        if (newCount >= MSG_LIMIT) {
          const contactMsg = lang === 'fr'
            ? `Tu as utilisé tes ${MSG_LIMIT} questions — merci de t'intéresser à Gween ! 😊\n\nPour aller plus loin, contacte-la directement :\n📧 gween.hkangah@gmail.com\n📞 819 592-8576`
            : `You've used your ${MSG_LIMIT} questions — thanks for your interest in Gween! 😊\n\nTo continue, contact her directly:\n📧 gween.hkangah@gmail.com\n📞 819 592-8576`
          setTimeout(() => addMessage('bot', contactMsg), 900)
        }
      }
    }
  }, [userMsgCount, addMessage, lang, provider, t])

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
