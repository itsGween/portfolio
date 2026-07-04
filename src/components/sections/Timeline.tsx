import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { TIMELINE } from '@/data/timeline'

export default function Timeline() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  return (
    <section className="sec" id="parcours">
      <div className="wrap">
        <SectionHeading eyebrowKey="timeline.eyebrow" titleKey="timeline.title" center />
        <div
          className="max-w-[820px] mx-auto relative"
          style={{
            ['--before' as string]: 'content: ""',
          }}
        >
          <div
            className="absolute left-[15px] top-2 bottom-2 w-[2px]"
            style={{ background: 'linear-gradient(#ff7a18, transparent)' }}
          />
          {TIMELINE.map((e, i) => (
            <RevealOnScroll
              key={e.id}
              delay={i * 0.1}
              className={`relative pl-[56px] ${i < TIMELINE.length - 1 ? 'pb-[44px]' : ''}`}
            >
              <span
                className="absolute left-[6px] top-1 w-5 h-5 rounded-full border-[3px] border-o1"
                style={{ background: '#140b06' }}
              />
              <span
                className="text-[12.5px] font-semibold tracking-[0.06em] text-o2 uppercase block"
              >
                {e.when}
              </span>
              <h4 className="text-[21px] font-semibold mt-2 mb-1">{e.role[lang]}</h4>
              <div className="text-[14px] text-muted mb-3">{e.org}</div>
              <p className="text-[15px] leading-[1.65]" style={{ color: '#cbb8a6' }}>
                {e.desc[lang]}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
