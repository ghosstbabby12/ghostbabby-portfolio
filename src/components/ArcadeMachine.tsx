import React from "react";

interface ArcadeMachineProps {
  children: React.ReactNode;
}

const ArcadeMachine: React.FC<ArcadeMachineProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="relative bg-black border-[12px] border-gray-800 rounded-lg shadow-2xl w-[420px]">
        {/* Pantalla */}
        <div className="bg-gradient-to-b from-gray-900 to-black p-4 rounded-md">
          {children}
        </div>

        {/* Marco arcade */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-black font-bold px-6 py-2 rounded-md shadow-lg">
          👾 Ghost Arcade 👾
        </div>

        {/* Botones */}
        <div className="flex justify-center space-x-6 p-4 bg-gray-900 rounded-b-lg">
          <button className="w-6 h-6 rounded-full bg-red-600 shadow-inner"></button>
          <button className="w-6 h-6 rounded-full bg-blue-600 shadow-inner"></button>
          <button className="w-6 h-6 rounded-full bg-green-600 shadow-inner"></button>
        </div>
      </div>
    </div>
  );
};

export default ArcadeMachine;
