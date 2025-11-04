"use client"

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Music, Gamepad2, Coffee, Dumbbell, Palette, Sparkles, Heart } from 'lucide-react'
import { useI18n, useTheme } from '../../app/providers'

const About = () => {
  const { t } = useI18n()
  const { theme } = useTheme()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const interests = [
    { icon: Music, label: t('about.interests.music'), gradient: "from-purple-500 to-pink-500" },
    { icon: Palette, label: t('about.interests.art'), gradient: "from-pink-500 to-red-500" },
    { icon: Coffee, label: t('about.interests.cooking'), gradient: "from-amber-500 to-orange-500" },
    { icon: Gamepad2, label: t('about.interests.gaming'), gradient: "from-blue-500 to-purple-500" },
    { icon: Dumbbell, label: t('about.interests.sports'), gradient: "from-green-500 to-emerald-500" },
    { icon: Code2, label: t('about.interests.coding'), gradient: "from-cyan-500 to-blue-500" },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
      ref={ref}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ghost-purple/5 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Título de la sección */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            variants={itemVariants}
          >
            <span className="text-gradient">{t('about.title')}</span>
          </motion.h2>

          {/* Introducción personal */}
          <motion.div
            variants={itemVariants}
            className="glass-effect rounded-3xl p-8 md:p-12 mb-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar o decoración */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
                  style={{
                    background: theme === 'light'
                      ? 'linear-gradient(to bottom right, #d5748e, #eaa4ba)'
                      : 'linear-gradient(to bottom right, #667eea, #764ba2)'
                  }}
                >
                  <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: theme === 'light' ? '#eaa4ba' : '#764ba2'
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-white" fill="currentColor" />
                </motion.div>
              </motion.div>

              {/* Texto sobre ti */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {t('about.greeting')} <span className="text-gradient">{t('about.name')}</span>
                </h3>
                <p className="text-lg text-white/80 leading-relaxed mb-4">
                  {t('about.bio')}
                </p>
                <p className="text-white/70">
                  {t('about.inspiration')} <span className="text-ghost-purple font-semibold">{t('about.tetrisGames')}</span> {t('about.inspirationEnd')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mis intereses */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="text-gradient">{t('about.interestsTitle')}</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="glass-effect rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${interest.gradient} flex items-center justify-center group-hover:shadow-lg group-hover:shadow-${interest.gradient.split(' ')[1]}/50 transition-all duration-300`}>
                    <interest.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors text-center">
                    {interest.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Estadísticas */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              <span className="text-gradient">{t('about.statsTitle')}</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "21", label: t('about.stats.age') },
                { number: "2+", label: t('about.stats.exp') },
                { number: "15+", label: t('about.stats.projects') },
                { number: "10+", label: t('about.stats.tech') },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-2xl p-6 text-center group cursor-pointer card-hover"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Misión y valores */}
          <motion.div variants={itemVariants} className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                title: t('about.cards.mission.title'),
                description: t('about.cards.mission.description'),
                emoji: "🎯"
              },
              {
                title: t('about.cards.approach.title'),
                description: t('about.cards.approach.description'),
                emoji: "💡"
              },
              {
                title: t('about.cards.passion.title'),
                description: t('about.cards.passion.description'),
                emoji: "🚀"
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-2xl p-6 card-hover"
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h4 className="text-xl font-bold text-gradient mb-3">
                  {card.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About