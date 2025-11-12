'use client'

import { useState } from 'react'
import { Lock, Sparkles } from 'lucide-react'

export default function Galeria() {
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

  const colors = [
    'border-purple-500',
    'border-pink-500',
    'border-blue-500',
    'border-indigo-500',
    'border-yellow-500',
    'border-red-500',
    'border-green-500',
    'border-cyan-500'
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
            Para desbloquear mi galería debes ejecutar unos comandos sencillos para correr el proyecto en local
          </p>
        </div>

        {/* Unlock Section */}
        {!galleryUnlocked ? (
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 bg-opacity-20 backdrop-blur-sm border-2 border-purple-500 shadow-2xl max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              <Lock className="w-16 h-16 text-white animate-bounce" />
              <h3 className="text-2xl md:text-3xl font-semibold">Galería Bloqueada</h3>

              {/* Progress indicator */}
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-cyan-400 font-bold">Pregunta {currentQuestion + 1} de {unlockQuestions.length}</span>
              </div>

              <p className="text-lg md:text-xl max-w-2xl font-mono text-green-400">
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
                  className="w-full px-6 py-4 rounded-xl bg-black/50 backdrop-blur-md border-2 border-green-500/50 text-green-400 placeholder-green-400/40 focus:outline-none focus:ring-4 focus:ring-green-500/50 text-lg transition-all font-mono"
                  placeholder={unlockQuestions[currentQuestion].placeholder}
                />
                <button
                  onClick={() => handleAnswer(input)}
                  className="w-full py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl hover:shadow-green-500/30"
                >
                  {currentQuestion < unlockQuestions.length - 1 ? '▶ Siguiente' : '🔓 Desbloquear Galería'}
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / unlockQuestions.length) * 100}%` }}
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
                  className={`group relative h-32 rounded-lg overflow-hidden shadow-lg border ${colors[imgIdx % colors.length]} hover:scale-110 hover:z-10 transition-all duration-300 cursor-pointer`}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${imgIdx * 0.05}s both`
                  }}
                >
                  <img
                    src={img}
                    alt={`Galería ${imgIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
