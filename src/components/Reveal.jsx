import { motion } from 'framer-motion'

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

/**
 * Reveal — wraps children with a scroll-triggered entrance animation.
 * direction: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  as: Tag = 'div',
  once = true,
}) {
  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants[direction] || variants.up}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
