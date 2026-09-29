import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { IconArrow, IconGit, IconChevronDown, IconExternalLink } from '@/components/ui/Icons'
import { PROJECTS } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const EASING = [0.2, 0.7, 0.2, 1] as const

export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'
  const reducedMotion = useReducedMotion()
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="sec" id="projets">
      <div className="wrap">
        <SectionHeading eyebrowKey="projects.eyebrow" titleKey="projects.title" />
        <div className="grid md:grid-cols-2 gap-[26px] max-md:grid-cols-1">
          {PROJECTS.map((p, i) => {
            const hasDetail = Boolean(
              p.longDesc || p.architectureDiagram || (p.screenshots && p.screenshots.length > 0) || (p.docsLinks && p.docsLinks.length > 0)
            )
            const open = openIds.has(p.id)
            const detailId = `proj-detail-${p.id}`
            const mutedColor = p.featured ? 'rgba(255,255,255,.92)' : '#cbb8a6'
            const accentColor = p.featured ? '#ffe0bd' : '#ffbb63'

            return (
              <RevealOnScroll key={p.id} delay={i * 0.08} className={p.featured ? 'md:col-span-2' : ''}>
                <motion.div
                  className="relative rounded-[22px] overflow-hidden p-[34px] min-h-[320px] flex flex-col justify-between border border-line"
                  style={{
                    background: p.featured
                      ? 'linear-gradient(120deg, #3a1502, #c2410c 90%, #ff7d1c)'
                      : 'linear-gradient(160deg, #241608, #160c05)',
                  }}
                  whileHover={reducedMotion ? undefined : { y: -6, boxShadow: '0 30px 60px rgba(0,0,0,.4)' }}
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
                      style={{ color: accentColor }}
                    >
                      {p.kicker[lang]}
                    </span>
                    {p.status && (
                      <span
                        className="inline-flex items-center gap-[7px] mt-[12px] text-[12px] font-semibold rounded-full px-[11px] py-[4px] border"
                        style={{ color: accentColor, borderColor: 'rgba(255,187,99,.35)', background: 'rgba(255,187,99,.08)' }}
                      >
                        <span aria-hidden="true" className="w-[6px] h-[6px] rounded-full" style={{ background: accentColor }} />
                        {p.status[lang]}
                      </span>
                    )}
                    <h3
                      className={`leading-[1.05] mt-[14px] mb-[12px] ${p.featured ? 'font-display font-normal' : 'font-semibold text-[30px]'}`}
                      style={{ fontSize: p.featured ? 'clamp(38px, 5vw, 60px)' : undefined }}
                    >
                      {p.name}
                    </h3>
                    <p className="text-[15px] leading-[1.6] max-w-[520px]" style={{ color: mutedColor }}>
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

                    {(p.github || hasDetail) && (
                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        {p.github && (
                          <motion.a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-[16px] py-[9px]"
                            style={{ color: p.featured ? '#fff' : '#e7d8c8' }}
                            initial={{ backgroundColor: p.featured ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.08)' }}
                            whileHover={{ backgroundColor: p.featured ? 'rgba(0,0,0,.34)' : 'rgba(255,255,255,.16)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconGit size={15} />
                            {t('projects.github')}
                          </motion.a>
                        )}
                        {hasDetail && (
                          <motion.button
                            type="button"
                            aria-expanded={open}
                            aria-controls={detailId}
                            onClick={() => toggle(p.id)}
                            className="inline-flex items-center gap-2 text-[13px] font-semibold rounded-full px-[16px] py-[9px]"
                            style={{ color: p.featured ? '#fff' : '#e7d8c8' }}
                            initial={{ backgroundColor: p.featured ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.08)' }}
                            whileHover={{ backgroundColor: p.featured ? 'rgba(0,0,0,.34)' : 'rgba(255,255,255,.16)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.span
                              className="grid place-items-center"
                              animate={{ rotate: open ? 180 : 0 }}
                              transition={{ duration: reducedMotion ? 0 : 0.25 }}
                            >
                              <IconChevronDown size={15} />
                            </motion.span>
                            {open ? t('projects.architectureHide') : t('projects.architecture')}
                          </motion.button>
                        )}
                      </div>
                    )}

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

                    {hasDetail && (
                      // Wrapper toujours monté : `detailId` doit exister dans le DOM même fermé,
                      // sinon aria-controls du bouton pointe vers un id absent (WCAG 4.1.2).
                      <div id={detailId}>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              key="detail"
                              initial={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              animate={reducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                              exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: EASING }}
                              style={{ overflow: 'hidden' }}
                            >
                              {/* Padding horizontal + marge négative : compense le clipping de
                                  l'anneau de focus par overflow:hidden sans décaler le contenu. */}
                              <div
                                className="mt-6 pt-6 px-[3px] -mx-[3px]"
                                style={{ borderTop: '1px solid rgba(255,255,255,.09)' }}
                              >
                                {p.longDesc && (
                                  <p className="text-[14px] leading-[1.6] mb-5" style={{ color: mutedColor }}>
                                    {p.longDesc[lang]}
                                  </p>
                                )}

                                {p.architectureDiagram && (
                                  <div className="rounded-[14px] p-4 mb-5" style={{ background: '#f6f0e7' }}>
                                    <img
                                      src={
                                        typeof p.architectureDiagram.src === 'string'
                                          ? p.architectureDiagram.src
                                          : p.architectureDiagram.src[lang]
                                      }
                                      alt={p.architectureDiagram.alt[lang] || t('projects.diagramAlt')}
                                      className="w-full h-auto"
                                      loading="lazy"
                                    />
                                  </div>
                                )}

                                {p.screenshots && p.screenshots.length > 0 && (
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                                    {p.screenshots.map((s) => (
                                      <a
                                        key={s.src}
                                        href={s.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-[9px] overflow-hidden border border-line"
                                      >
                                        <img
                                          src={s.src}
                                          alt={s.alt[lang]}
                                          className="w-full h-full object-cover aspect-video"
                                          loading="lazy"
                                        />
                                      </a>
                                    ))}
                                  </div>
                                )}

                                {p.role && (
                                  <p className="text-[13px] leading-[1.6] mb-3" style={{ color: mutedColor }}>
                                    <strong style={{ color: accentColor }}>{t('projects.role')}{lang === 'fr' ? ' : ' : ': '}</strong>
                                    {p.role[lang]}
                                  </p>
                                )}

                                {p.features && p.features[lang].length > 0 && (
                                  <div className="mb-5">
                                    <h4
                                      className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-2"
                                      style={{ color: accentColor }}
                                    >
                                      {t('projects.keyFeatures')}
                                    </h4>
                                    <ul
                                      className="grid sm:grid-cols-2 gap-x-6 gap-y-[6px] text-[13px] leading-[1.5]"
                                      style={{ color: mutedColor }}
                                    >
                                      {p.features[lang].map((f) => (
                                        <li key={f} className="flex gap-2">
                                          <span aria-hidden="true">·</span>
                                          {f}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {p.highlights && (
                                  <p className="text-[14px] leading-[1.6] mb-4" style={{ color: mutedColor }}>
                                    <strong style={{ color: accentColor }}>{t('projects.highlights')}. </strong>
                                    {p.highlights[lang]}
                                  </p>
                                )}

                                {p.docsLinks && p.docsLinks.length > 0 && (
                                  <div>
                                    <h4
                                      className="text-[12px] font-semibold uppercase tracking-[0.1em] mb-2"
                                      style={{ color: accentColor }}
                                    >
                                      {t('projects.docs')}
                                    </h4>
                                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                                      {p.docsLinks.map((d) => (
                                        <a
                                          key={d.url}
                                          href={d.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1.5 text-[13px] font-medium hover:opacity-75 transition-opacity"
                                          style={{ color: accentColor }}
                                        >
                                          <IconExternalLink size={13} />
                                          {d.label[lang]}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
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
