const ITEMS = [
  'Automation Engineering',
  'AI Research',
  'Machine Learning',
  'Reinforcement Learning',
  'Control Systems',
  'Robotics',
  'Computer Vision',
  'Python',
  'MATLAB',
  'Generative AI',
]

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee__item">{item}</span>
        ))}
      </div>
    </div>
  )
}
