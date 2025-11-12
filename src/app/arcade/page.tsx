'use client'

import { useState } from 'react'
import PacmanGame from '@/components/PacmanGame'
import BooGame from '@/components/BooGame'

export default function ArcadePage() {
  const [selectedGame, setSelectedGame] = useState<'menu' | 'pacman' | 'boo'>('menu')
  const [credits, setCredits] = useState(0)

  const highScores = [
    { rank: "1ST", name: "S", score: "201510" },
    { rank: "2ND", name: "AYS", score: "196320" },
    { rank: "3RD", name: "AAA3", score: "162460" },
    { rank: "4TH", name: "LA", score: "155160" },
    { rank: "5TH", name: "EMBAKNW", score: "123400" },
    { rank: "6TH", name: "MA", score: "97090" },
    { rank: "7TH", name: "Z", score: "84530" },
    { rank: "8TH", name: "AAA", score: "72150" },
    { rank: "9TH", name: "ALI", score: "65280" },
    { rank: "10TH", name: "JAA", score: "58910" },
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: '#000000'
      }}
    >
      {/* Back to Projects Button */}
      <a
        href="/#projects"
        className="fixed top-4 left-4 z-50 px-6 py-3 font-bold rounded-lg border-2 shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{
          fontFamily: 'monospace',
          backgroundColor: '#7c3aed',
          color: '#ffffff',
          borderColor: '#a855f7'
        }}
      >
        ← VOLVER A PROYECTOS
      </a>

      {/* Arcade Machine Container */}
      <div className="relative w-full max-w-4xl">
        {/* Top Marquee */}
        <div
          className="relative mb-6 rounded-t-3xl border-8 shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(to right, #2563eb, #3b82f6, #2563eb)',
            borderColor: '#f97316'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="relative py-6 px-8">
            <div className="text-center">
              <p className="text-sm text-yellow-300 font-bold tracking-widest mb-1">WORLD'S LARGEST</p>
              <h1 className="text-6xl font-black text-yellow-300 tracking-tight" style={{
                textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.5), 4px 4px 0px rgba(0,0,0,0.3)'
              }}>
                DEMOS
              </h1>
            </div>
          </div>
        </div>

        {/* Main Screen */}
        <div
          className="relative rounded-xl border-8 shadow-2xl overflow-hidden"
          style={{
            aspectRatio: '4/3',
            minHeight: '600px',
            background: 'linear-gradient(to bottom, #1f2937, #000000, #1f2937)',
            borderColor: '#374151'
          }}
        >

          {/* CRT Screen Effect */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse"></div>
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, transparent 2px, transparent 4px)',
            }}></div>
          </div>

          {selectedGame === 'menu' && (
            <div
              className="relative h-full flex flex-col p-4"
              style={{
                background: 'linear-gradient(to bottom, #581c87, #6b21a8, #7c3aed)'
              }}
            >
              {/* Top HUD - Score, Level, Credits */}
              <div className="flex justify-between items-start mb-6 px-4">
                <div className="text-left">
                  <p className="text-sm font-bold text-yellow-300 tracking-wider" style={{ fontFamily: 'monospace' }}>PUNTAJE</p>
                  <p className="text-3xl font-black text-yellow-300" style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(255,215,0,0.8)' }}>
                    000000
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-pink-300 tracking-wider" style={{ fontFamily: 'monospace' }}>NIVEL</p>
                  <p className="text-3xl font-black text-pink-300" style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(255,105,180,0.8)' }}>
                    01
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-cyan-300 tracking-wider" style={{ fontFamily: 'monospace' }}>CRÉDITOS</p>
                  <p className="text-3xl font-black text-cyan-300" style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(0,255,255,0.8)' }}>
                    {credits.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-6">
                <h2 className="text-5xl font-black text-yellow-300 tracking-wide"
                    style={{
                      fontFamily: 'monospace',
                      textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.5)',
                      letterSpacing: '0.2em'
                    }}>
                  SELECCIONA UN JUEGO
                </h2>
              </div>

              {/* Game Selection Cards */}
              <div className="flex-1 flex items-center justify-center gap-6 px-4">
                {/* Boo Mario Bros Card */}
                <div
                  className="relative w-full max-w-sm rounded-2xl overflow-hidden border-8 border-blue-500 shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  <div className="bg-black/80 p-4">
                    {/* Lives indicator */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-2">
                        <span className="text-xl">❤️</span>
                        <span className="text-xl">❤️</span>
                        <span className="text-xl">❤️</span>
                      </div>
                      <p className="text-gray-400 font-mono text-xs">PRESS TO START</p>
                    </div>

                    {/* Game preview image area */}
                    <div
                      className="h-64 flex items-center justify-center bg-black rounded-lg mb-4"
                      style={{
                        backgroundImage: 'url(/images/games/boo.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 rounded-lg"></div>
                    </div>

                    {/* Game title */}
                    <h3 className="text-2xl font-black text-purple-300 text-center mb-2" style={{ fontFamily: 'monospace' }}>
                      BOO MARIO BROS
                    </h3>
                    <p className="text-xs text-gray-400 text-center mb-4 px-2" style={{ fontFamily: 'monospace' }}>
                      Un spin-off retrofuturista inspirado en los enemigos de Mario, donde el jugador controla a Boo en un mundo oscuro y brillante.
                    </p>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedGame('boo')}
                        className="w-full py-2 bg-transparent border-2 border-pink-500 text-pink-400 font-black text-lg rounded-lg hover:bg-pink-500 hover:text-white transition-all"
                        style={{ fontFamily: 'monospace' }}
                      >
                        START
                      </button>
                      <div className="flex gap-2">
                        <a
                          href="https://github.com/ghosstbabby12/ghostbabby-portfolio/blob/main/src/components/BooGame.tsx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-all text-center font-mono"
                        >
                          <span className="mr-1">{'</>'}</span> Código
                        </a>
                        <a
                          href="/boo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all text-center font-mono"
                        >
                          <span className="mr-1">↗</span> Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pac-Man Card */}
                <div
                  className="relative w-full max-w-sm rounded-2xl overflow-hidden border-8 border-pink-500 shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                >
                  <div className="bg-black/80 p-4">
                    {/* Lives indicator */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-2">
                        <span className="text-xl">❤️</span>
                        <span className="text-xl">❤️</span>
                        <span className="text-xl">❤️</span>
                      </div>
                      <p className="text-gray-400 font-mono text-xs">PRESS TO START</p>
                    </div>

                    {/* Game preview with ghosts */}
                    <div
                      className="h-64 flex items-center justify-center bg-black rounded-lg mb-4"
                      style={{
                        backgroundImage: 'url(/images/games/pacman.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 rounded-lg"></div>
                    </div>

                    {/* Game title */}
                    <h3 className="text-2xl font-black text-yellow-300 text-center mb-2" style={{ fontFamily: 'monospace' }}>
                      PAC-MAN
                    </h3>
                    <p className="text-xs text-gray-400 text-center mb-4 px-2" style={{ fontFamily: 'monospace' }}>
                      Una reinterpretación de la acción clásica arcade, donde cada pixel devorado cuenta para algo más.
                    </p>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedGame('pacman')}
                        className="w-full py-2 bg-transparent border-2 border-pink-500 text-pink-400 font-black text-lg rounded-lg hover:bg-pink-500 hover:text-white transition-all"
                        style={{ fontFamily: 'monospace' }}
                      >
                        START
                      </button>
                      <div className="flex gap-2">
                        <a
                          href="https://github.com/ghosstbabby12/ghostbabby-portfolio/blob/main/src/components/PacmanGame.tsx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-all text-center font-mono"
                        >
                          <span className="mr-1">{'</>'}</span> Código
                        </a>
                        <a
                          href="/pacman"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-all text-center font-mono"
                        >
                          <span className="mr-1">↗</span> Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="text-center pb-4">
                <p className="text-yellow-300 text-lg animate-pulse" style={{ fontFamily: 'monospace' }}>
                  SELECCIONA UN JUEGO PARA COMENZAR
                </p>
              </div>
            </div>
          )}

          {selectedGame === 'pacman' && (
            <div className="w-full h-full relative">
              <button
                onClick={() => setSelectedGame('menu')}
                className="absolute top-4 left-4 z-50 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded border-2 border-red-800 shadow-lg"
                style={{ fontFamily: 'monospace' }}
              >
                ◄ MENU
              </button>
              <PacmanGame />
            </div>
          )}

          {selectedGame === 'boo' && (
            <div className="w-full h-full relative">
              <button
                onClick={() => setSelectedGame('menu')}
                className="absolute top-4 left-4 z-50 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded border-2 border-red-800 shadow-lg"
                style={{ fontFamily: 'monospace' }}
              >
                ◄ MENU
              </button>
              <BooGame />
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div
          className="mt-6 rounded-b-3xl border-8 shadow-2xl p-6"
          style={{
            background: 'linear-gradient(to bottom, #581c87, #4c1d95)',
            borderColor: '#6b21a8'
          }}
        >
          <div className="flex justify-center gap-8">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
