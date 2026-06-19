import { personal } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact__inner">
        <h2 className="section__title">Get In Touch</h2>
        <p className="contact__sub">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>
        <a href={`mailto:${personal.email}`} className="btn btn--lg">
          Say Hello
        </a>
        <div className="contact__socials">
          <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}
