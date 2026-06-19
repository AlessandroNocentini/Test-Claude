import { certifications } from '../data/content'

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications">
      <div className="container">
        <h2 className="section__title">Certifications</h2>
        <div className="certs__grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-card__badge">✦</div>
              <div className="cert-card__body">
                <h3 className="cert-card__name">{cert.name}</h3>
                <p className="cert-card__issuer">{cert.issuer}</p>
                <p className="cert-card__date">{cert.date}</p>
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  className="cert-card__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Verify →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
