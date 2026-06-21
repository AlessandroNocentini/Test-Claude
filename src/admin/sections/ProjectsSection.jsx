import { useAdmin } from '../AdminContext'
import ItemCard from '../components/ItemCard'
import TagEditor from '../components/TagEditor'
import LinkEditor from '../components/LinkEditor'

const KINDS = ['academic', 'personal', 'professional']
const TYPES = ['project', 'paper']

export default function ProjectsSection() {
  const { data, setData } = useAdmin()
  const items = data.projects ?? []

  const update = (id, key, val) =>
    setData(d => ({ ...d, projects: d.projects.map(p => p._id === id ? { ...p, [key]: val } : p) }))

  const updatePaper = (id, key, val) =>
    setData(d => ({
      ...d,
      projects: d.projects.map(p =>
        p._id === id ? { ...p, paper: { ...(p.paper ?? {}), [key]: val } } : p
      ),
    }))

  const addItem = () =>
    setData(d => ({
      ...d,
      projects: [...d.projects, {
        _id: crypto.randomUUID(), name: '', kind: 'personal', type: 'project',
        year: '', shortDescription: '', longDescription: '',
        images: { thumbnail: '', gallery: [] },
        technologies: [], links: [], paper: null,
      }],
    }))

  const deleteItem = (id) =>
    setData(d => ({ ...d, projects: d.projects.filter(p => p._id !== id) }))

  const move = (idx, dir) =>
    setData(d => {
      const arr = [...d.projects]
      ;[arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
      return { ...d, projects: arr }
    })

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Projects</h2>
      {items.map((p, i) => (
        <ItemCard
          key={p._id}
          summary={p.name || '(new project)'}
          onDelete={() => deleteItem(p._id)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, 1)}
          isFirst={i === 0}
          isLast={i === items.length - 1}
        >
          <label className="adm-label">Name
            <input className="adm-input" defaultValue={p.name}
              onBlur={e => update(p._id, 'name', e.target.value)} />
          </label>
          <div className="adm-row">
            <label className="adm-label">Kind
              <select className="adm-select" value={p.kind}
                onChange={e => update(p._id, 'kind', e.target.value)}>
                {KINDS.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </label>
            <label className="adm-label">Type
              <select className="adm-select" value={p.type}
                onChange={e => {
                  update(p._id, 'type', e.target.value)
                  if (e.target.value === 'paper' && !p.paper) {
                    update(p._id, 'paper', { venue: '', year: '', doi: '', pdf: '' })
                  } else if (e.target.value === 'project') {
                    update(p._id, 'paper', null)
                  }
                }}>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="adm-label">Year
              <input className="adm-input" defaultValue={p.year ?? ''}
                onBlur={e => update(p._id, 'year', e.target.value)} />
            </label>
          </div>
          <label className="adm-label">Short Description <span className="adm-hint">(shown on card)</span>
            <textarea className="adm-textarea" defaultValue={p.shortDescription ?? p.description ?? ''} rows={2}
              onBlur={e => update(p._id, 'shortDescription', e.target.value)} />
          </label>
          <label className="adm-label">Long Description <span className="adm-hint">(shown in modal)</span>
            <textarea className="adm-textarea" defaultValue={p.longDescription ?? ''} rows={4}
              onBlur={e => update(p._id, 'longDescription', e.target.value)} />
          </label>
          <label className="adm-label">Thumbnail URL
            <input className="adm-input" defaultValue={p.images?.thumbnail ?? ''}
              onBlur={e => update(p._id, 'images', { ...(p.images ?? { gallery: [] }), thumbnail: e.target.value })} />
          </label>
          <label className="adm-label">Technologies</label>
          <TagEditor
            tags={p.technologies ?? []}
            onChange={tags => update(p._id, 'technologies', tags)}
            placeholder="Add technology…"
          />
          <label className="adm-label" style={{ marginTop: '0.75rem' }}>Links</label>
          <LinkEditor
            links={p.links ?? []}
            onChange={links => update(p._id, 'links', links)}
          />
          {p.type === 'paper' && p.paper !== null && (
            <fieldset className="adm-fieldset" style={{ marginTop: '1rem' }}>
              <legend>Paper details</legend>
              <label className="adm-label">Venue
                <input className="adm-input" defaultValue={p.paper?.venue ?? ''}
                  onBlur={e => updatePaper(p._id, 'venue', e.target.value)} />
              </label>
              <div className="adm-row">
                <label className="adm-label">Year
                  <input className="adm-input" defaultValue={p.paper?.year ?? ''}
                    onBlur={e => updatePaper(p._id, 'year', e.target.value)} />
                </label>
                <label className="adm-label">DOI
                  <input className="adm-input" defaultValue={p.paper?.doi ?? ''}
                    onBlur={e => updatePaper(p._id, 'doi', e.target.value)} />
                </label>
              </div>
              <label className="adm-label">PDF URL
                <input className="adm-input" defaultValue={p.paper?.pdf ?? ''}
                  onBlur={e => updatePaper(p._id, 'pdf', e.target.value)} />
              </label>
            </fieldset>
          )}
        </ItemCard>
      ))}
      <button type="button" className="adm-btn adm-btn--primary adm-add-btn" onClick={addItem}>
        + Add project
      </button>
    </div>
  )
}
