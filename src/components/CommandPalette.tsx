import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { IconSearch, IconArrow, IconDownload } from '@/components/ui/Icons'

interface PaletteItem {
  id: string
  label: string
  group: string
  action: () => void
  icon?: React.ReactNode
}

export default function CommandPalette() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const items: PaletteItem[] = [
    { id: 'projects',  label: t('nav.projects'),  group: t('palette.sections.nav'),     action: () => document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' }), icon: <IconArrow size={14} /> },
    { id: 'about',     label: t('nav.about'),     group: t('palette.sections.nav'),     action: () => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' }), icon: <IconArrow size={14} /> },
    { id: 'skills',    label: t('nav.skills'),    group: t('palette.sections.nav'),     action: () => document.getElementById('competences')?.scrollIntoView({ behavior: 'smooth' }), icon: <IconArrow size={14} /> },
    { id: 'services',  label: t('nav.services'),  group: t('palette.sections.nav'),     action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), icon: <IconArrow size={14} /> },
    { id: 'blog',      label: t('nav.blog'),      group: t('palette.sections.nav'),     action: () => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' }), icon: <IconArrow size={14} /> },
    { id: 'contact',   label: t('nav.contact'),   group: t('palette.sections.nav'),     action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), icon: <IconArrow size={14} /> },
    { id: 'cv',        label: t('cv.download'),   group: t('palette.sections.actions'), action: () => { const a = document.createElement('a'); a.href = '/CV_Gween_Kangah_FAC.docx'; a.download = ''; a.click() }, icon: <IconDownload size={14} /> },
    { id: 'lang-fr',   label: 'Passer en Français', group: t('palette.sections.actions'), action: () => { i18n.changeLanguage('fr'); localStorage.setItem('lang', 'fr') } },
    { id: 'lang-en',   label: 'Switch to English',   group: t('palette.sections.actions'), action: () => { i18n.changeLanguage('en'); localStorage.setItem('lang', 'en') } },
    { id: 'email',     label: 'kangahhansberryl7@outlook.com', group: t('palette.sections.actions'), action: () => window.location.href = 'mailto:kangahhansberryl7@outlook.com', icon: <IconArrow size={14} /> },
  ]

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const groups = [...new Set(filtered.map((i) => i.group))]

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        setQuery('')
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const select = (item: PaletteItem) => {
    item.action()
    setOpen(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60"
            style={{ backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed z-[101] top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[580px] mx-4 rounded-[20px] overflow-hidden border border-line"
            style={{
              background: '#1c1109',
              boxShadow: '0 40px 80px rgba(0,0,0,.6)',
            }}
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-line">
              <IconSearch className="text-muted flex-none" size={18} />
              <input
                ref={inputRef}
                className="flex-1 bg-transparent text-cream text-[15px] outline-none font-sans placeholder-muted"
                placeholder={t('palette.placeholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="text-[11px] text-muted border border-line rounded px-1.5 py-0.5 font-sans">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-[360px] overflow-y-auto py-2">
              {groups.map((group) => (
                <div key={group}>
                  <div className="px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-muted">
                    {group}
                  </div>
                  {filtered.filter((i) => i.group === group).map((item) => (
                    <button
                      key={item.id}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 text-cream text-[14px]"
                      onClick={() => select(item)}
                    >
                      <span className="text-muted">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-muted text-[14px]">
                  Aucun résultat pour &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-line px-4 py-2 flex gap-3 text-[12px] text-muted">
              <span><kbd className="border border-line rounded px-1">↑↓</kbd> naviguer</span>
              <span><kbd className="border border-line rounded px-1">↵</kbd> sélectionner</span>
              <span><kbd className="border border-line rounded px-1">Ctrl K</kbd> fermer</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
