import { useEffect } from 'react'
import Cursor       from './components/Cursor'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Marquee      from './components/Marquee'
import About        from './components/About'
import Experience   from './components/Experience'
import Education    from './components/Education'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import Certifications from './components/Certifications'
import Contact      from './components/Contact'

export default function App() {
  useEffect(() => {
    try {
      const s = localStorage.getItem('portfolioData')
      const palette = s && JSON.parse(s).palette
      if (palette) Object.entries(palette).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
    } catch {}
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
