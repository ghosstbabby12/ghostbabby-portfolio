"use client";

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
  const [score, setScore] = useState(999999);
  const [level, setLevel] = useState(8);
  const [credits, setCredits] = useState(5);
  const [isHoveringBoo, setIsHoveringBoo] = useState(false);
  const [isHoveringPacman, setIsHoveringPacman] = useState(false);

  // helper: use translation if exists, otherwise fallback string
  const tr = (key: string, fallback: string) => {
    const res = t(key);
    return res === key ? fallback : res;
  };

  // Función para manejar selección de juego
  const handleGameSelect = (game: "pacman" | "boo") => {
    if (credits > 0) {
      setSelectedGame(game);
      setCredits((prev) => prev - 1);
      setScore((prev) => prev + Math.floor(Math.random() * 1000));
    }
  };

  // Función para volver al menú
  const handleBackToMenu = () => {
    setSelectedGame("none");
    setLevel((prev) => prev + 1);
  };

  return (
    <section
      id="mygame"
      className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden"
      style={{
        background:
          theme === "light"
            ? "linear-gradient(to bottom, #ffffff, #fdf2f8, #fce7f3)"
            : "linear-gradient(to bottom, #581c87, #4338ca, #000000)",
      }}
    >
      {/* Fondo de puntos estilo arcade - adaptable a tema */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Header estilo arcade - responsive */}
      <div className="relative z-10 w-full max-w-6xl mb-6 md:mb-8 px-2">
        <div className="flex justify-between items-center text-sm sm:text-xl md:text-2xl font-bold mb-4">
          <div className="text-yellow-400 dark:text-yellow-400">
            {t("mygame.header.score")}
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl tracking-wider">
              {score.toString().padStart(6, '0')}
            </span>
          </div>
          <div className="text-pink-400 dark:text-pink-400">
            {t("mygame.header.level")}
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl tracking-wider">
              {level.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="text-cyan-400 dark:text-cyan-400">
            {t("mygame.header.credits")}
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl tracking-wider">
              {credits.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Título SELECT GAME - responsive */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-center text-yellow-400 dark:text-yellow-400 tracking-widest relative z-10 px-4"
        style={{
          fontFamily: "monospace",
          textShadow: "0 0 20px rgba(234, 179, 8, 0.8)",
        }}
      >
        {t("mygame.header.selectGame")}
      </h2>

      {/* Contenedor de máquinas arcade estilo retro - responsive */}
      <div
        className="relative z-10 w-full max-w-7xl border-4 sm:border-6 md:border-8 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
        style={{
          borderColor: theme === "light" ? "#f9a8d4" : "#1f2937",
          background:
            theme === "light"
              ? "linear-gradient(to bottom right, #fbcfe8, #e9d5ff, #fbcfe8)"
              : "linear-gradient(to bottom right, #581c87, #3730a3, #581c87)",
          boxShadow:
            theme === "light"
              ? "inset 0 0 100px rgba(255,192,203,0.3), 0 0 50px rgba(219,112,147,0.3)"
              : "inset 0 0 100px rgba(0,0,0,0.5), 0 0 50px rgba(138,43,226,0.3)",
        }}
      >
        {selectedGame === "none" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 animate-fadeIn">
            {/* Máquina Boo - responsive */}
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden"
              style={{
                background:
                  theme === "light"
                    ? "linear-gradient(to bottom right, #d8b4fe, #a5b4fc)"
                    : "linear-gradient(to bottom right, #4338ca, #6b21a8)",
                boxShadow:
                  theme === "light"
                    ? "0 20px 60px rgba(147,51,234,0.4), inset 0 0 30px rgba(255,255,255,0.5)"
                    : "0 20px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.1)",
              }}
            >
              {/* Pantalla CRT */}
              <div
                className="relative m-3 sm:m-4 md:m-6 rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-3 md:border-4 border-gray-900 bg-gray-900 flex flex-col"
                style={{
                  boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)",
                }}
              >
                {/* Cabecera con corazones emoji - responsive */}
                <div
                  className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex items-center gap-1 sm:gap-2"
                  style={{ zIndex: 10 }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl">❤️</span>
                  <span className="text-lg sm:text-xl md:text-2xl">❤️</span>
                  <span className="text-lg sm:text-xl md:text-2xl">❤️</span>
                  <span className="ml-1 sm:ml-2 text-gray-400 text-xs sm:text-sm tracking-wider hidden sm:inline font-bold" style={{ fontFamily: "monospace" }}>
                    {t("boo.card.pressToStart")}
                  </span>
                </div>

                {/* Área de imagen superior - más grande */}
                <div
                  className="relative w-full flex-1 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex items-center justify-center cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setIsHoveringBoo(true)}
                  onMouseLeave={() => setIsHoveringBoo(false)}
                  style={{
                    backgroundImage: isHoveringBoo
                      ? "none"
                      : "url(/images/games/boo.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "saturate(1.4) brightness(1.1)",
                    backgroundColor: isHoveringBoo ? "#000000" : "transparent",
                  }}
                >
                  {/* Overlay muy sutil */}
                  {!isHoveringBoo && (
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30"
                      style={{ zIndex: 1 }}
                    ></div>
                  )}

                  {/* GIF animado de Boo al hacer hover */}
                  {isHoveringBoo && (
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <img
                        src="https://media1.tenor.com/m/TbGh9uzZ8mUAAAAC/king-boo-super-mario.gif"
                        alt="Boo animated"
                        className="max-w-[80%] max-h-[80%] object-contain"
                        style={{
                          filter: "drop-shadow(0 0 30px rgba(216,180,254,0.9))",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Área de contenido inferior - más compacta */}
                <div className="relative px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 flex flex-col items-center" style={{ zIndex: 10, backgroundColor: '#1a1a1a' }}>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2 tracking-wider"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      color: "#D8B4FE",
                      textShadow: "0 0 10px #D8B4FE, 0 0 20px #A78BFA, 2px 2px 0px #000000",
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t("boo.card.title")}
                  </h3>
                  <p className="text-gray-400 text-center text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
                    {t("boo.card.description")}
                  </p>

                  {/* Botón START más grande */}
                  <button
                    onClick={() => handleGameSelect("boo")}
                    disabled={credits === 0}
                    className="mb-3 px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 font-bold text-base sm:text-lg md:text-xl rounded-full border-3 md:border-4 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "monospace",
                      backgroundColor: "transparent",
                      color: "#D8B4FE",
                      borderColor: "#FFFFFF",
                      borderWidth: "3px",
                    }}
                  >
                    {t("boo.card.startButton")}
                  </button>

                  {/* Botones secundarios */}
                  <div className="flex gap-2 sm:gap-3">
                    <button className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all hover:opacity-80" style={{ backgroundColor: "#4A5568", color: "#FFFFFF" }}>
                      {t("boo.card.codeButton")}
                    </button>
                    <button className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all hover:opacity-80" style={{ backgroundColor: "#3B82F6", color: "#FFFFFF" }}>
                      {t("boo.card.demoButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Máquina Pac-Man - responsive */}
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden"
              style={{
                background:
                  theme === "light"
                    ? "linear-gradient(to bottom right, #f9a8d4, #fb7185)"
                    : "linear-gradient(to bottom right, #be185d, #9f1239)",
                boxShadow:
                  theme === "light"
                    ? "0 20px 60px rgba(236,72,153,0.4), inset 0 0 30px rgba(255,255,255,0.5)"
                    : "0 20px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.1)",
              }}
            >
              {/* Pantalla CRT */}
              <div
                className="relative m-3 sm:m-4 md:m-6 rounded-xl md:rounded-2xl overflow-hidden border-2 sm:border-3 md:border-4 border-gray-900 bg-gray-900 flex flex-col"
                style={{
                  boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)",
                }}
              >
                {/* Cabecera con corazones emoji - responsive */}
                <div
                  className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 flex items-center gap-1 sm:gap-2"
                  style={{ zIndex: 10 }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl">❤️</span>
                  <span className="text-lg sm:text-xl md:text-2xl">❤️</span>
                  <span className="text-lg sm:text-xl md:text-2xl">❤️</span>
                  <span className="ml-1 sm:ml-2 text-gray-400 text-xs sm:text-sm tracking-wider hidden sm:inline font-bold" style={{ fontFamily: "monospace" }}>
                    {t("pacman.card.pressToStart")}
                  </span>
                </div>

                {/* Área de imagen superior - más grande */}
                <div
                  className="relative w-full flex-1 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex items-center justify-center cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setIsHoveringPacman(true)}
                  onMouseLeave={() => setIsHoveringPacman(false)}
                  style={{
                    backgroundImage: isHoveringPacman
                      ? "none"
                      : "url(/images/games/pacman.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "saturate(1.4) brightness(1.1)",
                    backgroundColor: isHoveringPacman ? "#000000" : "transparent",
                  }}
                >
                  {/* Overlay muy sutil */}
                  {!isHoveringPacman && (
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30"
                      style={{ zIndex: 1 }}
                    ></div>
                  )}

                  {/* GIF animado de Pac-Man al hacer hover */}
                  {isHoveringPacman && (
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <img
                        src="https://i.pinimg.com/originals/72/07/a4/7207a4522bc87de5a1753224a7ddb431.gif"
                        alt="Pac-Man animated"
                        className="max-w-[80%] max-h-[80%] object-contain"
                        style={{
                          filter: "drop-shadow(0 0 30px rgba(255,215,0,0.9))",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Área de contenido inferior - más compacta */}
                <div className="relative px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 flex flex-col items-center" style={{ zIndex: 10, backgroundColor: '#1a1a1a' }}>
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2 tracking-wider"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      color: "#FFD700",
                      textShadow: "0 0 10px #FFD700, 0 0 20px #FFA500, 2px 2px 0px #000000",
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t("pacman.card.title")}
                  </h3>
                  <p className="text-gray-400 text-center text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
                    {t("pacman.card.description")}
                  </p>

                  {/* Botón START más grande */}
                  <button
                    onClick={() => handleGameSelect("pacman")}
                    disabled={credits === 0}
                    className="mb-3 px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 font-bold text-base sm:text-lg md:text-xl rounded-full border-3 md:border-4 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "monospace",
                      backgroundColor: "transparent",
                      color: "#FFD700",
                      borderColor: "#FFFFFF",
                      borderWidth: "3px",
                    }}
                  >
                    {t("pacman.card.startButton")}
                  </button>

                  {/* Botones secundarios */}
                  <div className="flex gap-2 sm:gap-3">
                    <button className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all hover:opacity-80" style={{ backgroundColor: "#4A5568", color: "#FFFFFF" }}>
                      {t("pacman.card.codeButton")}
                    </button>
                    <button className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all hover:opacity-80" style={{ backgroundColor: "#3B82F6", color: "#FFFFFF" }}>
                      {t("pacman.card.demoButton")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="relative bg-black rounded-xl md:rounded-2xl overflow-hidden border-4 sm:border-6 md:border-8 border-gray-900 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
            style={{ boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)" }}
          >
            {selectedGame === "pacman" && <PacmanGame />}
            {selectedGame === "boo" && <BooGame />}
          </div>
        )}
      </div>

      {/* Botón para volver al menú - responsive */}
      {selectedGame !== "none" && (
        <button
          onClick={handleBackToMenu}
          className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-bold border-2 sm:border-3 md:border-4 border-ghost-purple bg-card-gradient text-white transition-all transform hover:scale-105 relative z-10 hover:shadow-lg hover:shadow-ghost-purple/30"
          style={{
            fontFamily: "monospace",
          }}
        >
          ⬅️ {tr("gallery.back", "Volver al menú")}
        </button>
      )}
    </section>
  );
};

export default MyGame;