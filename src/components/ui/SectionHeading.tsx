import { useTranslation } from 'react-i18next'
import RevealOnScroll from './RevealOnScroll'

interface Props {
  eyebrowKey: string
  titleKey: string
  center?: boolean
  className?: string
}

export default function SectionHeading({ eyebrowKey, titleKey, center, className }: Props) {
  const { t } = useTranslation()
  const raw = t(titleKey)

  const title = raw
    .replace('{{grad}}', '<span class="grad">')
    .replace('{{/grad}}', '</span>')

  return (
    <RevealOnScroll
      className={`max-w-[640px] mb-14 ${center ? 'mx-auto text-center' : ''} ${className ?? ''}`}
    >
      <span className="eyebrow">{t(eyebrowKey)}</span>
      <h2
        className="text-[clamp(34px,5vw,58px)] leading-[1.02] mt-4 font-semibold tracking-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </RevealOnScroll>
  )
}
