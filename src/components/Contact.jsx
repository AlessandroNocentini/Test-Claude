import { personal } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <div className="contact__big">
          <span className="contact__big-line reveal">LET'S</span>
          <span className="contact__big-line contact__big-line--outline reveal" style={{'--delay':'0.1s'}}>WORK</span>
          <span className="contact__big-line contact__big-line--accent reveal" style={{'--delay':'0.18s'}}>TOGETHER.</span>
        </div>

        <div className="contact__body reveal" style={{'--delay':'0.3s'}}>
          <a href={`mailto:${personal.email}`} className="contact__email">
            {personal.email} ↗
          </a>

          <div className="contact__socials">
            {personal.github   && <a href={personal.github}    target="_blank" rel="noreferrer">GitHub</a>}
            {personal.linkedin && <a href={personal.linkedin}  target="_blank" rel="noreferrer">LinkedIn</a>}
            {personal.instagram&& <a href={personal.instagram} target="_blank" rel="noreferrer">Instagram</a>}
          </div>

          <p className="contact__copy">
            © {new Date().getFullYear()} {personal.name}
          </p>

          <button
            className="contact__admin-link"
            onClick={() => { window.location.hash = '#admin'; window.location.reload() }}
          >
            admin
          </button>
        </div>
      </div>
    </section>
  )
}
