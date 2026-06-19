import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section__title">Skills</h2>
        <div className="skills__grid">
          {skills.map((group) => (
            <div key={group.category} className="skills__card">
              <h3 className="skills__category">{group.category}</h3>
              <div className="tag-list">
                {group.items.map((item) => (
                  <span key={item} className="tag tag--accent">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
