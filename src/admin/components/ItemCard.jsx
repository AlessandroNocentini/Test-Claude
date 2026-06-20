import { useState } from 'react'
import ConfirmButton from './ConfirmButton'

export default function ItemCard({
  summary,
  children,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  defaultOpen = false,
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`adm-item-card${open ? ' adm-item-card--open' : ''}`}>
      <div className="adm-item-card__header">
        <button
          type="button"
          className="adm-item-card__toggle"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
        >
          <span className="adm-item-card__chevron">{open ? '▾' : '▸'}</span>
          <span className="adm-item-card__summary">{summary}</span>
        </button>
        <div className="adm-item-card__controls">
          <button type="button" onClick={onMoveUp}  disabled={isFirst}  className="adm-btn adm-btn--xs adm-btn--ghost" title="Move up">↑</button>
          <button type="button" onClick={onMoveDown} disabled={isLast}  className="adm-btn adm-btn--xs adm-btn--ghost" title="Move down">↓</button>
          <ConfirmButton onConfirm={onDelete} label="Delete" />
        </div>
      </div>
      {open && <div className="adm-item-card__body">{children}</div>}
    </div>
  )
}
