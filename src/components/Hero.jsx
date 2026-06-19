import { personal } from '../data/content'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hi, I'm</p>
        <h1 className="hero__name">{personal.name}</h1>
        <h2 className="hero__title">{personal.title}</h2>
        <p className="hero__tagline">{personal.tagline}</p>
        <div className="hero__actions">
          <a href="#projects" className="btn">View My Work</a>
          <a href="#contact" className="btn btn--outline">Get In Touch</a>
        </div>
      </div>
      <div className="hero__decoration" aria-hidden="true">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
      </div>
    </section>
  )
}
