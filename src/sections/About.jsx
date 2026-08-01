import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { PROFILE, STATS } from '../constants/data.js'

function Counter({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {value}+
    </motion.span>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">ABOUT ME</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          The <span className="gradient-text">person</span> behind the code
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <Reveal direction="left" className="relative">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-dark-primary to-dark-secondary blur-2xl opacity-30 animate-float" />
            <div className="relative w-full h-full rounded-[2rem] glass overflow-hidden flex items-center justify-center">
              <img
                src="/profile-photo.jpeg"
                alt={`Portrait of ${PROFILE.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal direction="right">
          <p className="text-current/70 leading-relaxed mb-6">{PROFILE.bio}</p>
          <ul className="space-y-2 mb-8 text-sm text-current/70">
            <li><span className="text-current/50">Based in:</span> {PROFILE.location}</li>
            <li><span className="text-current/50">Email:</span> {PROFILE.email}</li>
          </ul>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="font-display text-2xl font-bold gradient-text">
                  <Counter value={stat.value} />
                </p>
                <p className="text-xs text-current/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
