import React, { useState } from "react";

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  hearts: number;
}

const games: Game[] = [
  {
    id: "boo-mario",
    title: "BOO MARIO BROS",
    description: "Un spin-off retrofuturista inspirado en los enemigos de Mario, donde el jugador controla a Boo en un mundo oscuro y brillante.",
    image: "👻",
    gradient: "from-blue-600 to-purple-600",
    hearts: 3
  },
  {
    id: "pac-man",
    title: "PAC-MAN",
    description: "Una reinterpretación de la acción clásica arcade, donde cada píxel devorado cuenta para algo más.",
    image: "🟡",
    gradient: "from-pink-600 to-red-600",
    hearts: 3
  }
];

interface ArcadeMachineProps {
  children?: React.ReactNode;
}

const ArcadeMachine: React.FC<ArcadeMachineProps> = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 relative overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`
            }}
          />
        ))}
      </div>

      {/* Top HUD */}
      <div className="relative z-10 flex justify-between items-start px-12 pt-8 text-xs font-bold tracking-wider">
        <div>
          <div className="text-yellow-500 mb-1 opacity-80">SCORE</div>
          <div className="text-yellow-400 text-2xl font-mono tracking-tight">999999</div>
        </div>
        <div className="text-center">
          <div className="text-pink-500 mb-1 opacity-80">LEVEL</div>
          <div className="text-pink-400 text-2xl font-mono tracking-tight">08</div>
        </div>
        <div className="text-right">
          <div className="text-purple-400 mb-1 opacity-80">CREDITS</div>
          <div className="text-purple-300 text-2xl font-mono tracking-tight">05</div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 container mx-auto px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-16 tracking-widest font-mono text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]">
          SELECT GAME
        </h1>
        
        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {games.map((game) => (
            <div
              key={game.id}
              className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                selectedGame === game.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'
              }`}
              style={{
                background: `linear-gradient(135deg, ${game.gradient.includes('blue') ? '#4338ca, #6d28d9' : '#be185d, #dc2626'})`
              }}
              onClick={() => setSelectedGame(game.id)}
            >
              {/* Game Card */}
              <div className="bg-black rounded-2xl p-6 shadow-xl">
                {/* Hearts and Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(game.hearts)].map((_, i) => (
                      <span key={i} className="text-red-500 text-xl">❤️</span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">Press to Start</span>
                </div>

                {/* Game Image Area */}
                <div className="bg-black rounded-xl h-48 flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                  {game.id === "boo-mario" ? (
                    <div className="relative">
                      <div className="text-8xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                        👻
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <span className="text-5xl">🟣</span>
                      <span className="text-5xl">🔵</span>
                      <span className="text-5xl">🟠</span>
                      <span className="text-5xl">🔴</span>
                    </div>
                  )}
                </div>

                {/* Game Title */}
                <h2 className="text-2xl font-bold mb-3 tracking-wider text-center" style={{
                  color: game.id === "boo-mario" ? "#a78bfa" : "#fbbf24"
                }}>
                  {game.title}
                </h2>

                {/* Game Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center px-2">
                  {game.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-transparent border-2 border-pink-500 text-pink-400 py-3 px-6 rounded-lg font-bold text-lg tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-200 uppercase">
                    START
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-gray-800 text-gray-300 py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <span>&lt;/&gt;</span>
                      <span>Código</span>
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                      <span>▶</span>
                      <span>Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {children}
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)'
        }}></div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ArcadeMachine;