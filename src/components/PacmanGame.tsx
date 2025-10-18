'use client';

import React, { useEffect, useRef, useState } from "react";

const tileSize = 20;

// Laberinto
const initialMaze: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 2, 2, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
  [3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 0, 1, 3, 3, 3, 3, 3],
  [1, 1, 1, 1, 1, 0, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 0, 1, 1, 1, 1, 1, 1],
  [3, 3, 3, 3, 3, 0, 3, 3, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 3, 0, 3, 3, 3, 3, 3, 3],
  [1, 1, 1, 1, 1, 0, 1, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const PacmanGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mazeRef = useRef<number[][]>(initialMaze.map(row => [...row]));
  
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pacman, setPacman] = useState({ x: 1, y: 1, dir: "RIGHT" });
  const [nextDir, setNextDir] = useState("RIGHT");
  
  const [ghosts, setGhosts] = useState([
    // Nuevas posiciones iniciales en el centro del laberinto
    { x: 13, y: 14, color: "red", lastDir: "" },
    { x: 14, y: 14, color: "cyan", lastDir: "" },
    { x: 15, y: 14, color: "pink", lastDir: "" },
  ]);

  const resetGame = () => {
    mazeRef.current = initialMaze.map(row => [...row]);
    setScore(0);
    setGameOver(false);
    setPacman({ x: 1, y: 1, dir: "RIGHT" });
    setNextDir("RIGHT");
    setGhosts([
      { x: 13, y: 14, color: "red", lastDir: "" },
      { x: 14, y: 14, color: "cyan", lastDir: "" },
      { x: 15, y: 14, color: "pink", lastDir: "" },
    ]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentMaze = mazeRef.current;
      for (let y = 0; y < currentMaze.length; y++) {
        for (let x = 0; x < currentMaze[y].length; x++) {
          if (currentMaze[y][x] === 1) {
            ctx.fillStyle = "blue";
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
          } else if (currentMaze[y][x] === 2) {
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(x * tileSize + 10, y * tileSize + 10, 3, 0, Math.PI * 2);
            ctx.fill();
          } else if (currentMaze[y][x] === 3) {
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(x * tileSize + 10, y * tileSize + 10, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.fillStyle = "yellow";
      ctx.beginPath();
      let startAngle = 0.25 * Math.PI;
      let endAngle = 1.75 * Math.PI;
      if (pacman.dir === "LEFT") {
        startAngle = 1.25 * Math.PI;
        endAngle = 0.75 * Math.PI;
      } else if (pacman.dir === "UP") {
        startAngle = 1.75 * Math.PI;
        endAngle = 1.25 * Math.PI;
      } else if (pacman.dir === "DOWN") {
        startAngle = 0.75 * Math.PI;
        endAngle = 0.25 * Math.PI;
      }
      ctx.arc(
        pacman.x * tileSize + 10,
        pacman.y * tileSize + 10,
        9,
        startAngle,
        endAngle
      );
      ctx.lineTo(pacman.x * tileSize + 10, pacman.y * tileSize + 10);
      ctx.fill();

      ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x * tileSize + 10, g.y * tileSize + 10, 9, Math.PI, 0);
        ctx.rect(g.x * tileSize + 1, g.y * tileSize + 10, 18, 10);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(g.x * tileSize + 6, g.y * tileSize + 8, 3, 0, Math.PI * 2);
        ctx.arc(g.x * tileSize + 14, g.y * tileSize + 8, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(g.x * tileSize + 6, g.y * tileSize + 8, 1.5, 0, Math.PI * 2);
        ctx.arc(g.x * tileSize + 14, g.y * tileSize + 8, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
  }, [pacman, ghosts]);

  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      const currentMaze = mazeRef.current;
      let newX = pacman.x;
      let newY = pacman.y;

      let canMove = false;
      if (nextDir === "UP" && currentMaze[pacman.y - 1][pacman.x] !== 1) {
        setPacman(p => ({ ...p, dir: "UP" }));
        canMove = true;
      } else if (nextDir === "DOWN" && currentMaze[pacman.y + 1][pacman.x] !== 1) {
        setPacman(p => ({ ...p, dir: "DOWN" }));
        canMove = true;
      } else if (nextDir === "LEFT" && currentMaze[pacman.y][pacman.x - 1] !== 1) {
        setPacman(p => ({ ...p, dir: "LEFT" }));
        canMove = true;
      } else if (nextDir === "RIGHT" && currentMaze[pacman.y][pacman.x + 1] !== 1) {
        setPacman(p => ({ ...p, dir: "RIGHT" }));
        canMove = true;
      }

      if (pacman.dir === "UP" && currentMaze[pacman.y - 1][pacman.x] !== 1) newY--;
      else if (pacman.dir === "DOWN" && currentMaze[pacman.y + 1][pacman.x] !== 1) newY++;
      else if (pacman.dir === "LEFT" && currentMaze[pacman.y][pacman.x - 1] !== 1) newX--;
      else if (pacman.dir === "RIGHT" && currentMaze[pacman.y][pacman.x + 1] !== 1) newX++;

      if (currentMaze[newY][newX] === 2) {
        currentMaze[newY][newX] = 0;
        setScore(s => s + 10);
      } else if (currentMaze[newY][newX] === 3) {
        currentMaze[newY][newX] = 0;
        setScore(s => s + 50);
      }

      setPacman(p => ({ ...p, x: newX, y: newY }));

    }, 200);

    return () => clearInterval(interval);
  }, [pacman, nextDir, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setGhosts(prevGhosts =>
        prevGhosts.map(g => {
          const currentMaze = mazeRef.current;
          let newX = g.x;
          let newY = g.y;
          let nextDir = g.lastDir;

          // Comportamiento del fantasma rojo (persigue a Pac-Man)
          if (g.color === "red") {
            const possibleMoves = [];
            if (currentMaze[g.y][g.x + 1] !== 1) possibleMoves.push({ x: g.x + 1, y: g.y, dir: "RIGHT" });
            if (currentMaze[g.y][g.x - 1] !== 1) possibleMoves.push({ x: g.x - 1, y: g.y, dir: "LEFT" });
            if (currentMaze[g.y + 1][g.x] !== 1) possibleMoves.push({ x: g.x, y: g.y + 1, dir: "DOWN" });
            if (currentMaze[g.y - 1][g.x] !== 1) possibleMoves.push({ x: g.x, y: g.y - 1, dir: "UP" });

            let bestMove = possibleMoves[0];
            let minDistance = Infinity;

            possibleMoves.forEach(move => {
              const distance = Math.sqrt(
                Math.pow(move.x - pacman.x, 2) + Math.pow(move.y - pacman.y, 2)
              );
              if (distance < minDistance) {
                minDistance = distance;
                bestMove = move;
              }
            });

            if (bestMove) {
              newX = bestMove.x;
              newY = bestMove.y;
              nextDir = bestMove.dir;
            }
          } else { // Comportamiento de los otros fantasmas (aleatorio en intersecciones)
            const possibleMoves = [];
            if (currentMaze[g.y][g.x + 1] !== 1) possibleMoves.push({ x: g.x + 1, y: g.y, dir: "RIGHT" });
            if (currentMaze[g.y][g.x - 1] !== 1) possibleMoves.push({ x: g.x - 1, y: g.y, dir: "LEFT" });
            if (currentMaze[g.y + 1][g.x] !== 1) possibleMoves.push({ x: g.x, y: g.y + 1, dir: "DOWN" });
            if (currentMaze[g.y - 1][g.x] !== 1) possibleMoves.push({ x: g.x, y: g.y - 1, dir: "UP" });
            
            // Si el fantasma está en una intersección (más de 2 opciones) o no tiene un camino definido
            // o si está en un callejón sin salida (1 opción), cambia de dirección
            if (possibleMoves.length > 2 || possibleMoves.length === 1 || !g.lastDir) {
              const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
              newX = randomMove.x;
              newY = randomMove.y;
              nextDir = randomMove.dir;
            } else {
              // Si no está en una intersección, sigue el camino que ya tenía
              let currentMove;
              if (g.lastDir === "RIGHT" && currentMaze[g.y][g.x + 1] !== 1) currentMove = { x: g.x + 1, y: g.y, dir: "RIGHT" };
              else if (g.lastDir === "LEFT" && currentMaze[g.y][g.x - 1] !== 1) currentMove = { x: g.x - 1, y: g.y, dir: "LEFT" };
              else if (g.lastDir === "DOWN" && currentMaze[g.y + 1][g.x] !== 1) currentMove = { x: g.x, y: g.y + 1, dir: "DOWN" };
              else if (g.lastDir === "UP" && currentMaze[g.y - 1][g.x] !== 1) currentMove = { x: g.x, y: g.y - 1, dir: "UP" };
              
              if(currentMove) {
                 newX = currentMove.x;
                 newY = currentMove.y;
              } else {
                 const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                 newX = randomMove.x;
                 newY = randomMove.y;
                 nextDir = randomMove.dir;
              }
            }
          }

          if (newX === pacman.x && newY === pacman.y) {
            setGameOver(true);
          }

          return { ...g, x: newX, y: newY, lastDir: nextDir };
        })
      );
    }, 400); // Velocidad moderada de los fantasmas

    return () => clearInterval(interval);
  }, [pacman, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "ArrowUp") setNextDir("UP");
      if (e.key === "ArrowDown") setNextDir("DOWN");
      if (e.key === "ArrowLeft") setNextDir("LEFT");
      if (e.key === "ArrowRight") setNextDir("RIGHT");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2 text-purple-400">👻 Ghost Arcade</h2>
      <canvas
        ref={canvasRef}
        width={initialMaze[0].length * tileSize}
        height={initialMaze.length * tileSize}
        style={{ border: "2px solid #444", background: "black" }}
      />
      <p className="text-white mt-2">Puntos: {score}</p>
      {gameOver && (
        <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center">
          <p className="text-red-500 text-6xl font-bold mb-4 animate-pulse">💀 ¡GAME OVER!</p>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Reiniciar Juego
          </button>
        </div>
      )}
    </div>
  );
};

export default PacmanGame;