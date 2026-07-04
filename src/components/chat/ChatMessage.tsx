import type { Message } from './ChatWidget'

interface Props { message: Message }

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-[9px] items-end max-w-[90%] ${isUser ? 'self-end flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <span
          className="flex-none w-7 h-7 rounded-full"
          style={{ background: '#3a1a08 url(/assets/gween-bot.png) center -2px/150% no-repeat' }}
        />
      )}
      <div
        className="px-[14px] py-[11px] text-[14px] leading-[1.5] whitespace-pre-line overflow-wrap-anywhere rounded-[16px]"
        style={{
          background: isUser
            ? 'linear-gradient(135deg,#ff7a18,#ff9d3d)'
            : '#2a1a0e',
          color: isUser ? '#241204' : '#f6f0e7',
          fontWeight: isUser ? 500 : 400,
          borderBottomLeftRadius: isUser ? 16 : 5,
          borderBottomRightRadius: isUser ? 5 : 16,
        }}
      >
        {message.text}
      </div>
    </div>
  )
}
