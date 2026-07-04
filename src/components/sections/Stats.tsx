import { useTranslation } from 'react-i18next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function Stats() {
  const { t } = useTranslation()
  const stats = t('stats', { returnObjects: true }) as Array<{ num: string; unit: string; lab: string }>

  return (
    <section className="border-t border-line border-b bg-ink2">
      <div className="wrap grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <RevealOnScroll
            key={i}
            delay={i * 0.08}
            className="py-[44px] px-[30px] border-r border-line last:border-r-0 max-md:even:border-r-0 max-md:border-b max-md:last:border-b-0"
          >
            <div className="font-display text-[52px] leading-none text-white">
              {s.num}
              <span className="text-[24px] text-o2">{s.unit}</span>
            </div>
            <div className="text-[13.5px] text-muted mt-[10px]">{s.lab}</div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
