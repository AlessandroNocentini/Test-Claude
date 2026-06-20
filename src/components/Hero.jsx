import { personal } from '../data/content'

export default function Hero() {
  const [role1, role2] = personal.headline.split(' | ')

  return (
    <section id="hero" className="hero">
      <div className="hero__inner">
        <p className="hero__eyebrow">Portfolio — {personal.location}</p>

        <h1 className="hero__name">
          {personal.name.split(' ')[0]}<br />
          <em>{personal.name.split(' ')[1]}</em>
          <span className="dot">.</span>
        </h1>

        <div className="hero__roles">
          <span className="hero__role">{role1.trim()}</span>
          <span className="hero__sep">×</span>
          <span className="hero__role">{role2.trim()}</span>
        </div>

        <div className="hero__actions">
          <a href="#projects" className="btn">View Work ↓</a>
          <a href={personal.cvUrl} className="btn btn--ghost" target="_blank" rel="noreferrer">
            {personal.cvTitle} ↗
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">Scroll</span>
      </div>
    </section>
  )
}
