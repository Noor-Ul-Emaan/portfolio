import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { PROFILE, NAV_LINKS } from '../constants/data.js'

const socials = [
  { icon: FaGithub, href: PROFILE.social.github, label: 'GitHub' },
  { icon: FaLinkedin, href: PROFILE.social.linkedin, label: 'LinkedIn' },
  { icon: FaInstagram, href: PROFILE.social.instagram, label: 'Instagram' },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="section !pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <button onClick={() => scrollTo('hero')} className="font-display font-bold text-2xl gradient-text">
            {PROFILE.name.split(' ')[0]}.
          </button>

          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.to}
                onClick={() => scrollTo(link.to)}
                className="text-sm text-current/60 hover:text-dark-secondary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:text-dark-secondary transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-current/40 mt-10">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
