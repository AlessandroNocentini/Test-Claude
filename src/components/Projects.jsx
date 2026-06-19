import { projects } from '../data/content'

const KIND_LABEL = { academic: 'Academic', personal: 'Personal', professional: 'Professional' }
const TYPE_LABEL = { project: 'Project', paper: 'Paper' }

function IconExternal() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section__title">Projects</h2>
        <div className="projects__grid">
          {projects.map((p) => (
            <div key={p.id} className={`project-card project-card--${p.kind}`}>
              <div className="project-card__badges">
                <span className={`badge badge--kind badge--${p.kind}`}>{KIND_LABEL[p.kind]}</span>
                <span className="badge badge--type">{TYPE_LABEL[p.type]}</span>
              </div>
              <h3 className="project-card__name">{p.name}</h3>
              <p className="project-card__desc">{p.description}</p>

              {p.paper && p.paper.venue && (
                <div className="project-card__paper">
                  <span className="paper__venue">{p.paper.venue}</span>
                  {p.paper.year && <span className="paper__year">{p.paper.year}</span>}
                  <div className="paper__links">
                    {p.paper.doiUrl && <a href={p.paper.doiUrl} target="_blank" rel="noreferrer">DOI →</a>}
                    {p.paper.pdfUrl && <a href={p.paper.pdfUrl} target="_blank" rel="noreferrer">PDF →</a>}
                  </div>
                </div>
              )}

              <div className="project-card__footer">
                {p.technologies.length > 0 && (
                  <div className="tag-list">
                    {p.technologies.map((t) => <span key={t} className="tag tag--accent">{t}</span>)}
                  </div>
                )}
                {p.links.length > 0 && (
                  <div className="project-card__links">
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" aria-label={l.label}>
                        {l.label} <IconExternal />
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
