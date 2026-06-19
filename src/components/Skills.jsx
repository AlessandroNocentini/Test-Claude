import { skills, languages } from '../data/content'

const LEVEL_ORDER = ['Expert', 'Advanced', 'Intermediate', 'Beginner']
const LEVEL_CLASS = {
  Expert: 'level--expert',
  Advanced: 'level--advanced',
  Intermediate: 'level--intermediate',
  Beginner: 'level--beginner',
}

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <div className="skills__grid">
          {skills.map((group) => (
            <div key={group.category} className="skills__card">
              <h3 className="skills__category">{group.category}</h3>
              <div className="skills__items">
                {group.items
                  .slice()
                  .sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))
                  .map((item) => (
                    <div key={item.name} className="skill-row">
                      <span className="skill-row__name">{item.name}</span>
                      <span className={`skill-level ${LEVEL_CLASS[item.level]}`}>{item.level}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="skills__card">
            <h3 className="skills__category">Languages</h3>
            <div className="skills__items">
              {languages.map((lang) => (
                <div key={lang.name} className="skill-row">
                  <span className="skill-row__name">{lang.name}</span>
                  <span className="skill-level level--expert">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
