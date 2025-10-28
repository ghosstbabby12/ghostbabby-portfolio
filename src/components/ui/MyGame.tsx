'use client';

import React, { useState, useEffect } from "react";
import ArcadeMachine from "@/components/ArcadeMachine";
import PacmanGame from "@/components/PacmanGame";
import BooGame from "@/components/BooGame";
import { useI18n } from "@/app/providers";

const MyGame: React.FC = () => {
  const { t } = useI18n();
  const [selectedGame, setSelectedGame] = useState<"none" | "pacman" | "boo">(
    "none"
  );
  const [showInsertCoin, setShowInsertCoin] = useState(true);

  // helper: use translation if exists, otherwise fallback string
  const tr = (key: string, fallback: string) => {
    const res = t(key)
    return res === key ? fallback : res
  }

  // Animación tipo “insert coin” parpadeante
  useEffect(() => {
    const interval = setInterval(() => {
      setShowInsertCoin((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="mygame"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4"
    >
      {/* 🔹 Título principal */}
      <h2 className="text-4xl font-bold mb-8 text-center text-ghost-purple drop-shadow-lg">
        🎮 {tr("mygame.title", "My Game")} 🎮
      </h2>

      {/* 🔹 Contenedor principal arcade */}
      <ArcadeMachine>
        {selectedGame === "none" && (
          <div className="flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4 tracking-wider">
              {tr("mygame.select", "SELECT GAME")}
            </h3>
            <div className="flex gap-6">
              <button
                onClick={() => setSelectedGame("pacman")}
                className="bg-ghost-pink hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
              >
                {/* prefer existing pacman title translation */}
                {tr("pacman.title", "👻 Ghost-Man")}
              </button>
              <button
                onClick={() => setSelectedGame("boo")}
                className="bg-ghost-purple hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
              >
                {tr("boo.title", "💀 Boo Adventure")}
              </button>
            </div>

            {showInsertCoin && (
              <p className="text-sm text-gray-400 italic mt-6 animate-pulse">
                {tr("mygame.insertCoin", "🪙 INSERT COIN TO START 🪙")}
              </p>
            )}
          </div>
        )}

        {selectedGame === "pacman" && <PacmanGame />}
        {selectedGame === "boo" && <BooGame />}
      </ArcadeMachine>

      {/* 🔹 Botón para volver al menú */}
      {selectedGame !== "none" && (
        <button
          onClick={() => setSelectedGame("none")}
          className="mt-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          {tr("gallery.back", "⬅️ Volver al menú")}
        </button>
      )}

      {/* 🔹 Texto de curiosidad o Easter Egg */}
      <p className="mt-6 text-sm text-gray-400 italic text-center">
        {tr("mygame.tipPrefix", "Tip")}: {tr("mygame.tip", "Haz clic en ciertos elementos para descubrir")}{" "}
        <span className="text-ghost-pink">Easter Eggs 👻</span>
      </p>
    </section>
  );
};

export default MyGame;
