'use client'

import { useI18n } from "@/app/providers"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'


const CELL = 20
const ROWS = 22
const COLS = 28

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [cherries, setCherries] = useState(0)
  const router = useRouter()
  const { t } = useI18n()

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
    "######.## ###  ### ##.######",
    "      .   #      #   .      ",
    "######.## ######## ##.######",
    "     #.##          ##.#     ",
    "     #.## ######## ##.#     ",
    "######.## ######## ##.######",
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

    type Ghost = { 
      x: number
      y: number
      lastDir: [number, number]
      color: string
      startX: number
      startY: number
    }
    
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

    // 🍒 Posiciones de las cerezas
    const cherryPositions = new Set<string>([
      '1,1',
      '1,26',
      '9,14'
    ])

    // Verificación simple pero efectiva
    const canMove = (x: number, y: number) => {
      const row = Math.floor(y)
      const col = Math.floor(x)
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false
      const tile = map[row]?.[col]
      return tile !== '#' && tile !== '-' && tile !== undefined
    }

    // Movimiento de fantasmas por todo el mapa
    const moveGhost = (g: Ghost) => {
      const dirs: [number, number][] = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ]
      
      // Evaluar direcciones válidas con scoring
      const validDirs: Array<{dir: [number, number], score: number}> = []
      
      for (const d of dirs) {
        const nx = g.x + d[0] * 0.1
        const ny = g.y + d[1] * 0.1
        if (canMove(nx, ny)) {
          // Evitar retroceso inmediato solo si hay otras opciones
          const isBackward = d[0] === -g.lastDir[0] && d[1] === -g.lastDir[1]
          
          // Calcular distancia a Pac-Man
          const distToPacman = Math.hypot(nx - pacman.x, ny - pacman.y)
          
          // 20% persecución, 80% exploración aleatoria
          let score = -distToPacman * 0.2 + Math.random() * 25
          
          // Penalizar retroceso pero no eliminarlo
          if (isBackward) score -= 10
          
          validDirs.push({dir: d, score})
        }
      }
      
      if (validDirs.length > 0) {
        // Ordenar por score y elegir la mejor
        validDirs.sort((a, b) => b.score - a.score)
        const pick = validDirs[0].dir
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
      ghosts.forEach(g => { 
        g.x = g.startX
        g.y = g.startY
        g.lastDir = [0, -1]
      })
    }

    let pausedTicks = 0

    const update = () => {
      if (pausedTicks > 0) {
        pausedTicks--
        return
      }

      // Movimiento de Pac-Man
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
      }

      // Comer puntos
      const cellR = Math.floor(pacman.y)
      const cellC = Math.floor(pacman.x)
      const key = `${cellR},${cellC}`
      
      if (pellets.has(key)) {
        pellets.delete(key)
        setScore(prev => prev + 10)
      }

      // 🍒 Comer cerezas
      if (cherryPositions.has(key)) {
        cherryPositions.delete(key)
        setCherries(prev => prev + 1)
        setScore(prev => prev + 50)
      }

      // Boca animada
      pacman.mouth += pacman.mouthOpening ? 0.05 : -0.05
      if (pacman.mouth > 0.3) pacman.mouthOpening = false
      if (pacman.mouth < 0) pacman.mouthOpening = true

      // Movimiento constante de fantasmas
      ghosts.forEach(g => {
        // 30% cambiar dirección, 70% seguir
        if (Math.random() < 0.3) {
          moveGhost(g)
        } else {
          const [ldx, ldy] = g.lastDir
          const attemptX = g.x + ldx * 0.1
          const attemptY = g.y + ldy * 0.1
          if (canMove(attemptX, attemptY)) {
            g.x = attemptX
            g.y = attemptY
          } else {
            // Si choca con pared, buscar nueva dirección
            moveGhost(g)
          }
        }
      })

      // Colisión con fantasmas
      for (const g of ghosts) {
        const dist = Math.hypot(g.x - pacman.x, g.y - pacman.y)
        if (dist < 0.6) {
          setLives(prev => {
            const next = prev - 1
            if (next <= 0) {
              setGameOver(true)
            } else {
              resetPositionsAfterHit()
              pausedTicks = 20
            }
            return next
          })
          break
        }
      }

      // Victoria
      if (pellets.size === 0) {
        setWon(true)
        setGameOver(true)
      }
    }

    const draw = () => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar mapa
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tile = map[r]?.[c] ?? '#'
          if (tile === '#') {
            ctx.strokeStyle = '#00f6ff'
            ctx.lineWidth = 2
            ctx.strokeRect(c * CELL, r * CELL, CELL, CELL)
          } else if (tile === '-') {
            ctx.fillStyle = '#1a1a2e'
            ctx.fillRect(c * CELL, r * CELL, CELL, CELL)
          } else if (pellets.has(`${r},${c}`)) {
            ctx.fillStyle = '#FFD700'
            ctx.beginPath()
            ctx.arc(c * CELL + CELL / 2, r * CELL + CELL / 2, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // 🍒 Dibujar cerezas
      cherryPositions.forEach(pos => {
        const [r, c] = pos.split(',').map(Number)
        const x = c * CELL + CELL / 2
        const y = r * CELL + CELL / 2
        
        ctx.font = 'bold 18px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('🍒', x, y)
      })

      // Dibujar fantasmas
      for (const g of ghosts) {
        const gx = g.x * CELL + CELL / 2
        const gy = g.y * CELL + CELL / 2
        
        ctx.fillStyle = g.color
        ctx.beginPath()
        ctx.arc(gx, gy - 3, CELL / 2 - 2, Math.PI, 0)
        ctx.lineTo(gx + CELL / 2 - 2, gy + CELL / 2 - 2)
        ctx.lineTo(gx + CELL / 4, gy + CELL / 4)
        ctx.lineTo(gx, gy + CELL / 2 - 2)
        ctx.lineTo(gx - CELL / 4, gy + CELL / 4)
        ctx.lineTo(gx - CELL / 2 + 2, gy + CELL / 2 - 2)
        ctx.closePath()
        ctx.fill()
        
        // Ojos
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(gx - 4, gy - 3, 3.5, 0, Math.PI * 2)
        ctx.arc(gx + 4, gy - 3, 3.5, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.fillStyle = '#000080'
        ctx.beginPath()
        ctx.arc(gx - 4 + g.lastDir[0] * 1.5, gy - 3 + g.lastDir[1] * 1.5, 2, 0, Math.PI * 2)
        ctx.arc(gx + 4 + g.lastDir[0] * 1.5, gy - 3 + g.lastDir[1] * 1.5, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Dibujar Pac-Man
      ctx.fillStyle = '#FFFF00'
      let rotation = 0
      if (pacman.dx > 0) rotation = 0
      else if (pacman.dx < 0) rotation = Math.PI
      else if (pacman.dy < 0) rotation = -Math.PI / 2
      else if (pacman.dy > 0) rotation = Math.PI / 2

      const startAngle = rotation + pacman.mouth * Math.PI
      const endAngle = rotation + 2 * Math.PI - pacman.mouth * Math.PI
      const centerX = pacman.x * CELL + CELL / 2
      const centerY = pacman.y * CELL + CELL / 2
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, CELL / 2 - 2, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
      
      // Ojo de Pac-Man
      if (pacman.dx !== 0 || pacman.dy !== 0) {
        ctx.fillStyle = 'black'
        ctx.beginPath()
        let eyeX = centerX
        let eyeY = centerY - 5
        if (pacman.dx > 0) eyeX += 3
        else if (pacman.dx < 0) eyeX -= 3
        if (pacman.dy > 0) eyeY += 8
        else if (pacman.dy < 0) eyeY -= 3
        ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let rafId: number | null = null
    const loop = () => {
      update()
      draw()
      if (!gameOver) rafId = requestAnimationFrame(loop)
    }

    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault()
      }

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

    window.addEventListener('keydown', handleKey)
    loop()

    return () => {
      window.removeEventListener('keydown', handleKey)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [gameOver, won])

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white select-none overflow-hidden">
      <h1 className="text-3xl font-bold mb-2 text-yellow-400 tracking-widest">{t('pacman.title')}</h1>
      <div className="flex gap-6 mb-2">
        <p className="text-gray-300">{t('pacman.score')}: {score}</p>
        <p className="text-gray-300">{t('pacman.lives')}: {lives}</p>
        <p className="text-red-400 font-bold">{t('pacman.cherries')}: {cherries}/3 🍒</p>
      </div>

      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        className="border-4 border-blue-500 rounded-lg shadow-[0_0_30px_#00f6ff]"
      />

      <p className="mt-4 text-gray-400 text-sm animate-pulse">
        {t('pacman.instructions')}
      </p>

      {cherries === 3 && !gameOver && (
        <button
          
          onClick={() => router.push('/galeria')}
          className="mt-4 px-8 py-4 text-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-full hover:scale-110 transition-all shadow-lg animate-bounce"
        >
          {t('pacman.galleryButton')}
        </button>
      )}

      {won && (
        <div className="mt-6 text-center">
          <p className="text-green-400 text-2xl mb-4 animate-bounce">¡GANASTE! 🎉</p>
          {cherries === 3 && (
            <p className="text-pink-400 text-lg mb-4">¡Obtuviste todas las cerezas! 🍒🍒🍒</p>
          )}
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            {t('pacman.playAgain')}
          </button>
        </div>
      )}

      {gameOver && !won && (
        <div className="mt-6 text-center">
          <p className="text-red-400 text-2xl mb-4">GAME OVER 👻</p>
          <p className="text-gray-400 mb-4">Cerezas conseguidas: {cherries}/3 🍒</p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            {t('pacman.retry')}
          </button>
        </div>
      )}
    </div>
  )
}