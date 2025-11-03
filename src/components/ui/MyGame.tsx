'use client';

import React, { useState } from "react";
import PacmanGame from "@/components/PacmanGame";
import BooGame from "@/components/BooGame";
import { useI18n, useTheme } from "@/app/providers";

const MyGame: React.FC = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [selectedGame, setSelectedGame] = useState<"none" | "pacman" | "boo">(
    "none"
  );

  // helper: use translation if exists, otherwise fallback string
  const tr = (key: string, fallback: string) => {
    const res = t(key)
    return res === key ? fallback : res
  }

  return (
    <section
      id="mygame"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden"
      style={{
        background: theme === 'light'
          ? 'linear-gradient(to bottom, #ffffff, #fdf2f8, #fce7f3)'
          : 'linear-gradient(to bottom, #581c87, #4338ca, #000000)'
      }}
    >
      {/* Fondo de puntos estilo arcade - adaptable a tema */}
      <div className="absolute inset-0 opacity-5 dark:opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Header estilo arcade - responsive */}
      <div className="relative z-10 w-full max-w-6xl mb-6 md:mb-8 px-2">
        <div className="flex justify-between items-center text-sm sm:text-xl md:text-2xl font-bold mb-4">
          <div className="text-yellow-400 dark:text-yellow-400">
            SCORE<br/>
            <span className="text-2xl sm:text-3xl md:text-4xl tracking-wider">999999</span>
          </div>
          <div className="text-pink-400 dark:text-pink-400">
            LEVEL<br/>
            <span className="text-2xl sm:text-3xl md:text-4xl tracking-wider">08</span>
          </div>
          <div className="text-cyan-400 dark:text-cyan-400">
            CREDITS<br/>
            <span className="text-2xl sm:text-3xl md:text-4xl tracking-wider">05</span>
          </div>
        </div>
      </div>

      {/* Título SELECT GAME - responsive */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center text-yellow-400 dark:text-yellow-400 tracking-widest relative z-10 px-4"
          style={{ fontFamily: 'monospace', textShadow: '0 0 20px rgba(234, 179, 8, 0.8)' }}>
        SELECT GAME
      </h2>

      {/* Contenedor de máquinas arcade estilo retro - responsive */}
      <div className="relative z-10 w-full max-w-7xl border-4 sm:border-6 md:border-8 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
           style={{
             borderColor: theme === 'light' ? '#f9a8d4' : '#1f2937',
             background: theme === 'light'
               ? 'linear-gradient(to bottom right, #fbcfe8, #e9d5ff, #fbcfe8)'
               : 'linear-gradient(to bottom right, #581c87, #3730a3, #581c87)',
             boxShadow: theme === 'light'
               ? 'inset 0 0 100px rgba(255,192,203,0.3), 0 0 50px rgba(219,112,147,0.3)'
               : 'inset 0 0 100px rgba(0,0,0,0.5), 0 0 50px rgba(138,43,226,0.3)'
           }}>

        {selectedGame === "none" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 animate-fadeIn">
            {/* Máquina Boo - responsive */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                 style={{
                   background: theme === 'light'
                     ? 'linear-gradient(to bottom right, #d8b4fe, #a5b4fc)'
                     : 'linear-gradient(to bottom right, #4338ca, #6b21a8)',
                   boxShadow: theme === 'light'
                     ? '0 20px 60px rgba(147,51,234,0.4), inset 0 0 30px rgba(255,255,255,0.5)'
                     : '0 20px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.1)'
                 }}>
              {/* Pantalla CRT */}
              <div className="relative bg-black m-3 sm:m-4 md:m-6 rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-3 md:border-4 border-gray-900"
                   style={{ aspectRatio: '4/3', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
                {/* Cabecera de la pantalla - responsive */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex items-center gap-1 sm:gap-2 z-10">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <span className="ml-1 sm:ml-2 text-gray-400 text-xs sm:text-sm tracking-wider hidden sm:inline">PRESS TO START</span>
                </div>

                {/* Contenido del juego - responsive */}
                <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                  <div className="mb-4 sm:mb-6 relative" style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.8))' }}>
                    <div className="text-5xl sm:text-6xl md:text-8xl">👻</div>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-2 sm:mb-3 md:mb-4 tracking-wider"
                      style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(167,139,250,0.8)' }}>
                    BOO MARIO BROS
                  </h3>
                  <p className="text-gray-300 text-center text-xs sm:text-sm mb-4 sm:mb-6 px-2 sm:px-4">
                    Un spin-off retrofuturista inspirado en los enemigos de Mario, donde el jugador controla a Boo en un mundo oscuro y brillante.
                  </p>

                  {/* Botones - responsive */}
                  <button
                    onClick={() => setSelectedGame("boo")}
                    className="mb-3 sm:mb-4 px-6 sm:px-8 py-2 sm:py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg sm:text-xl rounded-full border-2 sm:border-3 md:border-4 border-purple-400 transition-all transform hover:scale-105"
                    style={{ fontFamily: 'monospace', boxShadow: '0 0 20px rgba(167,139,250,0.6)' }}>
                    START
                  </button>
                  <div className="flex gap-2 sm:gap-3">
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm rounded-lg border-2 border-gray-600 transition">
                      &lt;/&gt; Código
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm rounded-lg border-2 border-blue-400 transition">
                      ↗ Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Máquina Pac-Man - responsive */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                 style={{
                   background: theme === 'light'
                     ? 'linear-gradient(to bottom right, #f9a8d4, #fb7185)'
                     : 'linear-gradient(to bottom right, #be185d, #9f1239)',
                   boxShadow: theme === 'light'
                     ? '0 20px 60px rgba(236,72,153,0.4), inset 0 0 30px rgba(255,255,255,0.5)'
                     : '0 20px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.1)'
                 }}>
              {/* Pantalla CRT */}
              <div className="relative bg-black m-3 sm:m-4 md:m-6 rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-3 md:border-4 border-gray-900"
                   style={{ aspectRatio: '4/3', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
                {/* Cabecera de la pantalla - responsive */}
                <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex items-center gap-1 sm:gap-2 z-10">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-red-500 rounded-full shadow-lg"></div>
                  <span className="ml-1 sm:ml-2 text-gray-400 text-xs sm:text-sm tracking-wider hidden sm:inline">PRESS TO START</span>
                </div>

                {/* Contenido del juego - responsive */}
                <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                  <div className="mb-4 sm:mb-6 flex gap-2 sm:gap-3">
                    <div className="text-3xl sm:text-4xl md:text-5xl">🟣</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl">🔵</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl">🟠</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl">🔴</div>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-2 sm:mb-3 md:mb-4 tracking-wider"
                      style={{ fontFamily: 'monospace', textShadow: '0 0 10px rgba(234,179,8,0.8)' }}>
                    PAC-MAN
                  </h3>
                  <p className="text-gray-300 text-center text-xs sm:text-sm mb-4 sm:mb-6 px-2 sm:px-4">
                    Una reinterpretación de la acción clásica arcade, donde cada píxel devorado cuenta para algo más.
                  </p>

                  {/* Botones - responsive */}
                  <button
                    onClick={() => setSelectedGame("pacman")}
                    className="mb-3 sm:mb-4 px-6 sm:px-8 py-2 sm:py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-lg sm:text-xl rounded-full border-2 sm:border-3 md:border-4 border-pink-400 transition-all transform hover:scale-105"
                    style={{ fontFamily: 'monospace', boxShadow: '0 0 20px rgba(236,72,153,0.6)' }}>
                    START
                  </button>
                  <div className="flex gap-2 sm:gap-3">
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm rounded-lg border-2 border-gray-600 transition">
                      &lt;/&gt; Código
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm rounded-lg border-2 border-blue-400 transition">
                      ↗ Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-black rounded-xl md:rounded-2xl overflow-hidden border-4 sm:border-6 md:border-8 border-gray-900 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
               style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
            {selectedGame === "pacman" && <PacmanGame />}
            {selectedGame === "boo" && <BooGame />}
          </div>
        )}
      </div>

      {/* Botón para volver al menú - responsive */}
      {selectedGame !== "none" && (
        <button
          onClick={() => setSelectedGame("none")}
          className="mt-6 sm:mt-8 bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-bold border-2 sm:border-3 md:border-4 border-gray-600 transition-all transform hover:scale-105 relative z-10"
          style={{ fontFamily: 'monospace' }}>
          ⬅️ {tr("gallery.back", "Volver al menú")}
        </button>
      )}
    </section>
  );
};

export default MyGame;
