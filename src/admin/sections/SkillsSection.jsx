import { useAdmin } from '../AdminContext'
import ItemCard from '../components/ItemCard'

const LEVELS = ['Expert', 'Advanced', 'Intermediate', 'Beginner']

function SkillList({ items, keyName, addItem, deleteItem, update, move }) {
  return (
    <>
      {items.map((s, i) => (
        <ItemCard
          key={s._id}
          summary={s.name ? `${s.name} — ${s.category ?? ''} (${s.level})` : '(new skill)'}
          onDelete={() => deleteItem(s._id)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, 1)}
          isFirst={i === 0}
          isLast={i === items.length - 1}
        >
          <div className="adm-row">
            <label className="adm-label">Name
              <input className="adm-input" defaultValue={s.name}
                onBlur={e => update(s._id, 'name', e.target.value)} />
            </label>
            <label className="adm-label">Category
              <input className="adm-input" defaultValue={s.category ?? ''}
                onBlur={e => update(s._id, 'category', e.target.value)} />
            </label>
          </div>
          <label className="adm-label">Level
            <select className="adm-select" value={s.level}
              onChange={e => update(s._id, 'level', e.target.value)}>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </label>
        </ItemCard>
      ))}
      <button type="button" className="adm-btn adm-btn--primary adm-add-btn" onClick={addItem}>
        + Add {keyName === 'languages' ? 'language' : 'skill'}
      </button>
    </>
  )
}

export default function SkillsSection() {
  const { data, setData } = useAdmin()

  const makeHandlers = (keyName) => ({
    update: (id, key, val) =>
      setData(d => ({ ...d, [keyName]: d[keyName].map(s => s._id === id ? { ...s, [key]: val } : s) })),
    addItem: () =>
      setData(d => ({
        ...d,
        [keyName]: [...d[keyName], { _id: crypto.randomUUID(), name: '', category: '', level: 'Intermediate' }],
      })),
    deleteItem: (id) =>
      setData(d => ({ ...d, [keyName]: d[keyName].filter(s => s._id !== id) })),
    move: (idx, dir) =>
      setData(d => {
        const arr = [...d[keyName]]
        ;[arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
        return { ...d, [keyName]: arr }
      }),
  })

  const skillHandlers = makeHandlers('skills')
  const langHandlers = makeHandlers('languages')

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Skills</h2>
      <SkillList items={data.skills ?? []} keyName="skills" {...skillHandlers} />

      <h2 className="adm-section-title" style={{ marginTop: '2rem' }}>Languages</h2>
      <SkillList items={data.languages ?? []} keyName="languages" {...langHandlers} />
    </div>
  )
}
