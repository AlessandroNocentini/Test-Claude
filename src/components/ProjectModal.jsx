import { useEffect } from 'react'

const KIND_LABEL = { academic: 'Academic', personal: 'Personal', professional: 'Professional' }
const KIND_CLASS  = { academic: 'badge--academic', personal: 'badge--personal', professional: 'badge--professional' }
const TYPE_LABEL  = { project: 'Project', paper: 'Paper' }

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!project) return null

  const desc = project.longDescription || project.description

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal__meta">
          <span className={`badge ${KIND_CLASS[project.kind]}`}>{KIND_LABEL[project.kind]}</span>
          <span className="badge badge--paper">{TYPE_LABEL[project.type]}</span>
        </div>

        <h2 className="modal__name">{project.name}</h2>

        {project.images?.thumbnail && (
          <img className="modal__thumbnail" src={project.images.thumbnail} alt={project.name} />
        )}

        {desc && <p className="modal__desc">{desc}</p>}

        {project.images?.gallery?.length > 0 && (
          <div className="modal__gallery">
            {project.images.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${project.name} ${i + 1}`} />
            ))}
          </div>
        )}

        {project.paper?.venue && (
          <div className="project-card__paper" style={{ marginTop: '1.25rem' }}>
            <p className="paper__venue">
              {project.paper.venue}{project.paper.year ? `, ${project.paper.year}` : ''}
            </p>
            <div className="paper__links">
              {project.paper.doiUrl && <a href={project.paper.doiUrl} target="_blank" rel="noreferrer">DOI ↗</a>}
              {project.paper.pdfUrl && <a href={project.paper.pdfUrl} target="_blank" rel="noreferrer">PDF ↗</a>}
            </div>
          </div>
        )}

        {project.technologies.length > 0 && (
          <div className="tag-list" style={{ marginTop: '1.25rem' }}>
            {project.technologies.map(t => <span key={t} className="tag tag--acc">{t}</span>)}
          </div>
        )}

        {project.links.length > 0 && (
          <div className="project-card__links" style={{ marginTop: '1rem' }}>
            {project.links.map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
