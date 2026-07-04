import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { IconArrow } from '@/components/ui/Icons'
import { PROJECTS } from '@/data/projects'

export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  return (
    <section className="sec" id="projets">
      <div className="wrap">
        <SectionHeading eyebrowKey="projects.eyebrow" titleKey="projects.title" />
        <div className="grid md:grid-cols-2 gap-[26px] max-md:grid-cols-1">
          {PROJECTS.map((p, i) => (
            <RevealOnScroll key={p.id} delay={i * 0.08} className={p.featured ? 'md:col-span-2' : ''}>
              <motion.div
                className="relative rounded-[22px] overflow-hidden p-[34px] min-h-[320px] flex flex-col justify-between border border-line"
                style={{
                  background: p.featured
                    ? 'linear-gradient(120deg, #3a1502, #c2410c 90%, #ff7d1c)'
                    : 'linear-gradient(160deg, #241608, #160c05)',
                }}
                whileHover={{ y: -6, boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}
                transition={{ duration: 0.35 }}
              >
                {/* Number */}
                <span
                  className="absolute right-[26px] top-[24px] font-display text-[34px]"
                  style={{ color: 'rgba(255,255,255,.14)' }}
                >
                  {p.no}
                </span>

                <div>
                  <span
                    className="flex items-center gap-[10px] text-[12px] font-semibold tracking-[0.12em] uppercase"
                    style={{ color: p.featured ? '#ffe0bd' : '#ffbb63' }}
                  >
                    {p.kicker[lang]}
                  </span>
                  <h3
                    className={`leading-[1.05] my-[14px_0_12px] ${p.featured ? 'font-display font-normal' : 'font-semibold text-[30px]'}`}
                    style={{ fontSize: p.featured ? 'clamp(38px, 5vw, 60px)' : undefined }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.6] max-w-[520px]"
                    style={{ color: p.featured ? 'rgba(255,255,255,.92)' : '#cbb8a6' }}
                  >
                    {p.desc[lang]}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mt-[22px]">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[12px] px-[11px] py-[5px] rounded-[7px]"
                        style={{
                          background: p.featured ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.08)',
                          color: p.featured ? '#fff' : '#e7d8c8',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <motion.span
                    className="inline-flex items-center gap-2 font-bold text-[14px] text-white mt-6 cursor-default"
                    whileHover="hover"
                  >
                    {t('projects.cta')}
                    <motion.span
                      className="w-[30px] h-[30px] rounded-full grid place-items-center"
                      style={{ background: 'rgba(255,255,255,.14)' }}
                      variants={{ hover: { x: 3, y: -3 } }}
                      transition={{ duration: 0.25 }}
                    >
                      <IconArrow size={13} />
                    </motion.span>
                  </motion.span>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
