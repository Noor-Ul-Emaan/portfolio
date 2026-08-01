import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: py * -14, ry: px * 14, x: px * 14, y: py * 14 })
  }

  const resetTilt = () => setTilt({ rx: 0, ry: 0, x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="tilt-card"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{ transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        className="group relative glass rounded-2xl overflow-hidden transition-transform duration-200 ease-out"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-dark-primary/0 via-dark-secondary/0 to-dark-accent/0 group-hover:from-dark-primary/60 group-hover:via-dark-secondary/60 group-hover:to-dark-accent/60 blur-md transition-all duration-500 -z-10" />

        <div
          style={{ transform: `translate(${tilt.x}px, ${tilt.y}px) translateZ(20px)`, transformStyle: 'preserve-3d' }}
          className="transition-transform duration-200 ease-out"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="p-6">
            <h3 className="font-display font-semibold text-lg mb-2">{project.title}</h3>
            <p className="text-sm text-current/60 mb-4 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-full bg-dark-primary/10 text-dark-secondary border border-dark-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={project.demo}
                data-cursor="pointer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-dark-secondary transition-colors"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
              <a
                href={project.github}
                data-cursor="pointer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-dark-secondary transition-colors"
              >
                <Github size={15} /> Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
