import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { IconArrow } from '@/components/ui/Icons'
import { POSTS } from '@/data/posts'

const EASE = [0.2, 0.7, 0.2, 1] as const

export default function Blog() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  return (
    <section id="blog" style={{ background: '#1c1109' }}>
      <div className="wrap" style={{ padding: '120px 40px' }}>

        {/* Header */}
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow">{t('blog.eyebrow')}</span>
            <h2
              className="text-[clamp(34px,5vw,58px)] leading-[1.02] mt-3 font-semibold tracking-tight text-cream"
              dangerouslySetInnerHTML={{
                __html: t('blog.title')
                  .replace('{{grad}}', '<span class="grad">')
                  .replace('{{/grad}}', '</span>'),
              }}
            />
            <p className="mt-3 text-[15px] leading-[1.6] max-w-[460px] text-muted">
              {t('blog.subtitle')}
            </p>
          </div>
        </RevealOnScroll>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-md:grid-cols-1">
          {POSTS.map((post, i) => (
            <RevealOnScroll key={post.id} delay={i * 0.09}>
              <motion.a
                href={`/blog/${post.id}`}
                className="rounded-[20px] overflow-hidden flex flex-col group"
                style={{
                  background: '#211308',
                  border: '1px solid rgba(255,255,255,.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,.25)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(255,122,24,.3)',
                  boxShadow: '0 20px 56px rgba(0,0,0,.5)',
                }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {/* Color band */}
                <div
                  style={{
                    height: 4,
                    background: `linear-gradient(90deg, ${post.gradFrom}, ${post.gradTo})`,
                    flexShrink: 0,
                  }}
                />

                <div style={{ padding: '20px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Category + date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      background: 'rgba(255,122,24,.12)', color: '#ff7a18',
                      padding: '4px 10px', borderRadius: 100,
                    }}>
                      {post.cat[lang]}
                    </span>
                    <span style={{ fontSize: 12, color: '#a99a8b' }}>
                      {post.date[lang]} · {post.read[lang]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3, color: '#f6f0e7', marginBottom: 10 }}>
                    {post.title[lang]}
                  </h3>

                  {/* Excerpt */}
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#a99a8b', marginBottom: 16, flex: 1 }}>
                    {post.excerpt[lang]}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 18 }}>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11, padding: '3px 9px', borderRadius: 6, fontWeight: 500,
                          background: 'rgba(255,255,255,.06)', color: '#7a6858',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ff7a18', fontSize: 13, fontWeight: 700 }}>
                    {t('blog.read')}
                    <IconArrow size={12} />
                  </div>
                </div>
              </motion.a>
            </RevealOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll className="mt-14 flex justify-center">
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[14px]"
            style={{ border: '2px solid rgba(255,122,24,.45)', color: '#ff7a18', background: 'transparent' }}
            whileHover={{ background: 'rgba(255,122,24,.1)', borderColor: '#ff7a18' }}
            transition={{ duration: 0.2 }}
          >
            {t('blog.all')}
            <IconArrow size={15} />
          </motion.a>
        </RevealOnScroll>
      </div>
    </section>
  )
}
