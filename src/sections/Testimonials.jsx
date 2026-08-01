import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { TESTIMONIALS } from '../constants/data.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length)
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const t = TESTIMONIALS[index]

  return (
    <section id="testimonials" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">TESTIMONIALS</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          What people <span className="gradient-text">say</span>
        </h2>
      </Reveal>

      <div className="max-w-2xl mx-auto relative">
        <Quote className="absolute -top-6 left-6 text-dark-primary/20" size={64} />
        <div className="glass rounded-3xl p-8 sm:p-10 min-h-[260px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="text-center w-full"
            >
              <p className="text-lg sm:text-xl leading-relaxed mb-6 text-current/80">
                "{t.quote}"
              </p>
              <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-dark-primary to-dark-secondary">
                <span className="font-display font-bold text-white text-lg">
                  {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
              </div>
              <p className="font-display font-semibold">{t.name}</p>
              <p className="text-sm text-current/50">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={prev} aria-label="Previous testimonial" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-dark-secondary transition-colors">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-dark-secondary w-6' : 'bg-current/20'
                }`}
              />
            ))}
          </div>
          <button onClick={next} aria-label="Next testimonial" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-dark-secondary transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
