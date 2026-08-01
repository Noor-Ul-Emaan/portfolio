import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { Download, Mail, ArrowDown } from 'lucide-react'
import HeroScene from '../components/HeroScene.jsx'
import Canvas3DErrorBoundary from '../components/Canvas3DErrorBoundary.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import { PROFILE } from '../constants/data.js'

function useTypingEffect(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        )
      }, deleting ? speed / 2 : speed)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

const socials = [
  { icon: FaGithub, href: PROFILE.social.github, label: 'GitHub' },
  { icon: FaLinkedin, href: PROFILE.social.linkedin, label: 'LinkedIn' },
  { icon: FaInstagram, href: PROFILE.social.instagram, label: 'Instagram' },
]

export default function Hero() {
  const typed = useTypingEffect(PROFILE.roles)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid + blobs */}
      <div className="absolute inset-0 bg-grid-dark bg-grid opacity-40 dark:opacity-40" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-dark-primary/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-dark-secondary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-dark-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

      {/* 3D layer */}
      <div className="absolute inset-0 md:right-0 md:left-auto md:w-1/2 opacity-90 pointer-events-none">
        <Canvas3DErrorBoundary>
          <HeroScene />
        </Canvas3DErrorBoundary>
      </div>

      <div className="section w-full relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono tracking-wide text-current/70">
              Available for opportunities
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-mono text-sm tracking-widest text-dark-secondary mb-4"
          >
            HELLO, I'M
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
            }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-4 flex flex-wrap"
          >
            {PROFILE.name.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -60 },
                  show: { opacity: 1, y: 0, rotateX: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-text inline-block"
                style={{ transformOrigin: 'bottom' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="h-10 mb-6"
          >
            <span className="font-display text-xl sm:text-2xl font-medium text-current/80">
              {typed}
              <span className="inline-block w-[2px] h-6 bg-dark-secondary ml-1 align-middle animate-pulse" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-current/60 text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
          >
            {PROFILE.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton
              as="a"
              href={PROFILE.cvUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-dark-primary to-dark-secondary text-white font-medium shadow-lg shadow-dark-primary/30 hover:shadow-xl hover:shadow-dark-primary/40"
            >
              <Download size={18} /> Download CV
            </MagneticButton>

            <MagneticButton
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass font-medium"
            >
              <Mail size={18} /> Hire Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor="pointer"
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-dark-secondary hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass flex items-center justify-center z-10"
      >
        <ArrowDown size={16} />
      </motion.button>
    </section>
  )
}
