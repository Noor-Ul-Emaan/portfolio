import Reveal from '../components/Reveal.jsx'
import Timeline from '../components/Timeline.jsx'
import { EXPERIENCE } from '../constants/data.js'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">EXPERIENCE</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Where I've <span className="gradient-text">worked</span>
        </h2>
      </Reveal>
      <Timeline items={EXPERIENCE} primaryKey="role" secondaryKey="year" />
    </section>
  )
}
