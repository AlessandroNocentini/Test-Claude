import { personal } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">// 01</span>
          <h2 className="sec-title">About</h2>
        </div>

        <div className="about__layout">
          <aside className="about__left">
            <div className="about__panel reveal" style={{'--delay':'0.05s'}}>
              <div className="about__panel-row">
                <span className="about__panel-label">STATUS</span>
                <span className="about__panel-value">
                  <span className="about__online-dot" aria-hidden="true" />ACTIVE
                </span>
              </div>
              <div className="about__panel-row">
                <span className="about__panel-label">LOCATION</span>
                <span className="about__panel-value">{personal.location}</span>
              </div>
              <div className="about__panel-row">
                <span className="about__panel-label">DOMAIN</span>
                <span className="about__panel-value">Control · AI</span>
              </div>
              <div className="about__panel-row">
                <span className="about__panel-label">LANG</span>
                <span className="about__panel-value">Python · MATLAB</span>
              </div>
            </div>
            <div className="about__image-wrap reveal" style={{'--delay':'0.15s'}}>
              <img
                src={personal.avatarUrl}
                alt={personal.name}
                className="about__image"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="about__placeholder" aria-hidden="true">
                {personal.name.charAt(0)}
              </div>
            </div>
          </aside>

          <div className="about__right">
            <div className="about__bio">
              {personal.bio.map((para, i) => (
                <p key={i} className="reveal" style={{'--delay': `${0.1 + i * 0.1}s`}}>
                  {para}
                </p>
              ))}
            </div>
            <div className="about__actions reveal" style={{'--delay':'0.45s'}}>
              <a href={personal.cvUrl} className="btn" target="_blank" rel="noreferrer">
                Download CV ↗
              </a>
              <a href="#contact" className="btn btn--ghost">Get In Touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
