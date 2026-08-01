import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 300)
          setTimeout(() => onFinish?.(), 900)
          return 100
        }
        return next
      })
    }, 180)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-white dark:bg-dark-bg"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold gradient-text mb-8"
          >
            AR.
          </motion.div>
          <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full loader-bar" style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.2s ease' }} />
          </div>
          <p className="mt-4 text-xs tracking-[0.3em] text-white/40 font-mono">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
