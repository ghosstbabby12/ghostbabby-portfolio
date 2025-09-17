'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const techStack = [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Vercel',
    'React',
    'Node.js'
  ]

  const handleScrollToProjects = () => {
    const element = document.querySelector('#proyectos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-ghost-purple/10 via-transparent to-ghost-pink/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient">Desarrollador</span>
            <br />
            <span className="text-gradient">Full Stack</span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creando experiencias digitales excepcionales con código limpio y diseño innovador
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                className="glass-effect rounded-full px-6 py-3 cursor-pointer group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  backgroundColor: 'rgba(102, 126, 234, 0.2)',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white/90 group-hover:text-white transition-colors duration-300">
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <motion.button
              onClick={handleScrollToProjects}
              className="ghost-btn text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Proyectos
            </motion.button>
            
            <motion.a
              href="#contacto"
              className="ghost-btn text-lg bg-ghost-purple border-ghost-purple text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector('#contacto')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Contactar
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Elemento interactivo con el mouse */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
          animate={{
            x: (mousePosition.x - window.innerWidth / 2) * 0.1,
            y: (mousePosition.y - window.innerHeight / 2) * 0.1,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          <div className="w-48 h-48 bg-gradient-to-r from-ghost-purple/20 to-ghost-pink/20 rounded-full blur-xl opacity-50"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero