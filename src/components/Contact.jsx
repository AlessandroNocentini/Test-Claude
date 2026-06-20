import { personal } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container contact__inner">
        <h2 className="contact__heading reveal">
          Let's<br /><em>Connect.</em>
        </h2>

        <p className="contact__sub reveal" style={{'--delay':'0.1s'}}>
          Have a project in mind or just want to say hello?<br />My inbox is always open.
        </p>

        <a
          href={`mailto:${personal.email}`}
          className="contact__email reveal"
          style={{'--delay':'0.2s'}}
        >
          {personal.email} →
        </a>

        <div className="contact__socials reveal" style={{'--delay':'0.3s'}}>
          {personal.github   && <a href={personal.github}    target="_blank" rel="noreferrer">GitHub</a>}
          {personal.linkedin && <a href={personal.linkedin}  target="_blank" rel="noreferrer">LinkedIn</a>}
          {personal.instagram&& <a href={personal.instagram} target="_blank" rel="noreferrer">Instagram</a>}
        </div>

        <p className="contact__copy reveal" style={{'--delay':'0.4s'}}>
          © {new Date().getFullYear()} {personal.name}
        </p>

        <a
          href="/#admin"
          className="contact__admin-link"
          style={{ display: 'block', marginTop: '2rem', fontSize: '0.7rem', opacity: 0.25, color: 'inherit', textDecoration: 'none', letterSpacing: '0.08em' }}
          onClick={e => { e.preventDefault(); window.location.href = '/#admin'; window.location.reload() }}
        >
          admin
        </a>
      </div>
    </section>
  )
}
