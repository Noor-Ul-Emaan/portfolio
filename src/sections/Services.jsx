import { Code2, BrainCircuit, LineChart, Palette, Plug } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { SERVICES } from '../constants/data.js'

const icons = [Code2, BrainCircuit, LineChart, Palette, Plug]

export default function Services() {
  return (
    <section id="services" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">SERVICES</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          What I can <span className="gradient-text">do for you</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {SERVICES.map((service, i) => {
          const Icon = icons[i % icons.length]
          return (
            <Reveal
              key={service.title}
              direction="up"
              delay={i * 0.08}
              className="glass rounded-2xl p-7 group hover:-translate-y-2 hover:border-dark-secondary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dark-primary to-dark-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-current/60 leading-relaxed">{service.desc}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
