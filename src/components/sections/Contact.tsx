import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { IconMail, IconPhone, IconPin, IconClock } from '@/components/ui/Icons'

const CONTACTS = [
  { key: 'email',        icon: IconMail,   href: 'mailto:kangahhansberryl7@outlook.com', value: 'kangahhansberryl7@outlook.com' },
  { key: 'phone',        icon: IconPhone,  href: 'tel:+18195928576',                     value: '819 592-8576' },
  { key: 'location',     icon: IconPin,    href: '#top',                                 valueKey: 'contact.values.location' },
  { key: 'availability', icon: IconClock,  href: 'mailto:kangahhansberryl7@outlook.com', valueKey: 'contact.values.availability' },
] as const

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section
      className="sec"
      id="contact"
      style={{
        background: `
          radial-gradient(120% 100% at 80% 10%, #5a1e02, transparent 60%),
          linear-gradient(120deg, #2a0f01, #c2410c 70%, #ff7d1c)
        `,
      }}
    >
      <div className="wrap relative z-[2]">
        <RevealOnScroll>
          <span className="eyebrow" style={{ color: '#ffe0bd' }}>{t('contact.eyebrow')}</span>
          <h2
            className="font-display mt-[18px] text-white leading-[0.9]"
            style={{ fontSize: 'clamp(46px, 8vw, 120px)' }}
          >
            {t('contact.title')}<br />
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}>
              {t('contact.serif')}
            </span>
          </h2>
          <p
            className="mt-6 mb-10 max-w-[520px] leading-[1.55]"
            style={{ fontSize: 19, color: 'rgba(255,255,255,.92)' }}
          >
            {t('contact.sub')}
          </p>
        </RevealOnScroll>

        {/* Cards — grille alignée */}
        <div className="grid md:grid-cols-2 gap-3 max-w-[640px] max-md:grid-cols-1">
          {CONTACTS.map((c, i) => {
            const Icon = c.icon
            const value = 'valueKey' in c ? t(c.valueKey) : c.value
            const label = t(`contact.labels.${c.key}`)
            return (
              <RevealOnScroll key={c.key} delay={i * 0.07}>
                <motion.a
                  href={c.href}
                  className="flex items-center gap-4 rounded-[14px] border h-full min-h-[76px]"
                  style={{
                    background: 'rgba(255,255,255,.1)',
                    borderColor: 'rgba(255,255,255,.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '18px 20px',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,.18)' }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Icon box */}
                  <span
                    className="flex-none w-10 h-10 rounded-[10px] grid place-items-center text-white shrink-0"
                    style={{ background: 'rgba(255,255,255,.16)' }}
                  >
                    <Icon size={18} />
                  </span>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <small
                      className="text-[10.5px] tracking-[0.14em] uppercase block mb-0.5 font-semibold"
                      style={{ color: 'rgba(255,255,255,.65)' }}
                    >
                      {label}
                    </small>
                    <span
                      className="text-[14px] text-white font-semibold block truncate"
                      title={value}
                    >
                      {value}
                    </span>
                  </div>
                </motion.a>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
