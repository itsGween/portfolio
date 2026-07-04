import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const LEFT_LOGOS = ['react', 'typescript', 'tailwindcss', 'javascript', 'angular', 'vite']
const RIGHT_LOGOS = ['nodedotjs', 'nestjs', 'python', 'docker', 'postgresql', 'azure']

interface OrbitHand {
  cx: number; cy: number; rx: number; ry: number
  tilt: number; phase: number; speed: number
}

const HANDS: Record<string, OrbitHand> = {
  left:  { cx: 14.5, cy: 54, rx: 72, ry: 33, tilt: -0.18, phase: 0,         speed:  0.00042 },
  right: { cx: 86,   cy: 57, rx: 72, ry: 33, tilt:  0.18, phase: Math.PI,   speed: -0.00042 },
}

export default function About() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const icons = stage.querySelectorAll<HTMLDivElement>('.orbit-icon')
    const items = Array.from(icons).map((el) => {
      const side = el.dataset.side as 'left' | 'right'
      const i = Number(el.dataset.i)
      const total = side === 'left' ? LEFT_LOGOS.length : RIGHT_LOGOS.length
      return { el, h: HANDS[side], i, total }
    })

    function place(now: number) {
      for (const o of items) {
        const { h } = o
        const angle = h.speed * now + (2 * Math.PI * o.i) / o.total + h.phase
        const cosA = Math.cos(angle), sinA = Math.sin(angle)
        const cosT = Math.cos(h.tilt), sinT = Math.sin(h.tilt)
        const x = h.rx * cosA * cosT - h.ry * sinA * sinT
        const y = h.rx * cosA * sinT + h.ry * sinA * cosT
        const depth = (sinA + 1) / 2
        const scale = 0.82 + 0.30 * depth
        const op = 0.68 + 0.32 * depth
        o.el.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${scale.toFixed(3)})`
        o.el.style.opacity = op.toFixed(3)
        o.el.style.zIndex = String(Math.round(100 + sinA * 100))
      }
    }

    if (reduced) { place(0); return }

    const loop = (now: number) => { place(now); rafRef.current = requestAnimationFrame(loop) }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reduced])

  return (
    <section className="sec bg-cream text-[#231405]" id="apropos">
      <div className="wrap grid md:grid-cols-[0.9fr_1.1fr] gap-[70px] items-center max-md:grid-cols-1 max-md:gap-9">

        {/* Stage */}
        <RevealOnScroll>
          <div ref={stageRef} className="relative" style={{ aspectRatio: '3/4' }}>
            {/* Backdrop */}
            <div
              className="absolute inset-0 rounded-[24px]"
              style={{
                background: `
                  radial-gradient(120% 90% at 50% 15%, #ff9d3d, transparent 60%),
                  linear-gradient(150deg, #ff7d1c, #c2410c)
                `,
              }}
            />
            {/* Photo */}
            <img
              src="/assets/gween-about.png"
              alt="Gween Kangah"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-contain object-bottom"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(60,20,0,.4))' }}
            />
            {/* Orbiting icons */}
            <div className="absolute inset-0 z-[3] pointer-events-none">
              {LEFT_LOGOS.map((name, i) => (
                <div
                  key={`l-${name}`}
                  className="orbit-icon absolute w-[46px] h-[46px] rounded-[13px] bg-white grid place-items-center"
                  style={{
                    left: `${HANDS.left.cx}%`,
                    top: `${HANDS.left.cy}%`,
                    boxShadow: '0 10px 24px rgba(40,12,0,.35)',
                  }}
                  data-side="left"
                  data-i={i}
                >
                  <img src={`/assets/logos/${name}.svg`} alt={name} className="w-[26px] h-[26px]" />
                </div>
              ))}
              {RIGHT_LOGOS.map((name, i) => (
                <div
                  key={`r-${name}`}
                  className="orbit-icon absolute w-[46px] h-[46px] rounded-[13px] bg-white grid place-items-center"
                  style={{
                    left: `${HANDS.right.cx}%`,
                    top: `${HANDS.right.cy}%`,
                    boxShadow: '0 10px 24px rgba(40,12,0,.35)',
                  }}
                  data-side="right"
                  data-i={i}
                >
                  <img src={`/assets/logos/${name}.svg`} alt={name} className="w-[26px] h-[26px]" />
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Text */}
        <RevealOnScroll delay={0.15}>
          <span className="eyebrow" style={{ color: '#c2410c' }}>{t('about.eyebrow')}</span>
          <h2
            className="font-semibold mt-4"
            style={{ fontSize: 'clamp(30px, 4vw, 46px)', lineHeight: 1.05, color: '#1c1005' }}
          >
            {t('about.title')}
          </h2>
          <p
            className="mt-[22px] mb-0"
            style={{ fontSize: 19, lineHeight: 1.6, color: '#4a3826' }}
          >
            {t('about.lead')}
          </p>
          <p
            className="mt-[18px]"
            style={{ fontSize: 15.5, lineHeight: 1.75, color: '#5c4a37' }}
          >
            {t('about.body')}
          </p>
          <div className="flex flex-wrap gap-[10px] mt-[26px]">
            {(t('about.chips', { returnObjects: true }) as string[]).map((chip) => (
              <span
                key={chip}
                className="px-4 py-[9px] rounded-full text-[13px] font-semibold border border-black/8 bg-white"
                style={{ color: '#7a3a10' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
