import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section__title">Work Experience</h2>
        <div className="timeline">
          {experience.map((job) => (
            <div key={job.id} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__role">{job.role}</h3>
                    <p className="timeline__company">{job.company}</p>
                  </div>
                  <span className="timeline__period">{job.period}</span>
                </div>
                <p className="timeline__desc">{job.description}</p>
                <div className="tag-list">
                  {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
