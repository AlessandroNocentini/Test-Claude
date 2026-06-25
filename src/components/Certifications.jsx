import { certifications } from '../data/content'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Certifications() {
  const ref = useScrollReveal()

  return (
    <section id="certifications" className="section" ref={ref}>
      <div className="container">
        <div className="sec-header reveal">
          <span className="sec-num">// 06</span>
          <h2 className="sec-title">Certifications</h2>
        </div>

        <div className="certs__list">
          {certifications.map((cert, i) => (
            <div key={cert.id} className="cert-item reveal" style={{'--delay': `${i * 0.08}s`}}>
              <div>
                <p className="cert-item__name">{cert.name}</p>
                <p className="cert-item__sub">{cert.issuer}</p>
              </div>
              <div className="cert-item__right">
                <span className="cert-item__year">{cert.date}</span>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} className="cert-item__verify" target="_blank" rel="noreferrer">
                    Verify ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
