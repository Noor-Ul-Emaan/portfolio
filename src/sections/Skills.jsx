import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { SKILLS } from '../constants/data.js'

function SkillBar({ name, level, delay }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-current/50 font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-accent"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const categories = Object.entries(SKILLS)

  return (
    <section id="skills" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">SKILLS</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Tools I use to <span className="gradient-text">build things</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map(([category, skills], catIndex) => (
          <Reveal key={category} direction="up" delay={catIndex * 0.1} className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-display font-semibold text-lg mb-6 gradient-text">{category}</h3>
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.1} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
