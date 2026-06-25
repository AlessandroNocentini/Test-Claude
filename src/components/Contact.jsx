import { personal } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container contact__inner">
        <div className="sec-header reveal">
          <span className="sec-num">// 07</span>
          <h2 className="sec-title">Contact</h2>
        </div>

        <div className="contact__terminal reveal" style={{'--delay':'0.1s'}}>
          <span className="contact__prompt-arrow">›</span>
          <span className="contact__prompt-text">INITIATE_CONTACT</span>
          <span className="contact__cursor" aria-hidden="true" />
        </div>

        <a
          href={`mailto:${personal.email}`}
          className="contact__email reveal"
          style={{'--delay':'0.2s'}}
        >
          {personal.email} ↗
        </a>

        <div className="contact__socials reveal" style={{'--delay':'0.3s'}}>
          {personal.github    && <a href={personal.github}    target="_blank" rel="noreferrer">GitHub ↗</a>}
          {personal.linkedin  && <a href={personal.linkedin}  target="_blank" rel="noreferrer">LinkedIn ↗</a>}
          {personal.instagram && <a href={personal.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}
        </div>

        <p className="contact__copy reveal" style={{'--delay':'0.4s'}}>
          © {new Date().getFullYear()} {personal.name}
        </p>

        <button
          className="contact__admin-link"
          style={{ display: 'block', marginTop: '2.5rem', fontSize: '0.65rem', opacity: 0.18, color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', fontFamily: 'inherit' }}
          onClick={() => { window.location.hash = '#admin'; window.location.reload() }}
        >
          // admin
        </button>
      </div>
    </section>
  )
}
