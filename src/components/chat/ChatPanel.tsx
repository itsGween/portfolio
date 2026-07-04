import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { IconX, IconSend } from '@/components/ui/Icons'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import type { Message } from './ChatWidget'

interface Props {
  messages: Message[]
  typing: boolean
  input: string
  quickReplies: string[]
  onInput: (v: string) => void
  onSend: (text: string) => void
  onClose: () => void
  lang: string
  msgCount: number
  msgLimit: number
  maxInputLen: number
}

export default function ChatPanel({
  messages, typing, input, quickReplies,
  onInput, onSend, onClose, lang: _lang,
  msgCount, msgLimit, maxInputLen,
}: Props) {
  const { t } = useTranslation()
  const streamRef = useRef<HTMLDivElement>(null)
  const limited = msgCount >= msgLimit
  const remaining = msgLimit - msgCount
  const showCounter = remaining <= 3 && !limited

  useEffect(() => {
    const el = streamRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!limited) onSend(input)
  }

  return (
    <motion.div
      className="fixed right-6 bottom-[104px] z-[89] w-[378px] max-w-[calc(100vw-32px)] flex flex-col overflow-hidden rounded-[22px] border border-line"
      style={{
        height: 564,
        maxHeight: 'calc(100vh - 150px)',
        background: '#160c05',
        boxShadow: '0 34px 90px rgba(20,8,0,.62)',
      }}
      initial={{ y: 18, scale: 0.95, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 18, scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.34, ease: [0.2, 0.85, 0.25, 1] }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-[15px]"
        style={{ background: 'linear-gradient(120deg,#c2410c,#ff7d1c)' }}
      >
        <span
          className="w-11 h-11 rounded-full flex-none border-2 border-white/65"
          style={{ background: '#3a1a08 url(/assets/gween-bot.png) center -3px/155% no-repeat' }}
        />
        <div>
          <h5 className="text-[15.5px] font-bold text-white m-0 tracking-[0.01em]">{t('chat.name')}</h5>
          <small className="text-[12px] text-white/90 flex items-center gap-[6px] mt-[2px]">
            <span
              className="inline-block w-[7px] h-[7px] rounded-full"
              style={{ background: '#8dff9f', boxShadow: '0 0 0 3px rgba(141,255,159,.3)' }}
            />
            {t('chat.role')}
          </small>
        </div>
        <button
          className="ml-auto w-[34px] h-[34px] rounded-full border-0 grid place-items-center text-white cursor-pointer"
          style={{ background: 'rgba(255,255,255,.2)' }}
          onClick={onClose}
          aria-label="Fermer"
        >
          <IconX size={17} />
        </button>
      </div>

      {/* Messages stream */}
      <div
        ref={streamRef}
        className="flex-1 overflow-y-auto p-[18px_15px] flex flex-col gap-[11px]"
        style={{ background: 'radial-gradient(130% 55% at 50% 0%, #241408, #150b04)' }}
      >
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}
        {typing && <TypingIndicator />}
      </div>

      {/* Quick chips — hidden when rate-limited */}
      {!limited && (
        <div className="flex flex-wrap gap-2 px-[15px] pt-1 pb-3">
          {quickReplies.map((q) => (
            <button
              key={q}
              className="border rounded-full cursor-pointer font-semibold text-[12.5px] px-[13px] py-2 font-sans transition-all duration-200"
              style={{
                borderColor: 'rgba(255,122,24,.42)',
                background: 'rgba(255,122,24,.09)',
                color: '#ffbb63',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,122,24,.22)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,122,24,.09)'
                e.currentTarget.style.transform = ''
              }}
              onClick={() => onSend(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input / rate-limit footer */}
      {limited ? (
        <div
          className="flex flex-col items-center gap-2 p-[14px_16px] border-t border-line text-center"
          style={{ background: '#150b04' }}
        >
          <p className="text-[12.5px] leading-[1.4]" style={{ color: '#a99a8b' }}>
            {_lang === 'fr'
              ? 'Limite atteinte — contacte Gween directement :'
              : 'Limit reached — contact Gween directly:'}
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href="mailto:kangahhansberryl7@outlook.com"
              className="text-[12px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,122,24,.15)', color: '#ff9d3d' }}
            >
              📧 Email
            </a>
            <a
              href="tel:+18195928576"
              className="text-[12px] font-bold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,122,24,.15)', color: '#ff9d3d' }}
            >
              📞 819 592-8576
            </a>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col gap-1 border-t border-line"
          style={{ background: '#150b04' }}
          onSubmit={handleSubmit}
        >
          {/* Remaining count badge */}
          {showCounter && (
            <p
              className="text-center text-[11.5px] pt-2"
              style={{ color: remaining === 1 ? '#ff7a18' : '#a99a8b' }}
            >
              {_lang === 'fr'
                ? `${remaining} question${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}`
                : `${remaining} question${remaining > 1 ? 's' : ''} remaining`}
            </p>
          )}
          <div className="flex items-center gap-2 p-[10px_12px]">
            <input
              className="flex-1 rounded-full px-4 py-3 text-[14px] font-sans outline-none transition-colors"
              style={{
                background: '#241408',
                border: '1px solid rgba(255,255,255,.09)',
                color: '#f6f0e7',
              }}
              placeholder={t('chat.placeholder')}
              value={input}
              onChange={(e) => onInput(e.target.value)}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,122,24,.55)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.09)' }}
              maxLength={maxInputLen}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex-none w-[42px] h-[42px] rounded-full border-0 grid place-items-center text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg,#ff7a18,#ffbb63)' }}
              aria-label="Envoyer"
            >
              <IconSend size={18} />
            </button>
          </div>
        </form>
      )}
    </motion.div>
  )
}
