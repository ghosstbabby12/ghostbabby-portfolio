"use client";

import React from "react";

interface ArcadeMachineProps {
  children?: React.ReactNode;
}

const ArcadeMachine: React.FC<ArcadeMachineProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col items-center justify-start bg-dark-accent rounded-2xl shadow-glow border-4 border-ghost-purple 
                    w-full max-w-[900px] md:max-w-[1000px] lg:max-w-[1100px]
                    h-[850px] md:h-[950px] lg:h-[1000px]
                    transition-all duration-500 p-6 overflow-visible">

      {/* Pantalla del arcade */}
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden 
                      border-2 border-ghost-purple w-full h-[700px] md:h-[800px] lg:h-[850px] 
                      flex items-center justify-center shadow-inner">
        {children}
      </div>

      {/* Base inferior de la máquina */}
      <div className="mt-4 w-full h-24 bg-ghost-purple rounded-b-2xl flex items-center justify-center space-x-4 shadow-inner">
        <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse"></div>
        <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
        <div className="w-5 h-5 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ArcadeMachine;
