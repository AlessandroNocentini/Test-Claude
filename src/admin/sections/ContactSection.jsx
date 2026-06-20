import { useAdmin } from '../AdminContext'
import LinkEditor from '../components/LinkEditor'

export default function ContactSection() {
  const { data, setData } = useAdmin()
  const contacts = data.contacts ?? {}

  const set = (key, val) =>
    setData(d => ({ ...d, contacts: { ...d.contacts, [key]: val } }))

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Contact</h2>

      <fieldset className="adm-fieldset">
        <legend>Contact Details</legend>
        <label className="adm-label">Email
          <input className="adm-input" type="email" defaultValue={contacts.email ?? ''}
            onBlur={e => set('email', e.target.value)} />
        </label>
        <label className="adm-label">Phone <span className="adm-hint">(optional)</span>
          <input className="adm-input" type="tel" defaultValue={contacts.phone ?? ''}
            onBlur={e => set('phone', e.target.value || null)} />
        </label>
      </fieldset>

      <fieldset className="adm-fieldset">
        <legend>Social / Contact Links</legend>
        <p className="adm-hint" style={{ marginBottom: '0.5rem' }}>
          These appear in the Contact section footer. Add GitHub, LinkedIn, Instagram, etc.
        </p>
        <LinkEditor
          links={contacts.links ?? []}
          onChange={links => set('links', links)}
        />
      </fieldset>
    </div>
  )
}
