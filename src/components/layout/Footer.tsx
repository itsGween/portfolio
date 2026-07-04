import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink border-t border-line py-8">
      <div className="wrap flex justify-between items-center flex-wrap gap-4">
        <p className="text-[13px] text-muted">{t('footer.copy')}</p>
        <div className="flex gap-6 flex-wrap">
          <a href="#top" className="text-[13px] text-muted hover:text-o2 transition-colors">
            {t('footer.top')}
          </a>
          <a href="#projets" className="text-[13px] text-muted hover:text-o2 transition-colors">
            {t('footer.projects')}
          </a>
          <a href="/blog" className="text-[13px] text-muted hover:text-o2 transition-colors">
            Blog
          </a>
          <a href="#contact" className="text-[13px] text-muted hover:text-o2 transition-colors">
            {t('footer.contact')}
          </a>
        </div>
      </div>
    </footer>
  )
}
