import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}

const EASING = [0.2, 0.7, 0.2, 1] as const

export default function RevealOnScroll({ children, delay = 0, className, y = 26 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: EASING, delay }}
    >
      {children}
    </motion.div>
  )
}
