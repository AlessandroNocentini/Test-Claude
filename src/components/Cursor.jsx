import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot  = document.getElementById('c-dot')
    const ring = document.getElementById('c-ring')
    if (!dot || !ring) return

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let rafId

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px, ${my}px)`
    }

    const loop = () => {
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      rafId = requestAnimationFrame(loop)
    }

    const expand = () => ring.classList.add('expanded')
    const shrink = () => ring.classList.remove('expanded')

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button')) expand()
    })
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button')) shrink()
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="c-dot"  className="c-dot"  aria-hidden="true" />
      <div id="c-ring" className="c-ring" aria-hidden="true" />
    </>
  )
}
