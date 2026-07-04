import { motion } from 'framer-motion'

interface Props {
  text: string
  onOpen: () => void
  onDismiss: () => void
}

export default function ChatTeaser({ text, onOpen, onDismiss }: Props) {
  return (
    <motion.div
      className="fixed right-[100px] bottom-9 z-[88] rounded-[14px_14px_4px_14px] cursor-pointer max-w-[214px] leading-[1.42] text-[13.5px]"
      style={{
        background: '#f6f0e7',
        color: '#2a1706',
        padding: '12px 32px 12px 16px',
        boxShadow: '0 14px 34px rgba(30,10,0,.32)',
        animation: 'tpop .4s ease both',
      }}
      exit={{ opacity: 0, y: 10 }}
      onClick={onOpen}
    >
      {text.split('Gigi').map((part, i, arr) =>
        i < arr.length - 1
          ? <span key={i}>{part}<b style={{ color: '#c2410c' }}>Gigi</b></span>
          : <span key={i}>{part}</span>
      )}
      <button
        className="absolute top-[5px] right-[9px] border-0 bg-transparent text-[17px] leading-none p-0 cursor-pointer"
        style={{ color: '#9a8369' }}
        aria-label="Fermer"
        onClick={(e) => { e.stopPropagation(); onDismiss() }}
      >
        ×
      </button>
    </motion.div>
  )
}
