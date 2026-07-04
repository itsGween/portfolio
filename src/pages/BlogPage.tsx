import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { POSTS } from '@/data/posts'
import { IconArrow } from '@/components/ui/Icons'

const EASE = [0.2, 0.7, 0.2, 1] as const

export default function BlogPage() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
    document.documentElement.lang = next
  }

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.title = lang === 'fr' ? 'Blog — Gween Kangah' : 'Blog — Gween Kangah'
  }, [lang, i18n.language])

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f4', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>

      {/* Sticky header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid #ede8e3',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto', padding: '0 40px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg,#ff7a18,#ffbb63)',
              display: 'grid', placeItems: 'center',
              color: '#1a0d04', fontFamily: 'Anton, sans-serif', fontSize: 18,
            }}>G</span>
            <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 20, color: '#1c1005', letterSpacing: '0.02em' }}>
              GWEEN K.
            </span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              onClick={toggleLang}
              style={{ fontSize: 13, fontWeight: 600, color: '#7a6858', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: 8 }}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7a6858', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ← {lang === 'fr' ? 'Portfolio' : 'Portfolio'}
            </a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 40px 100px' }}>

        {/* Page hero */}
        <motion.div
          style={{ marginBottom: 64 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ff7a18' }}>
            Blog
          </span>
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 600, lineHeight: 1.05, color: '#1c1005', marginTop: 12, marginBottom: 16 }}>
            {lang === 'fr'
              ? <>Notes de <span style={{ background: 'linear-gradient(100deg,#ff7a18,#ffbb63)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>développement</span>.</>
              : <>Dev <span style={{ background: 'linear-gradient(100deg,#ff7a18,#ffbb63)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>notes</span>.</>}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#5c4a37', maxWidth: 520 }}>
            {lang === 'fr'
              ? "Retours d'expérience, patterns et leçons apprises sur des projets réels — frontend, backend, cloud."
              : 'Field notes, patterns, and lessons learned from real projects — frontend, backend, cloud.'}
          </p>
        </motion.div>

        {/* Post grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
          {POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <motion.article
                  style={{
                    background: '#fff', border: '1px solid #ede8e3',
                    borderRadius: 20, overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,.05)',
                    display: 'flex', flexDirection: 'column', height: '100%',
                  }}
                  whileHover={{ y: -6, boxShadow: '0 20px 52px rgba(0,0,0,.1)', borderColor: 'rgba(255,122,24,.35)' }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {/* Gradient cover */}
                  <div style={{
                    height: 160, flexShrink: 0,
                    background: `linear-gradient(135deg, ${post.gradFrom} 0%, ${post.gradTo} 100%)`,
                    display: 'flex', alignItems: 'flex-end', padding: '16px 20px',
                    position: 'relative',
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                      background: 'rgba(0,0,0,.25)', color: '#fff',
                      padding: '4px 12px', borderRadius: 100, backdropFilter: 'blur(8px)',
                    }}>
                      {post.cat[lang]}
                    </span>
                  </div>

                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 12, color: '#a99a8b' }}>{post.date[lang]}</span>
                      <span style={{ fontSize: 12, color: '#a99a8b' }}>{post.read[lang]}</span>
                    </div>

                    <h2 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3, color: '#1c1005', marginBottom: 10 }}>
                      {post.title[lang]}
                    </h2>

                    <p style={{ fontSize: 14, lineHeight: 1.65, color: '#5c4a37', marginBottom: 18, flex: 1 }}>
                      {post.excerpt[lang]}
                    </p>

                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                      {post.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 6, fontWeight: 500, background: '#f5f0eb', color: '#7a6858' }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ff7a18', fontSize: 13, fontWeight: 700 }}>
                      {lang === 'fr' ? "Lire l'article" : 'Read article'}
                      <IconArrow size={12} />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer style={{
        borderTop: '1px solid #ede8e3', padding: '28px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
        color: '#a99a8b', fontSize: 13,
        maxWidth: 1240, margin: '0 auto',
      }}>
        <span>© 2026 Gween Hans-Berryl Kangah</span>
        <a href="/" style={{ color: '#ff7a18', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          {lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
          <IconArrow size={12} />
        </a>
      </footer>
    </div>
  )
}
