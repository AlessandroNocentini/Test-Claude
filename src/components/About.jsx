import { personal } from '../data/content'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section__title">About Me</h2>
        <div className="about__grid">
          <div className="about__image-wrap">
            <img
              src={personal.avatarUrl}
              alt={personal.name}
              className="about__image"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="about__image-placeholder" aria-hidden="true">
              {personal.name.charAt(0)}
            </div>
          </div>
          <div className="about__text">
            <p>{personal.bio}</p>
            <a href={personal.cvUrl} className="btn btn--outline" target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
