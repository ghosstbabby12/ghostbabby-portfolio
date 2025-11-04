'use client'

import { useState } from 'react'
import { Lock, Unlock, Sparkles } from 'lucide-react'

interface SectionData {
  title: string
  emoji: string
  color: string
  gradient: string
  question: string
  answer: string
  images: string[]
}

export default function Galeria() {
  const sections: SectionData[] = [
    {
      title: 'Video Games',
      emoji: '🎮',
      color: 'border-purple-500',
      gradient: 'from-purple-600 to-pink-600',
      question: '¿Escribe el comando para ejecutar un proyecto en Next.js',
      answer: 'npm run dev',
      images: ['/galeria/games1.jpg', '/galeria/games2.jpg', '/galeria/games3.jpg']
    },
    {
      title: 'Food',
      emoji: '🍔',
      color: 'border-pink-500',
      gradient: 'from-pink-600 to-rose-600',
      question: '¿Qué hook de React se usa para manejar estado?',
      answer: 'useState',
      images: ['/galeria/food1.jpg', '/galeria/food2.jpg', '/galeria/food3.jpg']
    },
    {
      title: 'Hommies',
      emoji: '👯',
      color: 'border-blue-500',
      gradient: 'from-blue-600 to-cyan-600',
      question: '¿Qué método HTTP se usa para enviar datos al servidor?',
      answer: 'post',
      images: ['/galeria/hommies1.jpg', '/galeria/hommies2.jpg', '/galeria/hommies3.jpg']
    },
    {
      title: 'Trips',
      emoji: '✈️',
      color: 'border-indigo-500',
      gradient: 'from-indigo-600 to-purple-600',
      question: '¿ cual Ultima empresa que visitamos en el viaje empresarial?',
      answer: 'pragma',
      images: ['/galeria/trip1.jpg', '/galeria/trip2.jpg', '/galeria/trip3.jpg']
    },
    {
      title: 'Hobbies',
      emoji: '🎨',
      color: 'border-yellow-500',
      gradient: 'from-yellow-600 to-orange-600',
      question: '¿Qué archivo configura las rutas en Next.js App Router?',
      answer: 'page.tsx',
      images: ['/galeria/hobby1.jpg', '/galeria/hobby2.jpg', '/galeria/hobby3.jpg']
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
      alert('❌ Respuesta incorrecta. ¡Inténtalo de nuevo!')
    }
  }

  return (
    <section id="galeria" className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-900 text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Galería Interactiva
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explora mi lado más personal 💫 — cada categoría revela momentos de mi vida si respondes correctamente las preguntas de desarrollo web.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, idx) => {
            const isUnlocked = unlocked[`section-${idx}`]
            
            return (
              <div key={idx} className="w-full">
                {/* Section Header */}
                <div className={`flex items-center gap-3 mb-6 pb-3 border-b-2 ${section.color}`}>
                  <span className="text-4xl">{section.emoji}</span>
                  <h2 className="text-3xl md:text-4xl font-bold">{section.title}</h2>
                  {isUnlocked ? (
                    <Unlock className="w-6 h-6 text-green-400 ml-auto" />
                  ) : (
                    <Lock className="w-6 h-6 text-red-400 ml-auto" />
                  )}
                </div>

                {/* Lock Screen or Gallery */}
                {!isUnlocked ? (
                  <div className={`relative p-8 md:p-12 rounded-3xl bg-gradient-to-br ${section.gradient} bg-opacity-20 backdrop-blur-sm border-2 ${section.color} shadow-2xl`}>
                    <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                      <Lock className="w-16 h-16 text-white animate-bounce" />
                      <h3 className="text-2xl md:text-3xl font-semibold">Sección Bloqueada</h3>
                      <p className="text-lg md:text-xl max-w-2xl">{section.question}</p>
                      
                      <div className="w-full max-w-md space-y-4">
                        <input
                          type="text"
                          value={inputs[`section-${idx}`] || ''}
                          onChange={(e) => setInputs((prev) => ({ ...prev, [`section-${idx}`]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAnswer(`section-${idx}`, inputs[`section-${idx}`] || '', section.answer)
                            }
                          }}
                          className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg transition-all"
                          placeholder="Escribe tu respuesta..."
                        />
                        <button
                          onClick={() => handleAnswer(`section-${idx}`, inputs[`section-${idx}`] || '', section.answer)}
                          className="w-full py-4 px-8 rounded-xl font-bold text-lg bg-card-gradient text-white hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl hover:shadow-ghost-purple/30"
                        >
                          🔓 Desbloquear
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {section.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`group relative h-72 rounded-2xl overflow-hidden shadow-xl border-2 ${section.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
                        style={{
                          animation: `fadeIn 0.5s ease-out ${imgIdx * 0.2}s both`
                        }}
                      >
                        <img
                          src={img}
                          alt={`${section.title} ${imgIdx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${section.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
