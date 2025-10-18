"use client";

import React from "react";
import ArcadeMachine from "@/components/ArcadeMachine"; 
import PacmanGame from  "../PacmanGame";
import { useI18n } from '../../app/providers'

const MyGame: React.FC = () => {
  const { t } = useI18n()
  return (
    <section
      id="mygame"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4"
    >
      {/* Título */}
      <h2 className="text-4xl font-bold mb-8 text-center text-ghost-purple">
        🎮 {t('mygame.title')} 🎮
      </h2>

      {/* Aquí se monta la Arcade Machine */}
      <ArcadeMachine>
        <PacmanGame />
      </ArcadeMachine>

      {/* Texto de curiosidad o easter egg hint */}
      <p className="mt-6 text-sm text-gray-400 italic">
        Tip: Haz clic en ciertos elementos para descubrir <span className="text-ghost-pink">Easter Eggs 👻</span>
      </p>
    </section>
  );
};

export default MyGame;
