import { useCallback } from 'react'

export default function LinkEditor({ links = [], onChange }) {
  const update = useCallback((i, field, value) => {
    const next = links.map((l, idx) => idx === i ? { ...l, [field]: value } : l)
    onChange(next)
  }, [links, onChange])

  const add = useCallback(() => {
    onChange([...links, { _id: crypto.randomUUID(), label: '', url: '' }])
  }, [links, onChange])

  const remove = useCallback((i) => {
    onChange(links.filter((_, idx) => idx !== i))
  }, [links, onChange])

  return (
    <div className="adm-link-editor">
      {links.map((link, i) => (
        <div key={link._id ?? i} className="adm-link-row">
          <input
            value={link.label ?? ''}
            onChange={e => update(i, 'label', e.target.value)}
            placeholder="Label"
            className="adm-input"
          />
          <input
            value={link.url ?? ''}
            onChange={e => update(i, 'url', e.target.value)}
            placeholder="https://…"
            type="url"
            className="adm-input adm-input--wide"
          />
          <button type="button" onClick={() => remove(i)} className="adm-btn adm-btn--sm adm-btn--ghost">×</button>
        </div>
      ))}
      <button type="button" onClick={add} className="adm-btn adm-btn--sm adm-btn--ghost">
        + Add link
      </button>
    </div>
  )
}
