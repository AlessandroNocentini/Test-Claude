import { useAdmin } from '../AdminContext'
import ItemCard from '../components/ItemCard'
import TagEditor from '../components/TagEditor'

export default function WorkSection() {
  const { data, setData } = useAdmin()
  const items = data.work ?? []

  const update = (id, key, val) =>
    setData(d => ({ ...d, work: d.work.map(w => w._id === id ? { ...w, [key]: val } : w) }))

  const addItem = () =>
    setData(d => ({
      ...d,
      work: [...d.work, {
        _id: crypto.randomUUID(), role: '', company: '', period: '', domain: '',
        description: '', bullets: [], tags: [], links: [],
      }],
    }))

  const deleteItem = (id) =>
    setData(d => ({ ...d, work: d.work.filter(w => w._id !== id) }))

  const move = (idx, dir) =>
    setData(d => {
      const arr = [...d.work]
      ;[arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
      return { ...d, work: arr }
    })

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Work Experience</h2>
      {items.map((w, i) => (
        <ItemCard
          key={w._id}
          summary={w.role ? `${w.role} @ ${w.company}` : '(new entry)'}
          onDelete={() => deleteItem(w._id)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, 1)}
          isFirst={i === 0}
          isLast={i === items.length - 1}
        >
          <label className="adm-label">Role
            <input className="adm-input" defaultValue={w.role}
              onBlur={e => update(w._id, 'role', e.target.value)} />
          </label>
          <label className="adm-label">Company
            <input className="adm-input" defaultValue={w.company}
              onBlur={e => update(w._id, 'company', e.target.value)} />
          </label>
          <div className="adm-row">
            <label className="adm-label">Period
              <input className="adm-input" defaultValue={w.period}
                onBlur={e => update(w._id, 'period', e.target.value)} />
            </label>
            <label className="adm-label">Domain
              <input className="adm-input" defaultValue={w.domain}
                onBlur={e => update(w._id, 'domain', e.target.value)} />
            </label>
          </div>
          <label className="adm-label">Description
            <textarea className="adm-textarea" defaultValue={w.description} rows={3}
              onBlur={e => update(w._id, 'description', e.target.value)} />
          </label>
          <label className="adm-label">Bullets <span className="adm-hint">(press Enter or comma to add)</span></label>
          <TagEditor tags={w.bullets ?? []} onChange={tags => update(w._id, 'bullets', tags)} />
          <label className="adm-label" style={{ marginTop: '0.75rem' }}>Tags
            <span className="adm-hint"> (skill tags)</span>
          </label>
          <TagEditor tags={w.tags ?? []} onChange={tags => update(w._id, 'tags', tags)} />
          <label className="adm-label" style={{ marginTop: '0.75rem' }}>Links
            <span className="adm-hint"> (plain URLs — one per row)</span>
          </label>
          {(w.links ?? []).map((url, li) => (
            <div key={li} className="adm-link-row">
              <input
                className="adm-input adm-input--wide"
                defaultValue={url}
                placeholder="https://…"
                onBlur={e => {
                  const next = [...(w.links ?? [])]
                  next[li] = e.target.value
                  update(w._id, 'links', next)
                }}
              />
              <button type="button" className="adm-btn adm-btn--sm adm-btn--ghost"
                onClick={() => update(w._id, 'links', (w.links ?? []).filter((_, j) => j !== li))}>
                ×
              </button>
            </div>
          ))}
          <button type="button" className="adm-btn adm-btn--sm adm-btn--ghost"
            onClick={() => update(w._id, 'links', [...(w.links ?? []), ''])}>
            + Add link
          </button>
        </ItemCard>
      ))}
      <button type="button" className="adm-btn adm-btn--primary adm-add-btn" onClick={addItem}>
        + Add work experience
      </button>
    </div>
  )
}
