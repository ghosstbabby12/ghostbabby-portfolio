'use client'

import { useState } from 'react'
import { Lock, Sparkles } from 'lucide-react'
import { useTheme } from '../../app/providers'

export default function Galeria() {
  const { actualTheme } = useTheme()
  // TODAS las imágenes del proyecto en un array desordenado
  const allImages = [
    // Imágenes de galería
    '/galeria/food1.jpg',
    '/images/me.jpg',
    '/galeria/games1.jpg',
    '/projects/Strudel.png',
    '/galeria/hommies1.jpg',
    '/images/me2.jpg',
    '/galeria/food2.jpg',
    '/projects/ReactApp.jpg',
    '/galeria/games.jpg',
    '/images/me3.png',
    '/galeria/hobby1.jpg',
    '/galeria/food3.jpg',
    '/projects/games.png',
    '/galeria/hommies.jpg',
    '/images/me4.jpeg',
    '/galeria/food4.jpg',
    '/projects/TaskManager.png',
    '/galeria/games5.jpg',
    '/images/me5.jpeg',
    '/galeria/trip2.jpeg',
    '/galeria/food5.jpg',
    '/projects/Dark-light.png',
    '/images/me6.jpeg',
    '/galeria/hobby.jpg',
    '/galeria/food6.jpg',
    '/projects/JuegoBricks.png',
    '/images/me7.jpeg',
    '/galeria/hommies4.jpg',
    '/galeria/food7.jpg',
    '/projects/LoginPersonal.png',
    '/images/me8.jpeg',
    '/galeria/trip4.jpg',
    '/galeria/food8.jpg',
    '/projects/GestorLab.png',
    '/images/me9.jpeg',
    '/galeria/food9.jpg',
    '/images/games/pacman.jpg',
    '/images/me10.jpeg',
    '/projects/DEMOS.png',
    '/images/me11.jpeg',
    '/images/games/boo.jpg',
    '/images/me12.jpeg',
    '/projects/recetas.png',
    '/images/me13.jpeg',
    '/images/me14.jpeg',
    '/images/me15.jpeg',
  ]

  const unlockQuestions = [
    {
      question: 'Instala dependencias:',
      answer: 'npm install',
      placeholder: 'npm install'
    },
    {
      question: 'Ejecuta el proyecto:',
      answer: 'npm run dev',
      placeholder: 'npm run dev'
    }
  ]

  const [galleryUnlocked, setGalleryUnlocked] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [input, setInput] = useState('')

  const handleAnswer = (userAnswer: string) => {
    const normalized = userAnswer.toLowerCase().trim()
    const correctNormalized = unlockQuestions[currentQuestion].answer.toLowerCase().trim()

    if (normalized === correctNormalized) {
      if (currentQuestion < unlockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setInput('')
      } else {
        setGalleryUnlocked(true)
        setInput('')
      }
    } else {
      alert('❌ Respuesta incorrecta. ¡Inténtalo de nuevo!')
    }
  }

  return (
    <section
      id="galeria"
      className="min-h-screen py-24 px-4 transition-colors duration-300"
      style={{
        background: actualTheme === 'light'
          ? 'linear-gradient(to bottom right, #f5f3ff, #ede9fe, #ddd6fe)'
          : 'linear-gradient(to bottom right, #030712, #581c87, #312e81)',
        color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className={`w-8 h-8 animate-pulse ${actualTheme === 'light' ? 'text-purple-600' : 'text-yellow-400'}`} />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Galería Interactiva
            </h1>
            <Sparkles className={`w-8 h-8 animate-pulse ${actualTheme === 'light' ? 'text-purple-600' : 'text-yellow-400'}`} />
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto"
             style={{ color: actualTheme === 'light' ? '#4b5563' : '#d1d5db' }}>
            Para desbloquear mi galería debes ejecutar unos comandos sencillos para correr el proyecto en local
          </p>
        </div>

        {/* Unlock Section */}
        {!galleryUnlocked ? (
          <div
            className="relative p-8 md:p-12 rounded-3xl backdrop-blur-sm border-2 shadow-2xl max-w-2xl mx-auto"
            style={{
              background: actualTheme === 'light'
                ? 'linear-gradient(to bottom right, rgba(196, 181, 253, 0.3), rgba(167, 139, 250, 0.3))'
                : 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.2), rgba(219, 39, 119, 0.2))',
              borderColor: actualTheme === 'light' ? '#a78bfa' : '#a855f7'
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ backgroundColor: actualTheme === 'light' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}
            ></div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <Lock
                className="w-16 h-16 animate-bounce"
                style={{ color: actualTheme === 'light' ? '#7c3aed' : '#ffffff' }}
              />
              <h3
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: actualTheme === 'light' ? '#1f2937' : '#ffffff' }}
              >
                Galería Bloqueada
              </h3>

              {/* Progress indicator */}
              <div className="flex items-center gap-2 text-sm"
                   style={{ color: actualTheme === 'light' ? '#6b7280' : '#d1d5db' }}>
                <span
                  className="font-bold"
                  style={{ color: actualTheme === 'light' ? '#7c3aed' : '#22d3ee' }}
                >
                  Pregunta {currentQuestion + 1} de {unlockQuestions.length}
                </span>
              </div>

              <p
                className="text-lg md:text-xl max-w-2xl font-mono"
                style={{ color: actualTheme === 'light' ? '#059669' : '#34d399' }}
              >
                {unlockQuestions[currentQuestion].question}
              </p>

              <div className="w-full max-w-md space-y-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAnswer(input)
                    }
                  }}
                  className="w-full px-6 py-4 rounded-xl backdrop-blur-md border-2 focus:outline-none focus:ring-4 text-lg transition-all font-mono"
                  style={{
                    backgroundColor: actualTheme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                    borderColor: actualTheme === 'light' ? 'rgba(5, 150, 105, 0.5)' : 'rgba(34, 197, 94, 0.5)',
                    color: actualTheme === 'light' ? '#059669' : '#34d399',
                    caretColor: actualTheme === 'light' ? '#059669' : '#34d399'
                  }}
                  placeholder={unlockQuestions[currentQuestion].placeholder}
                />
                <button
                  onClick={() => handleAnswer(input)}
                  className="w-full py-4 px-8 rounded-xl font-bold text-lg text-white hover:scale-105 active:scale-95 transition-all shadow-lg"
                  style={{
                    background: actualTheme === 'light'
                      ? 'linear-gradient(to right, #059669, #10b981)'
                      : 'linear-gradient(to right, #16a34a, #10b981)',
                    boxShadow: actualTheme === 'light'
                      ? '0 10px 15px -3px rgba(5, 150, 105, 0.3)'
                      : '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  {currentQuestion < unlockQuestions.length - 1 ? '▶ Siguiente' : '🔓 Desbloquear Galería'}
                </button>
              </div>

              {/* Progress bar */}
              <div
                className="w-full max-w-md h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: actualTheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    background: actualTheme === 'light'
                      ? 'linear-gradient(to right, #059669, #10b981)'
                      : 'linear-gradient(to right, #22c55e, #10b981)',
                    width: `${((currentQuestion + 1) / unlockQuestions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          /* Gallery Grid - Todas las imágenes mezcladas */
          <div className="w-full">
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {allImages.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className={`group relative h-32 rounded-lg overflow-hidden shadow-lg border-2 hover:scale-110 hover:z-10 transition-all duration-300 cursor-pointer`}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${imgIdx * 0.05}s both`,
                    borderColor: actualTheme === 'light'
                      ? ['#a78bfa', '#c4b5fd', '#93c5fd', '#a5b4fc', '#fbbf24', '#ef4444', '#34d399', '#22d3ee'][imgIdx % 8]
                      : ['#a855f7', '#ec4899', '#3b82f6', '#6366f1', '#eab308', '#dc2626', '#22c55e', '#06b6d4'][imgIdx % 8]
                  }}
                >
                  <img
                    src={img}
                    alt={`Galería ${imgIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundImage: actualTheme === 'light'
                        ? 'linear-gradient(to top, rgba(167, 139, 250, 0.3), transparent)'
                        : 'linear-gradient(to top, rgba(124, 58, 237, 0.3), transparent)'
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}
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
