import { motion } from 'framer-motion'

interface Props {
  hidden: boolean
  onClick: () => void
}

export default function ChatButton({ hidden, onClick }: Props) {
  return (
    <motion.button
      className="fixed right-6 bottom-6 z-[90] w-[66px] h-[66px] p-0 bg-transparent border-0 cursor-pointer"
      aria-label="Ouvrir le chat"
      onClick={onClick}
      animate={{ opacity: hidden ? 0 : 1, scale: hidden ? 0.5 : 1 }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      transition={{ duration: 0.2 }}
    >
      {/* Disc */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg,#ff7a18,#ffbb63)',
          boxShadow: '0 14px 32px rgba(120,45,0,.5)',
        }}
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.25 }}
      />

      {/* Peek image */}
      <img
        src="/assets/gween-bot.png"
        alt=""
        className="absolute pointer-events-none select-none"
        style={{
          left: '50%', top: -32, width: 76,
          transform: 'translateX(-50%)',
          filter: 'drop-shadow(0 6px 10px rgba(40,12,0,.4))',
        }}
      />

      {/* Online pulse */}
      <span
        className="absolute right-[3px] top-[3px] w-[14px] h-[14px] rounded-full z-[3] border-2 border-white"
        style={{ background: '#5bd67a' }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: '#5bd67a',
            animation: 'pulse-ring 1.8s ease-out infinite',
          }}
        />
      </span>
    </motion.button>
  )
}
