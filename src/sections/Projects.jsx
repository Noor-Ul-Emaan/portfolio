import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { PROJECTS } from '../constants/data.js'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">PROJECTS</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Selected <span className="gradient-text">work</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
