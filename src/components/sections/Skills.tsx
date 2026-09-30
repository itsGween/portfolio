import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { CARD_BG, CARD_CELL, CARD_GRID_GAP, CARD_HOVER, CARD_PADDING, CARD_SHAPE } from '@/components/ui/card'
import { getIconByName } from '@/components/ui/Icons'
import { SKILLS } from '@/data/skills'

export default function Skills() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  return (
    <section className="sec" id="competences">
      <div className="wrap">
        <SectionHeading eyebrowKey="skills.eyebrow" titleKey="skills.title" />
        <div className={`grid md:grid-cols-3 ${CARD_GRID_GAP} max-md:grid-cols-1`}>
          {SKILLS.map((skill, i) => {
            const Icon = getIconByName(skill.icon)
            // Une carte seule sur la dernière rangée s'étale sur les 3 colonnes, en bandeau horizontal.
            const wide = i === SKILLS.length - 1 && SKILLS.length % 3 === 1
            return (
              <RevealOnScroll key={skill.id} delay={i * 0.07} className={wide ? `${CARD_CELL} md:col-span-3` : CARD_CELL}>
                <motion.div
                  className={`${CARD_SHAPE} ${CARD_PADDING} ${wide ? 'md:flex md:items-center md:gap-8' : ''}`}
                  style={{ background: CARD_BG }}
                  whileHover={CARD_HOVER}
                  transition={{ duration: 0.3 }}
                >
                  <div className={wide ? 'md:flex md:items-center md:gap-4 md:shrink-0 md:w-[260px]' : ''}>
                    <div
                      className={`w-12 h-12 rounded-[12px] grid place-items-center text-o2 shrink-0 ${wide ? 'mb-[18px] md:mb-0' : 'mb-[18px]'}`}
                      style={{ background: 'rgba(255,122,24,.12)' }}
                    >
                      <Icon />
                    </div>
                    <h4 className={`text-[18px] font-semibold ${wide ? 'mb-[14px] md:mb-0' : 'mb-[14px]'}`}>{skill.title[lang]}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-[12.5px] px-3 py-[6px] rounded-[8px] border border-line"
                        style={{ background: 'rgba(255,255,255,.05)', color: '#cbb8a6' }}
                      >
                        {item}
                      </span>
                    ))}
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
