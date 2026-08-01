import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme.jsx'
import { NAV_LINKS, PROFILE } from '../constants/data.js'
import MagneticButton from './MagneticButton.jsx'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open (prevents background scroll + click issues)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)
    // small delay so menu closes before scroll (avoids layout jump on mobile)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`relative z-50 mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-black/10 py-2 px-5 mx-4 sm:mx-auto' : ''
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          data-cursor="pointer"
          className="font-display font-bold text-xl gradient-text"
        >
          {PROFILE.name.split(' ')[0]}.
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.to}
              onClick={() => scrollTo(link.to)}
              data-cursor="pointer"
              className="relative text-sm font-medium text-current/80 hover:text-dark-primary dark:hover:text-dark-secondary transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-dark-primary to-dark-secondary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Desktop theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <MagneticButton
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </MagneticButton>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <MagneticButton
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </MagneticButton>

          <button
            type="button"
            className="relative z-50 w-10 h-10 rounded-full glass flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop - closes menu on outside tap, sits BELOW the menu but above page content */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            <motion.nav
              key="menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed top-20 left-4 right-4 z-50 rounded-2xl glass overflow-hidden pointer-events-auto"
            >
              <div className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    type="button"
                    key={link.to}
                    onClick={() => scrollTo(link.to)}
                    className="text-left px-3 py-3 rounded-xl text-sm font-medium hover:bg-white/10 active:bg-white/20 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}