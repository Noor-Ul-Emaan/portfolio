import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isTouch, setIsTouch] = useState(true) // default hidden until confirmed as a mouse device

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    setIsTouch(isTouchDevice)
    if (isTouchDevice) return

    let ringX = 0, ringY = 0
    let mouseX = 0, mouseY = 0

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
      const target = e.target
      setIsPointer(!!target.closest('a, button, [data-cursor="pointer"]'))
    }

    let raf
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: isPointer ? '56px' : '36px',
          height: isPointer ? '56px' : '36px',
          borderColor: isPointer ? '#F43F5E' : 'rgba(124,58,237,0.6)',
        }}
      />
    </>
  )
}
