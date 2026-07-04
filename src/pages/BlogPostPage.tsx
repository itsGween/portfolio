import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { POSTS } from '@/data/posts'
import { IconArrow } from '@/components/ui/Icons'

const EASE = [0.2, 0.7, 0.2, 1] as const

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>()
  const { i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en'

  const post = POSTS.find((p) => p.id === id)
  const related = POSTS.filter((p) => p.id !== id).slice(0, 2)

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
    document.documentElement.lang = next
  }

  useEffect(() => {
    document.documentElement.lang = i18n.language
    if (post) document.title = `${post.title[lang]} — Gween Kangah`
  }, [lang, i18n.language, post])

  if (!post) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#faf7f4', fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 64, fontWeight: 700, color: '#1c1005', margin: '0 0 12px' }}>404</h1>
          <p style={{ color: '#7a6858', marginBottom: 24 }}>
            {lang === 'fr' ? 'Article introuvable.' : 'Article not found.'}
          </p>
          <Link to="/blog" style={{ color: '#ff7a18', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← {lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </div>
      </div>
    )
  }

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
            <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7a6858', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              ← {lang === 'fr' ? 'Tous les articles' : 'All articles'}
            </Link>
          </div>
        </div>
      </header>

      {/* Cover hero */}
      <div style={{
        height: 320,
        background: `linear-gradient(135deg, ${post.gradFrom} 0%, ${post.gradTo} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.35) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          maxWidth: 760, width: '100%', padding: '0 40px',
        }}>
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', background: 'rgba(0,0,0,.3)', color: '#fff',
            padding: '4px 12px', borderRadius: 100, backdropFilter: 'blur(8px)', marginBottom: 12,
          }}>
            {post.cat[lang]}
          </span>
        </div>
      </div>

      {/* Article card lifted above cover */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 2 }}>
        <motion.div
          style={{
            background: '#fff', borderRadius: 24,
            boxShadow: '0 24px 80px rgba(0,0,0,.1)',
            marginTop: -64, padding: '48px 52px 52px',
            border: '1px solid #ede8e3',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: '#a99a8b' }}>{post.date[lang]}</span>
            <span style={{ color: '#ddd' }}>·</span>
            <span style={{ fontSize: 12, color: '#a99a8b' }}>{post.read[lang]}</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, lineHeight: 1.15,
            color: '#1c1005', marginBottom: 32, letterSpacing: '-0.02em',
          }}>
            {post.title[lang]}
          </h1>

          {/* Author */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 0', borderTop: '1px solid #f0ece6', borderBottom: '1px solid #f0ece6', marginBottom: 40 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#ff7a18,#ffbb63)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Anton, sans-serif', color: '#1a0d04', fontSize: 18,
            }}>G</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#1c1005', margin: 0 }}>Gween Hans-Berryl Kangah</p>
              <p style={{ fontSize: 12, color: '#a99a8b', margin: 0 }}>
                {lang === 'fr' ? 'Développeuse full-stack · Ottawa' : 'Full-stack developer · Ottawa'}
              </p>
            </div>
          </div>

          {/* Content */}
          <div style={{ lineHeight: 1.8, color: '#3d2e1e' }}>
            {post.content[lang].map((paragraph, i) => (
              <p key={i} style={{ fontSize: 16, marginBottom: i < post.content[lang].length - 1 ? 22 : 0 }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40, paddingTop: 32, borderTop: '1px solid #f0ece6' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 8, fontWeight: 500, background: '#f5f0eb', color: '#5c4a37' }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ marginTop: 64, marginBottom: 80 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1c1005', marginBottom: 24 }}>
              {lang === 'fr' ? 'Autres articles' : 'More articles'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.id}`} style={{ textDecoration: 'none' }}>
                  <motion.div
                    style={{
                      background: '#fff', border: '1px solid #ede8e3',
                      borderRadius: 16, overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(0,0,0,.04)',
                    }}
                    whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(0,0,0,.09)', borderColor: 'rgba(255,122,24,.3)' }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <div style={{ height: 6, background: `linear-gradient(90deg, ${r.gradFrom}, ${r.gradTo})` }} />
                    <div style={{ padding: '18px 20px 20px' }}>
                      <span style={{ fontSize: 11, color: '#ff7a18', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {r.cat[lang]}
                      </span>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1c1005', lineHeight: 1.3, margin: '8px 0 10px' }}>
                        {r.title[lang]}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#ff7a18', fontSize: 12, fontWeight: 700 }}>
                        {lang === 'fr' ? 'Lire' : 'Read'}
                        <IconArrow size={11} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #ede8e3', padding: '28px 40px', background: '#fff', marginTop: 40 }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#a99a8b',
        }}>
          <span>© 2026 Gween Hans-Berryl Kangah</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link to="/blog" style={{ color: '#7a6858', textDecoration: 'none', fontWeight: 500 }}>Blog</Link>
            <a href="/" style={{ color: '#ff7a18', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              Portfolio <IconArrow size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
