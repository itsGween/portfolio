import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { IconArrow } from '@/components/ui/Icons'

const EASE = [0.2, 0.7, 0.2, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  }
}

const TECH_LOGOS = [
  { name: 'typescript', alt: 'TypeScript' },
  { name: 'react', alt: 'React' },
  { name: 'nestjs', alt: 'NestJS' },
  { name: 'azure', alt: 'Azure' },
]

const WORDS_FR = ['CRÉER', 'CODER', 'DESIGNER', 'TESTER', 'DÉPLOYER']
const WORDS_EN = ['CREATE', 'CODE', 'DESIGN', 'TEST', 'DEPLOY']

export default function Hero() {
  const { t, i18n } = useTranslation()
  const [wordIdx, setWordIdx] = useState(0)

  const words = i18n.language === 'fr' ? WORDS_FR : WORDS_EN
  const isPhrase = words[wordIdx].includes(' ')

  useEffect(() => {
    const id = setInterval(() => setWordIdx((n) => (n + 1) % words.length), 2500)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        background: `
          radial-gradient(120% 90% at 12% 20%, #5a1e02 0%, transparent 55%),
          linear-gradient(120deg, #2a0f01 0%, #c2410c 42%, #ff7d1c 74%, #ffa544 100%)
        `,
      }}
    >
      {/* Glows */}
      <div
        className="absolute rounded-full pointer-events-none opacity-50"
        style={{
          width: 520,
          height: 520,
          left: -120,
          top: '8%',
          background: 'radial-gradient(circle,rgba(255,180,90,.55),transparent 65%)',
          filter: 'blur(10px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none opacity-50"
        style={{
          width: 640,
          height: 640,
          right: -180,
          bottom: -160,
          background: 'radial-gradient(circle,rgba(255,120,20,.45),transparent 62%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Portrait */}
      <motion.img
        src="/assets/gween-portrait.png"
        alt="Gween Kangah"
        className="absolute z-[2] right-[2%] bottom-0 pointer-events-none select-none"
        style={{
          height: '94%',
          maxHeight: 900,
          filter: 'drop-shadow(0 30px 60px rgba(40,12,0,.5))',
        }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
      />

      {/* Content */}
      <div
        className="relative z-[3] max-w-[1240px] mx-auto flex flex-col justify-center min-h-[100svh]"
        style={{ padding: '150px 40px 60px' }}
      >
        {/* Rotating headline */}
        <div
          className="relative overflow-hidden"
          style={{ height: 'clamp(72px, 13vw, 190px)', marginTop: 16, marginBottom: 12 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={wordIdx}
              className="absolute inset-x-0 top-0 font-display text-white whitespace-nowrap"
              style={{
                fontSize: isPhrase ? 'clamp(32px, 5.6vw, 82px)' : 'clamp(72px, 13vw, 190px)',
                lineHeight: 1,
                textShadow: '0 8px 40px rgba(80,25,0,.35)',
              }}
              initial={{ y: 220, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -220, opacity: 0 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              {words[wordIdx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-medium max-w-[440px] mt-3"
          style={{
            fontSize: 'clamp(19px, 2.1vw, 27px)',
            lineHeight: 1.32,
            color: 'rgba(255,255,255,.94)',
          }}
          {...fadeUp(0.6)}
        >
          {t('hero.sub')}
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#projets"
          className="inline-flex items-center gap-[14px] mt-[38px] px-[34px] py-[19px] rounded-full bg-cream text-[#1a0d04] font-bold text-[15px] tracking-[0.03em] w-fit"
          {...fadeUp(0.8)}
          whileHover={{ y: -3, boxShadow: '0 18px 40px rgba(60,20,0,.4)' }}
        >
          {t('hero.cta')}
          <span
            className="w-[34px] h-[34px] rounded-full grid place-items-center text-white"
            style={{ background: '#ff7a18' }}
          >
            <IconArrow size={15} />
          </span>
        </motion.a>

        {/* Tech logos + tagline */}
        <motion.div className="flex items-center gap-4 mt-[52px]" {...fadeUp(1.0)}>
          <div className="flex">
            {TECH_LOGOS.map((tech, i) => (
              <span
                key={tech.name}
                className="w-[44px] h-[44px] rounded-full border-[2px] border-[#ffca87] bg-[#3a1a08] grid place-items-center overflow-hidden"
                style={{ marginLeft: i === 0 ? 0 : -12 }}
              >
                <img
                  src={`/assets/logos/${tech.name}.svg`}
                  alt={tech.alt}
                  className="w-[24px] h-[24px] object-contain"
                />
              </span>
            ))}
          </div>
          <p
            className="text-[13.5px] max-w-[210px] leading-[1.35]"
            style={{ color: 'rgba(255,255,255,.85)' }}
          >
            {t('hero.tagline')}
          </p>
        </motion.div>
      </div>

      {/* Testimonial card */}
      <motion.div
        className="absolute z-[4] right-10 bottom-11 w-[290px] rounded-[18px] p-[20px_22px]"
        style={{
          background: '#f6f0e7',
          color: '#2a1706',
          boxShadow: '0 24px 60px rgba(30,10,0,.35)',
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
      >
        <span className="font-serif text-[34px] leading-none text-o1 block h-4">&ldquo;</span>
        <p className="text-[13.5px] leading-[1.5] mt-[10px] mb-[14px]">
          {t('hero.testimonial.quote')}
        </p>
        <div className="flex items-center gap-[10px]">
          <span
            className="w-[34px] h-[34px] rounded-full flex-none"
            style={{ background: 'linear-gradient(135deg,#ff7a18,#ffbb63)' }}
          />
          <div>
            <b className="block text-[12.5px]">{t('hero.testimonial.author')}</b>
            <small className="text-[11px] text-[#8a7359]">{t('hero.testimonial.sub')}</small>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
