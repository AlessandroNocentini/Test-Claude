import { useAdmin } from '../AdminContext'
import ItemCard from '../components/ItemCard'

export default function CertificatesSection() {
  const { data, setData } = useAdmin()
  const items = data.certificates ?? []

  const update = (id, key, val) =>
    setData(d => ({ ...d, certificates: d.certificates.map(c => c._id === id ? { ...c, [key]: val } : c) }))

  const addItem = () =>
    setData(d => ({
      ...d,
      certificates: [...d.certificates, {
        _id: crypto.randomUUID(), name: '', issuer: '', date: '', url: '',
      }],
    }))

  const deleteItem = (id) =>
    setData(d => ({ ...d, certificates: d.certificates.filter(c => c._id !== id) }))

  const move = (idx, dir) =>
    setData(d => {
      const arr = [...d.certificates]
      ;[arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]]
      return { ...d, certificates: arr }
    })

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Certificates</h2>
      {items.map((c, i) => (
        <ItemCard
          key={c._id}
          summary={c.name || '(new certificate)'}
          onDelete={() => deleteItem(c._id)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, 1)}
          isFirst={i === 0}
          isLast={i === items.length - 1}
        >
          <label className="adm-label">Certificate Name
            <input className="adm-input" defaultValue={c.name}
              onBlur={e => update(c._id, 'name', e.target.value)} />
          </label>
          <div className="adm-row">
            <label className="adm-label">Issuer
              <input className="adm-input" defaultValue={c.issuer ?? ''}
                onBlur={e => update(c._id, 'issuer', e.target.value)} />
            </label>
            <label className="adm-label">Date
              <input className="adm-input" placeholder="YYYY-MM-DD" defaultValue={c.date ?? ''}
                onBlur={e => update(c._id, 'date', e.target.value)} />
            </label>
          </div>
          <label className="adm-label">Credential URL
            <input className="adm-input" type="url" defaultValue={c.url ?? ''}
              onBlur={e => update(c._id, 'url', e.target.value)} />
          </label>
        </ItemCard>
      ))}
      <button type="button" className="adm-btn adm-btn--primary adm-add-btn" onClick={addItem}>
        + Add certificate
      </button>
    </div>
  )
}
