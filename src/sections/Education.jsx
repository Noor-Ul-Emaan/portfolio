import Reveal from '../components/Reveal.jsx'
import Timeline from '../components/Timeline.jsx'
import { EDUCATION } from '../constants/data.js'

export default function Education() {
  return (
    <section id="education" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">EDUCATION</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Academic <span className="gradient-text">background</span>
        </h2>
      </Reveal>
      <Timeline items={EDUCATION} primaryKey="degree" secondaryKey="year" />
    </section>
  )
}
