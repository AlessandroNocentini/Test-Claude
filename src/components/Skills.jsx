import { useEffect, useRef } from 'react'
import { skillsFlat } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Skills() {
  const sectionRef = useScrollReveal()
  const rowRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-bar__fill')
            if (fill) fill.style.width = fill.dataset.pct + '%'
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    rowRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">04 / Skills</span>
          <h2 className="sec-title">Skills & Tools</h2>
        </div>

        <div className="skills__bars">
          {skillsFlat.map((s, i) => (
            <div
              key={s.name}
              className="skill-bar reveal"
              style={{ '--delay': `${i * 0.025}s` }}
              ref={el => rowRefs.current[i] = el}
            >
              <div className="skill-bar__labels">
                <span className="skill-bar__name">{s.name}</span>
                <span className={`skill-lvl ${s.cls}`}>{s.level}</span>
              </div>
              <div className="skill-bar__track">
                <div className="skill-bar__fill" data-pct={s.pct} style={{ width: '0%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
