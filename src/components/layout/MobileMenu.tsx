import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { IconX } from '@/components/ui/Icons'

interface Link { label: string; href: string }

interface Props {
  links: Link[]
  onClose: () => void
  onToggleLang: () => void
  lang: string
}

export default function MobileMenu({ links, onClose, onToggleLang, lang }: Props) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="fixed inset-0 z-[49] flex flex-col justify-center px-10 gap-1.5"
      style={{ background: 'linear-gradient(160deg,#2a1103,#140b06)' }}
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full border border-line bg-white/5 text-cream flex items-center justify-center"
        aria-label="Close menu"
      >
        <IconX />
      </button>

      {links.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          onClick={onClose}
          className="font-display text-[44px] text-cream border-b border-line py-2"
        >
          <span className="font-sans text-[14px] text-o2 mr-4">0{i + 1}</span>
          {l.label}
        </a>
      ))}

      <a
        href="#contact"
        onClick={onClose}
        className="font-display text-[44px] text-cream border-b border-line py-2"
      >
        <span className="font-sans text-[14px] text-o2 mr-4">06</span>
        {t('nav.contact')}
      </a>

      <div className="flex gap-6 mt-8">
        <button
          onClick={onToggleLang}
          className="text-sm font-semibold text-o2 border border-o1/30 px-4 py-2 rounded-full"
        >
          {lang === 'fr' ? 'Switch to EN' : 'Passer en FR'}
        </button>
        <a
          href="/CV_Gween_Kangah_FAC.docx"
          download
          className="text-sm font-semibold text-cream border border-line px-4 py-2 rounded-full"
        >
          Télécharger CV
        </a>
      </div>
    </motion.div>
  )
}
