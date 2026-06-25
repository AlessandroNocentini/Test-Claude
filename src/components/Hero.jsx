import { personal } from '../data/content'

export default function Hero() {
  const [role1, role2] = personal.headline.split(' | ')

  return (
    <section id="hero" className="hero">
      <div className="hero__eyebrow">
        <span className="hero__eyebrow-tag">{personal.location}</span>
        <span className="hero__eyebrow-roles">{role1.trim()} — {role2.trim()}</span>
      </div>

      <div className="hero__name">
        <span className="hero__n hero__n--1">ALES</span>
        <span className="hero__n hero__n--2">SANDRO</span>
        <span className="hero__n hero__n--3">NOCENTINI</span>
      </div>

      <div className="hero__footer">
        <div className="hero__actions">
          <a href="#projects" className="btn">View Work ↓</a>
          <a href={personal.cvUrl} className="btn btn--ghost" target="_blank" rel="noreferrer">
            {personal.cvTitle} ↗
          </a>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-label">Scroll</span>
        </div>
      </div>
    </section>
  )
}
