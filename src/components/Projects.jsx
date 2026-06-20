import { useState } from 'react'
import { projects } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'
import ProjectModal from './ProjectModal'

const KIND_LABEL = { academic: 'Academic', personal: 'Personal', professional: 'Professional' }
const KIND_CLASS  = { academic: 'badge--academic', personal: 'badge--personal', professional: 'badge--professional' }
const TYPE_LABEL  = { project: 'Project', paper: 'Paper' }
const FILTERS     = ['All', 'Professional', 'Academic', 'Personal']

export default function Projects() {
  const ref = useScrollReveal()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const visible = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.kind === activeFilter.toLowerCase())

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">05 / Projects</span>
          <h2 className="sec-title">Selected Work</h2>
        </div>

        <div className="projects__filters reveal" style={{ '--delay': '0.05s' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              type="button"
              className={`projects__filter-btn${activeFilter === f ? ' projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {visible.map((p, i) => (
            <div
              key={p.id}
              className="project-card reveal"
              style={{ '--delay': `${i * 0.08}s`, cursor: 'pointer' }}
              onClick={() => setSelectedProject(p)}
            >
              <div className="project-card__meta">
                <span className={`badge ${KIND_CLASS[p.kind]}`}>{KIND_LABEL[p.kind]}</span>
                <span className="badge badge--paper">{TYPE_LABEL[p.type]}</span>
              </div>

              <h3 className="project-card__name">{p.name}</h3>
              <p className="project-card__desc">{p.description}</p>

              {p.paper?.venue && (
                <div className="project-card__paper">
                  <p className="paper__venue">{p.paper.venue}{p.paper.year ? `, ${p.paper.year}` : ''}</p>
                  <div className="paper__links">
                    {p.paper.doiUrl && <a href={p.paper.doiUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>DOI ↗</a>}
                    {p.paper.pdfUrl && <a href={p.paper.pdfUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>PDF ↗</a>}
                  </div>
                </div>
              )}

              <div className="project-card__footer">
                {p.technologies.length > 0 && (
                  <div className="tag-list">
                    {p.technologies.map((t) => <span key={t} className="tag tag--acc">{t}</span>)}
                  </div>
                )}
                {p.links.length > 0 && (
                  <div className="project-card__links">
                    {p.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>{l.label} ↗</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  )
}
