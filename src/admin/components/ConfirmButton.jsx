import { useState, useEffect, useRef } from 'react'

export default function ConfirmButton({ onConfirm, label = 'Delete', className = '' }) {
  const [confirming, setConfirming] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true)
      timerRef.current = setTimeout(() => setConfirming(false), 3000)
    } else {
      clearTimeout(timerRef.current)
      setConfirming(false)
      onConfirm()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`adm-btn adm-btn--danger${confirming ? ' adm-btn--confirming' : ''} ${className}`}
    >
      {confirming ? 'Confirm?' : label}
    </button>
  )
}
