import { experience } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal" data-num="02">
          <span className="sec-num">Experience</span>
          <h2 className="sec-title">Work Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((job, i) => (
            <div key={job.id} className="timeline__item reveal" style={{'--delay': `${i * 0.1}s`}}>
              <div className="timeline__aside">
                <span className="timeline__period">{job.period}</span>
                {job.domain && <span className="timeline__domain">{job.domain}</span>}
              </div>
              <div className="timeline__body">
                <h3 className="timeline__role">{job.role}</h3>
                <p className="timeline__company">{job.company}</p>
                <p className="timeline__desc">{job.description}</p>
                {job.bullets.length > 0 && (
                  <div className="tag-list timeline__tags">
                    {job.bullets.map((b) => <span key={b} className="tag">{b}</span>)}
                  </div>
                )}
                {job.links.length > 0 && (
                  <div className="timeline__links">
                    {job.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-link">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
