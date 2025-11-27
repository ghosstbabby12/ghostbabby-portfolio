'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/ui/Header'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'
import Projects from '@/components/ui/Projects'
import Particles from '@/components/ui/Particles'
import Contact from '@/components/ui/Contact'
import Experience from '@/components/ui/Experience'
import MyGame from '@/components/ui/MyGame'
import Gallery from '@/components/ui/Gallery'
import Testimonials from '@/components/ui/Testimonials'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-ghost-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-ghost-purple"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-ghost-gradient relative overflow-x-hidden">
      {/* Fondo animado */}
      <Particles />
      <Header />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Projects />
          <Experience />
          <MyGame />
          <Gallery />
          <Testimonials />
          <Contact />
        </motion.div>
      </div>

      {/* Botón Scroll To Top */}
      <ScrollToTopButton />
    </main>
  )
}
