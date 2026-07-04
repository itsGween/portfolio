import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrolled } from '@/hooks/useScrolled'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { IconMenu, IconDownload, IconGlobe } from '@/components/ui/Icons'
import MobileMenu from './MobileMenu'

const SECTION_IDS = ['projets', 'apropos', 'competences', 'services']

export default function Nav() {
  const { t, i18n } = useTranslation()
  const scrolled = useScrolled()
  const active = useScrollSpy(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: t('nav.projects'),  href: '#projets',     id: 'projets'     },
    { label: t('nav.about'),     href: '#apropos',     id: 'apropos'     },
    { label: t('nav.skills'),    href: '#competences', id: 'competences' },
    { label: t('nav.services'),  href: '#services',    id: 'services'    },
    { label: t('nav.blog'),      href: '/blog',        id: 'blog'        },
  ]

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
    document.documentElement.lang = next
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-transparent transition-[background,border-color,padding] duration-350"
        animate={{
          background: scrolled ? 'rgba(20,11,6,0.82)' : 'transparent',
          borderColor: scrolled ? 'rgba(255,255,255,0.09)' : 'transparent',
          paddingTop: scrolled ? '14px' : '20px',
          paddingBottom: scrolled ? '14px' : '20px',
          backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.35 }}
        style={{ paddingLeft: '40px', paddingRight: '40px' }}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-[11px] font-display text-[22px] tracking-[0.02em]">
          <span
            className="w-[34px] h-[34px] rounded-[9px] grid place-items-center text-[#1a0d04] font-display text-[19px]"
            style={{ background: 'linear-gradient(135deg,#ff7a18,#ffbb63)' }}
          >
            G
          </span>
          GWEEN K.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-[34px] items-center">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="relative text-[14px] font-medium text-cream/70 hover:text-cream/100 transition-opacity duration-200"
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-[7px] h-[2px] rounded-sm bg-o1"
                />
              )}
            </a>
          ))}

          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-cream/70 hover:text-cream transition-colors"
            aria-label="Toggle language"
          >
            <IconGlobe size={14} />
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* CV download */}
          <a
            href="/CV_Gween_Kangah_FAC.docx"
            download
            className="flex items-center gap-2 text-[12px] font-bold tracking-[0.02em] px-3 py-1.5 rounded-full border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/50 transition-colors"
          >
            <IconDownload size={13} />
            CV
          </a>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-[11px] rounded-full bg-cream text-[#1a0d04] text-[13px] font-bold tracking-[0.02em]"
          >
            {t('nav.contact')}
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden w-[46px] h-[46px] rounded-full border border-line bg-white/5 text-cream flex items-center justify-center"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <IconMenu />
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            links={links}
            onClose={() => setMenuOpen(false)}
            onToggleLang={toggleLang}
            lang={i18n.language}
          />
        )}
      </AnimatePresence>
    </>
  )
}
