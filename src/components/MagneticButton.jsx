import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, onClick, className = '', as = 'button', href, ...rest }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const Tag = as === 'a' ? motion.a : motion.button

  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="pointer"
      whileTap={{ scale: 0.95 }}
      className={`transition-transform duration-200 ease-out ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
