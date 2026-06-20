import { personal } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">01 / About</span>
          <h2 className="sec-title">Who I Am</h2>
        </div>

        <div className="about__layout">
          <div className="about__left">
            <p className="about__tagline reveal" style={{'--delay':'0.1s'}}>
              Engineering <em>intelligent</em> systems<br />
              for the real world.
            </p>
            <div className="about__image-wrap reveal" style={{'--delay':'0.2s'}}>
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
          </div>

          <div className="about__right">
            <div className="about__bio">
              {personal.bio.map((para, i) => (
                <p key={i} className="reveal" style={{'--delay': `${0.1 + i * 0.1}s`}}>
                  {para}
                </p>
              ))}
            </div>
            <div className="about__actions reveal" style={{'--delay':'0.5s'}}>
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
