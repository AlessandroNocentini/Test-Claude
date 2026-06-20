import { useState } from 'react'

export default function TagEditor({ tags = [], onChange, placeholder = 'Add tag…' }) {
  const [input, setInput] = useState('')

  const add = () => {
    const val = input.trim()
    if (val && !tags.includes(val)) {
      onChange([...tags, val])
    }
    setInput('')
  }

  const remove = (tag) => onChange(tags.filter(t => t !== tag))

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add()
    } else if (e.key === 'Backspace' && input === '' && tags.length) {
      remove(tags[tags.length - 1])
    }
  }

  return (
    <div className="adm-tag-editor">
      {tags.map(tag => (
        <span key={tag} className="adm-chip">
          {tag}
          <button type="button" onClick={() => remove(tag)} aria-label={`Remove ${tag}`}>×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={add}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="adm-tag-input"
      />
    </div>
  )
}
