import { skills, languages } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

const LEVEL_ORDER = ['Expert', 'Advanced', 'Intermediate', 'Beginner']
const LEVEL_CLASS = {
  Expert:       'lvl-expert',
  Advanced:     'lvl-advanced',
  Intermediate: 'lvl-intermediate',
  Beginner:     'lvl-beginner',
}

export default function Skills() {
  const ref = useScrollReveal()
  const allGroups = [
    ...skills,
    { category: 'Languages', items: languages.map(l => ({ name: l.name, level: l.level })) },
  ]

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">04 / Skills</span>
          <h2 className="sec-title">Skills & Tools</h2>
        </div>

        <div className="skills__grid">
          {allGroups.map((group, i) => (
            <div key={group.category} className="skills__card reveal" style={{'--delay': `${i * 0.05}s`}}>
              <p className="skills__cat">{group.category}</p>
              <div className="skills__items">
                {group.items
                  .slice()
                  .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))
                  .map((item) => (
                    <div key={item.name} className="skill-row">
                      <span className="skill-row__name">{item.name}</span>
                      <span className={`skill-lvl ${LEVEL_CLASS[item.level] ?? ''}`}>{item.level}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
