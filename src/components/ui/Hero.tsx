'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useI18n } from '../../app/providers'

const Hero = () => {
  const { t } = useI18n()
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
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
    >
      {/* Fondo animado suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-ghost-purple/10 via-transparent to-ghost-pink/10 rounded-full blur-3xl"></div>

      {/* Contenido principal - Grid de 2 columnas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* COLUMNA IZQUIERDA - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Título de bienvenida */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">{t('hero.welcome')}</span>
              <br />
              <span className="text-gradient">{t('hero.title')}</span>
            </motion.h1>

            {/* Introducción breve */}
            <motion.p
              className="text-lg text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.intro.part1')}
              <span className="text-ghost-purple font-semibold">{t('hero.intro.unlock')}</span>
              {t('hero.intro.part2')}
              <span className="text-ghost-pink font-semibold">{t('hero.intro.hidden')}</span>
              {t('hero.intro.part3')}
            </motion.p>

            {/* Stack de tecnologías */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-xl font-semibold text-white/90">
                {t('hero.builtWith')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="glass-effect rounded-full px-5 py-2 cursor-pointer group"
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
                    <span className="text-sm text-white/90 group-hover:text-white transition-colors duration-300">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Botones principales */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
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
                {t('actions.viewProjects')}
              </motion.button>

              <motion.a
                href="#contact"
                className="ghost-btn text-lg border-ghost-purple text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector('#contact')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {t('actions.contactMe')}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* COLUMNA DERECHA - Strudel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full"
          >
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                  🎶 {t('hero.strudel.title')}
                </h2>
                <p className="text-white/70 text-sm md:text-base">
                  {t('hero.strudel.description')}
                </p>
              </div>

              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-purple-500/40 hover:border-purple-400/60 transition-colors duration-300">
                <iframe
                  src="https://strudel.tidalcycles.org"
                  title="Strudel REPL"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elemento interactivo del mouse */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
          animate={{
            x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) * 0.1,
            y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2) * 0.1,
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