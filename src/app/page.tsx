'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/ui/Header'
import Hero from '@/components/ui/Hero'
import About from '@/components/ui/About'
import Projects from '@/components/ui/Projects'

import Particles from '@/components/ui/Particles'

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
          
          
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-ghost-purple/20 backdrop-blur-xl border border-ghost-purple/30 
                   rounded-full p-3 text-ghost-purple hover:bg-ghost-purple hover:text-white 
                   transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </main>
  )
}