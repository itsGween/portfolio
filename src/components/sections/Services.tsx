import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { getIconByName } from '@/components/ui/Icons'
import { SERVICES } from '@/data/services'

export default function Services() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  return (
    <section className="sec" id="services" style={{ background: '#1c1109' }}>
      <div className="wrap">
        <SectionHeading eyebrowKey="services.eyebrow" titleKey="services.title" />
        <div
          className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden border border-line"
          style={{ gap: '1px', background: 'rgba(255,255,255,.09)' }}
        >
          {SERVICES.map((s, i) => {
            const Icon = getIconByName(s.icon)
            return (
              <RevealOnScroll key={s.id} delay={i * 0.08}>
                <motion.div
                  className="flex gap-[22px] p-10 max-md:p-6"
                  style={{ background: '#1c1109' }}
                  whileHover={{ background: '#211308' }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="flex-none w-[52px] h-[52px] rounded-[13px] grid place-items-center text-[#1a0d04]"
                    style={{ background: 'linear-gradient(135deg,#ff7a18,#ffbb63)' }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <h4 className="text-[20px] font-semibold mb-[10px]">{s.title[lang]}</h4>
                    <p className="text-[14.5px] leading-[1.6] text-muted">{s.desc[lang]}</p>
                  </div>
                </motion.div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
