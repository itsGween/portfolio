import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Timeline from '@/components/sections/Timeline'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import ChatWidget from '@/components/chat/ChatWidget'
import CommandPalette from '@/components/CommandPalette'
import BlogPage from '@/pages/BlogPage'
import BlogPostPage from '@/pages/BlogPostPage'

function Home() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Timeline />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <CommandPalette />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}
