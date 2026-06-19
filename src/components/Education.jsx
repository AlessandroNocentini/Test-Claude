import { education } from '../data/content'

function parseThesis(text) {
  if (!text) return null
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section__title">Education</h2>
        <div className="timeline">
          {education.map((edu) => (
            <div key={edu.id} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__role">{edu.degree}</h3>
                    <p className="timeline__company">{edu.field}</p>
                    <p className="timeline__domain">{edu.institution}</p>
                  </div>
                  <span className="timeline__period">{edu.period}</span>
                </div>

                {edu.description && (
                  <p className="timeline__desc">
                    <span className="edu__label">Courses: </span>{edu.description}
                  </p>
                )}

                {edu.thesis && (
                  <div className="edu__thesis">
                    <p className="edu__thesis-text">
                      <span className="edu__label">Thesis: </span>
                      {parseThesis(edu.thesis).map((part, i) =>
                        typeof part === 'string'
                          ? part.split('\n').map((line, j) => j === 0 ? line : <span key={j}><br />{line}</span>)
                          : part
                      )}
                    </p>
                  </div>
                )}

                {edu.links.length > 0 && (
                  <div className="timeline__links">
                    {edu.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="inline-link">
                        {l.label} →
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
