import { useAdmin } from '../AdminContext'
import LinkEditor from '../components/LinkEditor'

export default function ProfileSection() {
  const { data, setData } = useAdmin()
  const { profile, about, cv } = data

  const setProfile = (key, val) =>
    setData(d => ({ ...d, profile: { ...d.profile, [key]: val } }))

  const setParagraph = (id, val) =>
    setData(d => ({
      ...d,
      about: {
        ...d.about,
        paragraphs: d.about.paragraphs.map(p => p._id === id ? { ...p, text: val } : p),
      },
    }))

  const addParagraph = () =>
    setData(d => ({
      ...d,
      about: {
        ...d.about,
        paragraphs: [...d.about.paragraphs, { _id: crypto.randomUUID(), text: '' }],
      },
    }))

  const removeParagraph = (id) =>
    setData(d => ({
      ...d,
      about: {
        ...d.about,
        paragraphs: d.about.paragraphs.filter(p => p._id !== id),
      },
    }))

  const moveParagraph = (idx, dir) =>
    setData(d => {
      const ps = [...d.about.paragraphs]
      const swap = idx + dir
      ;[ps[idx], ps[swap]] = [ps[swap], ps[idx]]
      return { ...d, about: { ...d.about, paragraphs: ps } }
    })

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Profile</h2>

      <fieldset className="adm-fieldset">
        <legend>Identity</legend>
        <label className="adm-label">
          Name
          <input className="adm-input" defaultValue={profile.name}
            onBlur={e => setProfile('name', e.target.value)} />
        </label>
        <label className="adm-label">
          Surname
          <input className="adm-input" defaultValue={profile.surname}
            onBlur={e => setProfile('surname', e.target.value)} />
        </label>
        <label className="adm-label">
          Tagline / Headline <span className="adm-hint">(use " | " to separate two roles)</span>
          <input className="adm-input" defaultValue={profile.headline}
            onBlur={e => setProfile('headline', e.target.value)} />
        </label>
        <label className="adm-label">
          Location
          <input className="adm-input" defaultValue={profile.location}
            onBlur={e => setProfile('location', e.target.value)} />
        </label>
        <label className="adm-label">
          Profile Image URL <span className="adm-hint">(leave blank to use initial placeholder)</span>
          <input className="adm-input" defaultValue={profile.image ?? ''}
            onBlur={e => setProfile('image', e.target.value || null)} />
        </label>
      </fieldset>

      <fieldset className="adm-fieldset">
        <legend>CV / Resume URL</legend>
        <label className="adm-label">
          CV Link
          <input className="adm-input" defaultValue={cv}
            onBlur={e => setData(d => ({ ...d, cv: e.target.value }))} />
        </label>
      </fieldset>

      <fieldset className="adm-fieldset">
        <legend>Social / Profile Links</legend>
        <LinkEditor
          links={profile.links ?? []}
          onChange={links => setProfile('links', links)}
        />
      </fieldset>

      <fieldset className="adm-fieldset">
        <legend>About — Paragraphs</legend>
        {about.paragraphs.map((p, i) => (
          <div key={p._id} className="adm-para-row">
            <div className="adm-para-controls">
              <button type="button" onClick={() => moveParagraph(i, -1)} disabled={i === 0}
                className="adm-btn adm-btn--xs adm-btn--ghost">↑</button>
              <button type="button" onClick={() => moveParagraph(i, 1)} disabled={i === about.paragraphs.length - 1}
                className="adm-btn adm-btn--xs adm-btn--ghost">↓</button>
              <button type="button" onClick={() => removeParagraph(p._id)}
                className="adm-btn adm-btn--xs adm-btn--danger">×</button>
            </div>
            <textarea
              className="adm-textarea"
              defaultValue={p.text}
              rows={3}
              onBlur={e => setParagraph(p._id, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addParagraph} className="adm-btn adm-btn--ghost">
          + Add paragraph
        </button>
      </fieldset>
    </div>
  )
}
