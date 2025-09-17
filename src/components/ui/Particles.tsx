'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Crear partículas
    const particleCount = 50
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full bg-white/10 pointer-events-none'
      
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      // Animación CSS personalizada
      particle.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite`
      particle.style.animationDelay = `${Math.random() * 6}s`
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Gradiente de fondo adicional */}
      <div className="absolute inset-0 bg-gradient-to-br from-ghost-purple/5 via-transparent to-ghost-pink/5" />
      
      {/* Elementos decorativos estáticos */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-ghost-purple/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-ghost-pink/10 rounded-full blur-xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/3 w-20 h-20 bg-ghost-blue/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default Particles