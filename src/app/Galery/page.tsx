'use client'

import { useState } from 'react'
import { Lock, Unlock, Sparkles, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme, useI18n } from '../providers'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface SectionData {
  key: string
  color: string
  gradient: string
  answer: string
  images: string[]
}

export default function Galeria() {
  const { theme } = useTheme()
  const { t } = useI18n()
  const router = useRouter()

  const sections: SectionData[] = [
    {
      key: 'videoGames',
      color: 'border-purple-500',
      gradient: 'from-purple-600 to-pink-600',
      answer: 'npm run dev',
      images: ['/galeria/games1.jpg', '/galeria/games.jpg', '/galeria/games5.jpg']
    },
    {
      key: 'food',
      color: 'border-pink-500',
      gradient: 'from-pink-600 to-rose-600',
      answer: 'npm install',
      images: ['/galeria/food1.jpg', '/galeria/food2.jpg', '/galeria/food3.jpg']
    },
    {
      key: 'friends',
      color: 'border-blue-500',
      gradient: 'from-blue-600 to-cyan-600',
      answer: 'post',
      images: ['/galeria/hommies1.jpg', '/galeria/hommies.jpg', '/galeria/hommies4.jpg']
    },
    {
      key: 'trips',
      color: 'border-indigo-500',
      gradient: 'from-indigo-600 to-purple-600',
      answer: 'pragma',
      images: ['/galeria/trip2.jpeg', '/galeria/trip4.jpg', '/galeria/food4.jpg']
    },
    {
      key: 'hobbies',
      color: 'border-yellow-500',
      gradient: 'from-yellow-600 to-orange-600',
      answer: 'page.tsx',
      images: ['/galeria/hobby1.jpg', '/galeria/hobby.jpg', '/galeria/food5.jpg']
    }
  ]

  const [unlocked, setUnlocked] = useState<{ [key: string]: boolean }>({})
  const [inputs, setInputs] = useState<{ [key: string]: string }>({})

  const handleAnswer = (key: string, userAnswer: string, correct: string) => {
    const normalized = userAnswer.toLowerCase().trim().replace(/\s+/g, ' ')
    const correctNormalized = correct.toLowerCase().trim().replace(/\s+/g, ' ')

    if (normalized === correctNormalized) {
      setUnlocked((prev) => ({ ...prev, [key]: true }))
      setInputs((prev) => ({ ...prev, [key]: '' }))
    } else {
      alert(t('interactiveGallery.wrongAnswer'))
    }
  }

  return (
    <section
      id="galeria"
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-900'
          : 'bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-900 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}>
              {t('interactiveGallery.title')}
            </h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
          </div>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 ${
            theme === 'light' ? 'text-gray-700' : 'text-gray-300'
          }`}>
            {t('interactiveGallery.subtitle')}
          </p>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={() => router.push('/')}
            className={`flex items-center gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg transition-all ${
              theme === 'light'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t('interactiveGallery.backToHome')}</span>
          </motion.button>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8 md:space-y-12">
          {sections.map((section, idx) => {
            const isUnlocked = unlocked[`section-${idx}`]
            const categoryKey = `interactiveGallery.categories.${section.key}`

            return (
              <motion.div
                key={idx}
                className="w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Section Header */}
                <div className={`flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 border-b-2 ${section.color}`}>
                  <span className="text-2xl sm:text-3xl md:text-4xl">{t(`${categoryKey}.emoji`)}</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{t(`${categoryKey}.title`)}</h2>
                  {isUnlocked ? (
                    <Unlock className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 ml-auto" />
                  ) : (
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 ml-auto" />
                  )}
                </div>

                {/* Lock Screen or Gallery */}
                {!isUnlocked ? (
                  <motion.div
                    className={`relative p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br ${section.gradient} bg-opacity-20 backdrop-blur-sm border-2 ${section.color} shadow-2xl ${
                      theme === 'light' ? 'bg-white/40' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`absolute inset-0 rounded-2xl md:rounded-3xl ${
                      theme === 'light' ? 'bg-white/30' : 'bg-black/60'
                    }`}></div>
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Lock className={`w-12 h-12 sm:w-16 sm:h-16 ${
                          theme === 'light' ? 'text-purple-600' : 'text-white'
                        }`} />
                      </motion.div>
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-semibold ${
                        theme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {t('interactiveGallery.locked')}
                      </h3>
                      <p className={`text-base sm:text-lg md:text-xl max-w-2xl ${
                        theme === 'light' ? 'text-gray-800' : 'text-white'
                      }`}>
                        {t(`${categoryKey}.question`)}
                      </p>

                      <div className="w-full max-w-md space-y-3 sm:space-y-4">
                        <input
                          type="text"
                          value={inputs[`section-${idx}`] || ''}
                          onChange={(e) => setInputs((prev) => ({ ...prev, [`section-${idx}`]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAnswer(`section-${idx}`, inputs[`section-${idx}`] || '', section.answer)
                            }
                          }}
                          className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 text-base sm:text-lg transition-all focus:outline-none focus:ring-4 ${
                            theme === 'light'
                              ? 'bg-white/80 border-purple-300 text-gray-900 placeholder-gray-500 focus:ring-purple-300'
                              : 'bg-white/10 backdrop-blur-md border-white/30 text-white placeholder-white/60 focus:ring-white/50'
                          }`}
                          placeholder={t('interactiveGallery.placeholder')}
                        />
                        <motion.button
                          onClick={() => handleAnswer(`section-${idx}`, inputs[`section-${idx}`] || '', section.answer)}
                          className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-r ${section.gradient} text-white shadow-lg hover:shadow-2xl transition-all`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {t('interactiveGallery.unlock')}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {section.images.map((img, imgIdx) => (
                      <motion.div
                        key={imgIdx}
                        className={`group relative h-56 sm:h-64 md:h-72 rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 ${section.color} cursor-pointer ${
                          theme === 'light' ? 'bg-white' : ''
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: imgIdx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={img}
                          alt={`${t(`${categoryKey}.title`)} ${imgIdx + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${section.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
