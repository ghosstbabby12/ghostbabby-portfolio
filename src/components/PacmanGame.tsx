'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const CELL = 20
const ROWS = 21
const COLS = 28

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const router = useRouter()

  const map = [
    "############################",
    "#............##............#",
    "#.####.#####.##.#####.####.#",
    "#.####.#####.##.#####.####.#",
    "#..........................#",
    "#.####.##.########.##.####.#",
    "#......##....##....##......#",
    "######.##### ## #####.######",
    "     #.##### ## #####.#     ",
    "     #.##          ##.#     ",
    "######.## ###--### ##.######",
    "      .   #      #   .      ",
    "######.## ######## ##.######",
    "     #.##          ##.#     ",
    "     #.##### ## #####.#     ",
    "######.##### ## #####.######",
    "#............##............#",
    "#.####.#####.##.#####.####.#",
    "#...##................##...#",
    "###.##.##.########.##.##.###",
    "#............##............#",
    "############################"
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let pacman = {
      x: 13,
      y: 17,
      dx: 1,
      dy: 0,
      nextDx: 1,
      nextDy: 0,
      mouth: 0,
      mouthOpening: true,
    }

    type Ghost = { x: number; y: number; lastDir: [number, number]; color: string; startX: number; startY: number }
    const ghosts: Ghost[] = [
      { x: 13, y: 11, lastDir: [-1, 0], color: '#FF0000', startX: 13, startY: 11 },
      { x: 14, y: 11, lastDir: [1, 0], color: '#FFB8FF', startX: 14, startY: 11 },
      { x: 12, y: 11, lastDir: [0, 1], color: '#00FFFF', startX: 12, startY: 11 },
      { x: 15, y: 11, lastDir: [0, -1], color: '#FFB851', startX: 15, startY: 11 }
    ]

    let pellets = new Set<string>()
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (map[r][c] === '.') pellets.add(`${r},${c}`)
      }
    }

    const canMove = (x: number, y: number) => {
      const row = Math.floor(y)
      const col = Math.floor(x)
      return map[row]?.[col] !== '#'
    }

    const moveGhost = (g: Ghost) => {
      const possible: [number, number][] = []
      const dirs: [number, number][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ]
      for (const d of dirs) {
        const nx = g.x + d[0]
        const ny = g.y + d[1]
        if (canMove(nx, ny)) {
          if (d[0] === -g.lastDir[0] && d[1] === -g.lastDir[1]) continue
          possible.push(d)
        }
      }
      if (possible.length === 0) {
        for (const d of dirs) {
          const nx = g.x + d[0]
          const ny = g.y + d[1]
          if (canMove(nx, ny)) possible.push(d)
        }
      }
      if (possible.length > 0) {
        const pick = possible[Math.floor(Math.random() * possible.length)]
        g.lastDir = pick
        g.x += pick[0] * 0.1
        g.y += pick[1] * 0.1
      }
    }

    const resetPositionsAfterHit = () => {
      pacman.x = 13
      pacman.y = 17
      pacman.dx = 1
      pacman.dy = 0
      pacman.nextDx = 1
      pacman.nextDy = 0
      ghosts.forEach(g => { g.x = g.startX; g.y = g.startY; g.lastDir = [0, -1] })
    }

    let pausedTicks = 0

    const update = () => {
      if (pausedTicks > 0) {
        pausedTicks--
        return
      }

      const nextX = pacman.x + pacman.nextDx * 0.1
      const nextY = pacman.y + pacman.nextDy * 0.1
      if (canMove(nextX, nextY)) {
        pacman.dx = pacman.nextDx
        pacman.dy = pacman.nextDy
      }

      const newX = pacman.x + pacman.dx * 0.1
      const newY = pacman.y + pacman.dy * 0.1

      if (canMove(newX, newY)) {
        pacman.x = newX
        pacman.y = newY
      } else {
        pacman.dx = 0
        pacman.dy = 0
      }

      const cellR = Math.floor(pacman.y)
      const cellC = Math.floor(pacman.x)
      if (pellets.has(`${cellR},${cellC}`)) {
        pellets.delete(`${cellR},${cellC}`)
        setScore((prev) => prev + 10)
      }

      if (pacman.mouthOpening) {
        pacman.mouth += 0.05
        if (pacman.mouth > 0.3) pacman.mouthOpening = false
      } else {
        pacman.mouth -= 0.05
        if (pacman.mouth < 0) pacman.mouthOpening = true
      }

      ghosts.forEach(g => {
        if (Math.random() < 0.25) {
          moveGhost(g)
        } else {
          const [ldx, ldy] = g.lastDir
          const attemptX = g.x + ldx * 0.1
          const attemptY = g.y + ldy * 0.1
          if (canMove(attemptX, attemptY)) {
            g.x = attemptX
            g.y = attemptY
          } else {
            moveGhost(g)
          }
        }
      })

      for (const g of ghosts) {
        const dist = Math.hypot(g.x - pacman.x, g.y - pacman.y)
        if (dist < 0.6) {
          setLives(prev => {
            const next = prev - 1
            if (next <= 0) {
              setGameOver(true)
            } else {
              resetPositionsAfterHit()
              pausedTicks = 12
            }
            return next
          })
          break
        }
      }

      if (pellets.size === 0) {
        setWon(true)
        setGameOver(true)
      }
    }

    const draw = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tile = map[r][c]
          if (tile === '#') {
            ctx.strokeStyle = '#00f6ff'
            ctx.lineWidth = 2
            ctx.strokeRect(c * CELL, r * CELL, CELL, CELL)
          } else if (pellets.has(`${r},${c}`)) {
            ctx.fillStyle = 'orange'
            ctx.beginPath()
            ctx.arc(
              c * CELL + CELL / 2,
              r * CELL + CELL / 2,
              3,
              0,
              Math.PI * 2
            )
            ctx.fill()
          }
        }
      }

      for (const g of ghosts) {
        const gx = g.x * CELL + CELL / 2
        const gy = g.y * CELL + CELL / 2
        ctx.beginPath()
        ctx.fillStyle = g.color
        ctx.arc(gx, gy - 2, CELL / 2 - 2, Math.PI, 0)
        ctx.lineTo(gx + CELL / 2 - 2, gy + CELL / 2 - 2)
        ctx.closePath()
        ctx.fill()
      }

      ctx.fillStyle = 'yellow'
      const startAngle = pacman.mouth * Math.PI
      const endAngle = 2 * Math.PI - pacman.mouth * Math.PI
      const centerX = pacman.x * CELL + CELL / 2
      const centerY = pacman.y * CELL + CELL / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, CELL / 2 - 2, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
    }

    let rafId: number | null = null
    const loop = () => {
      update()
      draw()
      if (!gameOver) rafId = requestAnimationFrame(loop)
    }

    const handleKey = (e: KeyboardEvent) => {
      // 🚫 Evitar que la pantalla se desplace
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault()
      }

      if (!gameStarted && !gameOver && !won) setGameStarted(true)

      const dir: Record<string, [number, number]> = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      }
      const move = dir[e.key]
      if (move) {
        pacman.nextDx = move[0]
        pacman.nextDy = move[1]
      }
    }

    window.addEventListener('keydown', handleKey, { passive: false })
    loop()

    return () => {
      window.removeEventListener('keydown', handleKey)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [gameOver, won])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white select-none overflow-hidden">
      <h1 className="text-3xl font-bold mb-2 text-yellow-400 tracking-widest">👻 GHOST-MAN</h1>
      <p className="text-gray-300 mb-2">Puntaje: {score} &nbsp; Vida(s): {lives}</p>

      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        className="border-4 border-blue-500 rounded-lg shadow-[0_0_30px_#00f6ff]"
      />

      {won && (
        <button
          onClick={() => router.push('/galeria')}
          className="mt-6 px-6 py-3 text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:scale-110 transition-all shadow-lg"
        >
          Ver galería secreta 👁️
        </button>
      )}

      {gameOver && !won && (
        <div className="mt-6 text-center">
          <p className="text-red-400 text-2xl mb-2">GAME OVER</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-3 bg-blue-600 text-white rounded"
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  )
}
