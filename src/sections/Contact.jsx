import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import { PROFILE } from '../constants/data.js'

// Replace with your own EmailJS credentials: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputClass =
    'w-full bg-white/5 dark:bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-dark-secondary focus:ring-2 focus:ring-dark-secondary/20 transition-all placeholder:text-current/30'

  return (
    <section id="contact" className="section">
      <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
        <p className="font-mono text-sm text-dark-secondary tracking-widest mb-3">CONTACT</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold">
          Let's build something <span className="gradient-text">great</span>
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
        <Reveal direction="left" className="md:col-span-2 space-y-5">
          <div className="glass rounded-2xl p-5 flex items-start gap-4">
            <Mail className="text-dark-secondary mt-0.5" size={20} />
            <div>
              <p className="text-xs text-current/50">Email</p>
              <p className="font-medium">{PROFILE.email}</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-start gap-4">
            <MapPin className="text-dark-secondary mt-0.5" size={20} />
            <div>
              <p className="text-xs text-current/50">Location</p>
              <p className="font-medium">{PROFILE.location}</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-start gap-4">
            <Phone className="text-dark-secondary mt-0.5" size={20} />
            <div>
              <p className="text-xs text-current/50">Availability</p>
              <p className="font-medium">Open for freelance & full-time</p>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" className="md:col-span-3">
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className={inputClass}
              />
            </div>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className={inputClass}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Your Message"
              className={`${inputClass} resize-none`}
            />

            <MagneticButton
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-dark-primary to-dark-secondary text-white font-medium shadow-lg shadow-dark-primary/30 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : <>Send Message <Send size={16} /></>}
            </MagneticButton>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-emerald-400 mt-2"
                >
                  <CheckCircle2 size={16} /> Message sent successfully — I'll reply soon!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-dark-accent mt-2"
                >
                  Something went wrong — please try again, or email me directly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
