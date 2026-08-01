import { motion } from 'framer-motion'

export default function Timeline({ items, primaryKey, secondaryKey }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-accent sm:-translate-x-1/2" />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={`${item[primaryKey]}-${i}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className={`relative pl-12 sm:pl-0 sm:w-1/2 ${
              i % 2 === 0 ? 'sm:pr-10 sm:text-right sm:ml-0' : 'sm:pl-10 sm:ml-auto'
            }`}
          >
            <span className="absolute left-2.5 sm:left-auto sm:right-0 top-1.5 w-3 h-3 rounded-full bg-dark-secondary ring-4 ring-dark-secondary/20 sm:translate-x-1/2"
              style={i % 2 !== 0 ? { right: 'auto', left: '-1.5rem' } : {}}
            />
            <div className="glass rounded-2xl p-5 inline-block w-full">
              <p className="font-mono text-xs text-dark-secondary mb-1">{item[secondaryKey]}</p>
              <h3 className="font-display font-semibold text-base">{item.role || item.degree}</h3>
              <p className="text-sm text-current/60 mb-2">{item.company || item.school}</p>
              <p className="text-sm text-current/50 leading-relaxed">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
