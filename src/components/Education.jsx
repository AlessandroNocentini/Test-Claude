import { education } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

function parseThesis(text) {
  if (!text) return null
  return text.split(/(\*\*[^*]+\*\*)/).flatMap((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return [<strong key={i}>{part.slice(2, -2)}</strong>]
    }
    return part.split('\n').flatMap((line, j) =>
      j === 0 ? [line] : [<br key={`${i}-${j}`} />, line]
    )
  })
}

export default function Education() {
  const ref = useScrollReveal()

  return (
    <section id="education" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">03 / Education</span>
          <h2 className="sec-title">Education</h2>
        </div>

        <div className="timeline">
          {education.map((edu, i) => (
            <div key={edu.id} className="timeline__item reveal" style={{'--delay': `${i * 0.1}s`}}>
              <div className="timeline__aside">
                <span className="timeline__period">{edu.period}</span>
                <span className="timeline__domain">{edu.institution}</span>
              </div>
              <div className="timeline__body">
                <h3 className="timeline__role">{edu.degree}</h3>
                <p className="timeline__company">{edu.field}</p>

                {edu.description && (
                  <div className="edu__courses">
                    <span className="edu__label">Courses</span>
                    {edu.description}
                  </div>
                )}

                {edu.thesis && (
                  <div className="edu__thesis">
                    <span className="edu__label">Thesis</span>
                    <p className="edu__thesis-text">{parseThesis(edu.thesis)}</p>
                  </div>
                )}

                {edu.links.length > 0 && (
                  <div className="timeline__links" style={{marginTop: '1rem'}}>
                    {edu.links.map((l) => (
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
