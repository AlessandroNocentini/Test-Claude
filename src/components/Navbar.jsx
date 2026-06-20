import { useState, useEffect } from 'react'
import { personal } from '../data/content'

const links = [
  { label: 'About',         href: '#about' },
  { label: 'Experience',    href: '#experience' },
  { label: 'Education',     href: '#education' },
  { label: 'Skills',        href: '#skills' },
  { label: 'Projects',      href: '#projects' },
  { label: 'Certifications',href: '#certifications' },
  { label: 'Contact',       href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar__logo" onClick={close}>
        AN<span>.</span>
      </a>

      <nav className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href={personal.cvUrl} className="nav-cv" target="_blank" rel="noreferrer" onClick={close}>
          CV ↗
        </a>
      </nav>

      <button
        className="navbar__burger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span /><span />
      </button>
    </header>
  )
}
