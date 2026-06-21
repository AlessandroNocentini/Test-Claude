import { useAdmin } from '../AdminContext'

const TOKENS = [
  { key: '--bg',                 label: 'Background' },
  { key: '--bg-alt',             label: 'Background Alt' },
  { key: '--surface',            label: 'Surface' },
  { key: '--accent',             label: 'Accent' },
  { key: '--accent-lt',          label: 'Accent Light' },
  { key: '--text',               label: 'Body Text' },
  { key: '--muted',              label: 'Muted Text' },
  { key: '--heading',            label: 'Heading Text' },
  { key: '--lvl-expert',         label: 'Skill: Expert' },
  { key: '--lvl-advanced',       label: 'Skill: Advanced' },
  { key: '--lvl-intermediate',   label: 'Skill: Intermediate' },
  { key: '--lvl-beginner',       label: 'Skill: Beginner' },
  { key: '--badge-academic',     label: 'Badge: Academic' },
  { key: '--badge-personal',     label: 'Badge: Personal' },
  { key: '--badge-professional', label: 'Badge: Professional' },
]

export default function PaletteSection() {
  const { data, setData } = useAdmin()
  const palette = data.palette ?? {}

  const handleChange = (key, value) => {
    document.documentElement.style.setProperty(key, value)
    setData(d => ({ ...d, palette: { ...(d.palette ?? {}), [key]: value } }))
  }

  return (
    <div className="adm-section">
      <h2 className="adm-section-title">Palette</h2>
      <p className="adm-hint" style={{ marginBottom: '1.5rem' }}>
        Changes apply live to the portfolio and are saved to your browser. Use Export JSON to make them permanent.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
        {TOKENS.map(({ key, label }) => (
          <label
            key={key}
            className="adm-label"
            style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginBottom: 0 }}
          >
            <input
              type="color"
              value={palette[key] ?? '#000000'}
              onChange={e => handleChange(key, e.target.value)}
              style={{ width: 38, height: 38, padding: 2, border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', cursor: 'pointer', flexShrink: 0 }}
            />
            <span style={{ color: 'var(--adm-text)', fontWeight: 500 }}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
