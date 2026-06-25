import { useEffect, useRef } from 'react'
import { personal } from '../data/content'

export default function Hero() {
  const canvasRef = useRef(null)
  const [role1, role2] = personal.headline.split(' | ')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      const amp  = height * 0.07
      const yMid = height * 0.5
      const freq = 0.007

      // Primary trace — ember glow
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(232, 113, 74, 0.45)'
      ctx.lineWidth   = 1.5
      ctx.shadowBlur  = 14
      ctx.shadowColor = 'rgba(232, 113, 74, 0.55)'
      for (let x = 0; x <= width; x += 2) {
        const y = yMid
          + Math.sin((x * freq + t) * 2.6) * amp * 0.55
          + Math.sin((x * freq + t) * 1.1) * amp * 0.35
          + Math.sin((x * freq * 0.4 + t * 0.6)) * amp * 0.2
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Secondary trace — cool blue, offset
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(106, 159, 216, 0.15)'
      ctx.lineWidth   = 1
      ctx.shadowBlur  = 0
      for (let x = 0; x <= width; x += 2) {
        const y = height * 0.3
          + Math.sin((x * freq + t * 0.7 + 1.5) * 1.9) * amp * 0.35
          + Math.sin((x * freq * 0.6 + t * 0.4)) * amp * 0.22
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Tertiary trace — very faint
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(232, 113, 74, 0.07)'
      ctx.lineWidth   = 1
      for (let x = 0; x <= width; x += 3) {
        const y = height * 0.72
          + Math.sin((x * freq * 1.3 + t * 1.2 + 2.1) * 2.2) * amp * 0.28
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()

      t  += 0.007
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      <div className="hero__hud hero__hud--tl" aria-hidden="true">
        <span>SYS_ID // AN-001</span>
        <span>{personal.location}</span>
      </div>
      <div className="hero__hud hero__hud--tr" aria-hidden="true">
        <span className="hero__status">
          <span className="hero__status-dot" />ONLINE
        </span>
        <span>CTRL + AI</span>
      </div>
      <div className="hero__hud hero__hud--br" aria-hidden="true">
        <span>// PORTFOLIO v3.0</span>
      </div>

      <div className="hero__inner">
        <p className="hero__eyebrow">
          <span className="hero__bracket">[</span>
          {' '}Automation · AI · Control{' '}
          <span className="hero__bracket">]</span>
        </p>

        <h1 className="hero__name">
          <span className="hero__name-first">{personal.name.split(' ')[0]}</span>
          <br />
          <span className="hero__name-last">{personal.name.split(' ')[1]}</span>
        </h1>

        <div className="hero__roles">
          <span className="hero__role">{role1?.trim()}</span>
          <span className="hero__sep" aria-hidden="true"> · </span>
          <span className="hero__role">{role2?.trim()}</span>
        </div>

        <div className="hero__actions">
          <a href="#projects" className="btn">View Work ↓</a>
          <a href={personal.cvUrl} className="btn btn--ghost" target="_blank" rel="noreferrer">
            {personal.cvTitle} ↗
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-label">SCROLL</span>
      </div>
    </section>
  )
}
