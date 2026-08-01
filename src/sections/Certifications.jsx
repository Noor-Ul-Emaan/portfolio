import { ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { CERTIFICATIONS } from '../constants/data.js'

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">CERTIFICATIONS</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Always <span className="gradient-text">learning</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {CERTIFICATIONS.map((cert, i) => (
          <Reveal key={cert.title} direction="up" delay={i * 0.1} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-40 overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold mb-1">{cert.title}</h3>
              <p className="text-sm text-current/50 mb-4">{cert.platform}</p>
              <a
                href={cert.url}
                data-cursor="pointer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-dark-secondary transition-colors"
              >
                <ExternalLink size={14} /> View Certificate
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
