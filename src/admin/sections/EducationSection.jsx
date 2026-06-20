import { useAdmin } from '../AdminContext'
import ItemCard from '../components/ItemCard'
import LinkEditor from '../components/LinkEditor'

export default function EducationSection() {
  const { data, setData } = useAdmin()
  const items = data.education ?? []

  const update = (id, key, val) =>
    setData(d => ({ ...d, education: d.education.map(e => e._id === id ? { ...e, [key]: val } : e) }))

  const addItem = () =>
    setData(d => ({
      ...d,
      education: [...d.education, {
        _id: crypto.randomUUID(), degree: '', institution: '', period: '',
        domain: '', thesis: '', links: [],
      }],
    }))

  const deleteItem = (id) =>
    setData(d => ({ ...d, education: d.education.filter(e => e._id !== id) }))

  const move = (idx, dir) =>
    setData(d => {
      const arr = [...d.education]
      ;[arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
      return { ...d, education: arr }
    })

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Education</h2>
      {items.map((e, i) => (
        <ItemCard
          key={e._id}
          summary={e.degree ? `${e.degree} — ${e.institution}` : '(new entry)'}
          onDelete={() => deleteItem(e._id)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, 1)}
          isFirst={i === 0}
          isLast={i === items.length - 1}
        >
          <label className="adm-label">Degree / Programme
            <input className="adm-input" defaultValue={e.degree}
              onBlur={ev => update(e._id, 'degree', ev.target.value)} />
          </label>
          <label className="adm-label">Institution
            <input className="adm-input" defaultValue={e.institution}
              onBlur={ev => update(e._id, 'institution', ev.target.value)} />
          </label>
          <div className="adm-row">
            <label className="adm-label">Period
              <input className="adm-input" defaultValue={e.period}
                onBlur={ev => update(e._id, 'period', ev.target.value)} />
            </label>
            <label className="adm-label">Domain / Field
              <input className="adm-input" defaultValue={e.domain}
                onBlur={ev => update(e._id, 'domain', ev.target.value)} />
            </label>
          </div>
          <label className="adm-label">
            Thesis / Dissertation
            <span className="adm-hint"> (use **bold** for emphasis, \n for new line)</span>
            <textarea className="adm-textarea" defaultValue={e.thesis ?? ''} rows={4}
              onBlur={ev => update(e._id, 'thesis', ev.target.value)} />
          </label>
          <label className="adm-label" style={{ marginTop: '0.75rem' }}>Links</label>
          <LinkEditor
            links={e.links ?? []}
            onChange={links => update(e._id, 'links', links)}
          />
        </ItemCard>
      ))}
      <button type="button" className="adm-btn adm-btn--primary adm-add-btn" onClick={addItem}>
        + Add education entry
      </button>
    </div>
  )
}
