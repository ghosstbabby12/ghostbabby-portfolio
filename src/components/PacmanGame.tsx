'use client'

import { useI18n, useTheme } from "@/app/providers"
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const CELL = 20
const ROWS = 22
const COLS = 28
const SPEED = 0.1

// Clase Vector2D para operaciones vectoriales
class Vector2D {
  constructor(public x: number, public y: number) {}

  add(other: Vector2D): Vector2D {
    return new Vector2D(this.x + other.x, this.y + other.y)
  }

  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar)
  }

  distanceTo(other: Vector2D): number {
    const dx = this.x - other.x
    const dy = this.y - other.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  normalize(): Vector2D {
    const mag = Math.sqrt(this.x * this.x + this.y * this.y)
    if (mag === 0) return new Vector2D(0, 0)
    return new Vector2D(this.x / mag, this.y / mag)
  }

  clone(): Vector2D {
    return new Vector2D(this.x, this.y)
  }

  equals(other: Vector2D): boolean {
    return this.x === other.x && this.y === other.y
  }

  static zero(): Vector2D {
    return new Vector2D(0, 0)
  }

  static up(): Vector2D {
    return new Vector2D(0, -1)
  }

  static down(): Vector2D {
    return new Vector2D(0, 1)
  }

  static left(): Vector2D {
    return new Vector2D(-1, 0)
  }

  static right(): Vector2D {
    return new Vector2D(1, 0)
  }
}

export default function PacmanGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [cherries, setCherries] = useState(0)
  const router = useRouter()
  const { t } = useI18n()
  const { theme } = useTheme()

  const map = [
    "----------------------------",
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

    // Pac-Man usando vectores
    let pacman = {
      position: new Vector2D(13, 17),
      velocity: Vector2D.right(),
      nextVelocity: Vector2D.right(),
      mouth: 0,
      mouthOpening: true,
    }

    type Ghost = { 
      position: Vector2D
      velocity: Vector2D
      color: string
      startPosition: Vector2D
    }
    
    const ghosts: Ghost[] = [
      {
        position: new Vector2D(13, 11),
        velocity: Vector2D.left(),
        color: '#FF0000',
        startPosition: new Vector2D(13, 11)
      },
      {
        position: new Vector2D(14, 11),
        velocity: Vector2D.right(),
        color: '#FFB8FF',
        startPosition: new Vector2D(14, 11)
      },
      {
        position: new Vector2D(12, 11),
        velocity: Vector2D.down(),
        color: '#00FFFF',
        startPosition: new Vector2D(12, 11)
      },
      {
        position: new Vector2D(15, 11),
        velocity: Vector2D.up(),
        color: '#FFB851',
        startPosition: new Vector2D(15, 11)
      }
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

    // Verificar si una posición es válida
    const canMove = (position: Vector2D): boolean => {
      const row = Math.floor(position.y)
      const col = Math.floor(position.x)
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false
      const tile = map[row]?.[col]
      return tile !== '#' && tile !== '-' && tile !== undefined
    }

    // Obtener todas las direcciones posibles
    const getPossibleDirections = (): Vector2D[] => {
      return [
        Vector2D.right(),
        Vector2D.left(),
        Vector2D.down(),
        Vector2D.up()
      ]
    }

    // Movimiento inteligente de fantasmas usando vectores
    const moveGhost = (ghost: Ghost) => {
      const directions = getPossibleDirections()
      
      type DirectionScore = {
        direction: Vector2D
        score: number
      }
      
      const validDirections: DirectionScore[] = []
      
      for (const direction of directions) {
        const testPosition = ghost.position.add(direction.multiply(SPEED))
        
        if (canMove(testPosition)) {
          // Evitar retroceso inmediato
          const isBackward = direction.x === -ghost.velocity.x && direction.y === -ghost.velocity.y
          
          // Calcular distancia a Pac-Man usando vectores
          const distanceToPacman = testPosition.distanceTo(pacman.position)
          
          // 20% persecución, 80% exploración aleatoria
          let score = -distanceToPacman * 0.2 + Math.random() * 25
          
          // Penalizar retroceso pero no eliminarlo completamente
          if (isBackward) score -= 10
          
          validDirections.push({ direction, score })
        }
      }
      
      if (validDirections.length > 0) {
        // Ordenar por score y elegir la mejor dirección
        validDirections.sort((a, b) => b.score - a.score)
        const bestDirection = validDirections[0].direction
        ghost.velocity = bestDirection.clone()
        ghost.position = ghost.position.add(bestDirection.multiply(SPEED))
      }
    }

    const resetPositionsAfterHit = () => {
      pacman.position = new Vector2D(13, 17)
      pacman.velocity = Vector2D.right()
      pacman.nextVelocity = Vector2D.right()
      
      ghosts.forEach(ghost => { 
        ghost.position = ghost.startPosition.clone()
        ghost.velocity = Vector2D.up()
      })
    }

    let pausedTicks = 0

    const update = () => {
      if (pausedTicks > 0) {
        pausedTicks--
        return
      }

      // Intentar cambiar dirección de Pac-Man
      const testNextPosition = pacman.position.add(pacman.nextVelocity.multiply(SPEED))
      if (canMove(testNextPosition)) {
        pacman.velocity = pacman.nextVelocity.clone()
      }

      // Mover Pac-Man en la dirección actual
      const newPosition = pacman.position.add(pacman.velocity.multiply(SPEED))
      if (canMove(newPosition)) {
        pacman.position = newPosition
      }

      // Comer puntos
      const cellRow = Math.floor(pacman.position.y)
      const cellCol = Math.floor(pacman.position.x)
      const key = `${cellRow},${cellCol}`
      
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
      ghosts.forEach(ghost => {
        // 30% cambiar dirección, 70% seguir
        if (Math.random() < 0.3) {
          moveGhost(ghost)
        } else {
          const attemptPosition = ghost.position.add(ghost.velocity.multiply(SPEED))
          if (canMove(attemptPosition)) {
            ghost.position = attemptPosition
          } else {
            // Si choca con pared, buscar nueva dirección
            moveGhost(ghost)
          }
        }
      })

      // Colisión con fantasmas usando distancia vectorial
      for (const ghost of ghosts) {
        const distance = ghost.position.distanceTo(pacman.position)
        if (distance < 0.6) {
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
      // Fondo siempre oscuro para el laberinto
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Dibujar mapa - siempre en modo oscuro
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const tile = map[r]?.[c] ?? '#'
          if (tile === '#') {
            // Muros azules/cyan
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

      // Dibujar fantasmas usando vectores
      for (const ghost of ghosts) {
        const screenPosition = new Vector2D(
          ghost.position.x * CELL + CELL / 2,
          ghost.position.y * CELL + CELL / 2
        )
        
        ctx.fillStyle = ghost.color
        ctx.beginPath()
        ctx.arc(screenPosition.x, screenPosition.y - 3, CELL / 2 - 2, Math.PI, 0)
        ctx.lineTo(screenPosition.x + CELL / 2 - 2, screenPosition.y + CELL / 2 - 2)
        ctx.lineTo(screenPosition.x + CELL / 4, screenPosition.y + CELL / 4)
        ctx.lineTo(screenPosition.x, screenPosition.y + CELL / 2 - 2)
        ctx.lineTo(screenPosition.x - CELL / 4, screenPosition.y + CELL / 4)
        ctx.lineTo(screenPosition.x - CELL / 2 + 2, screenPosition.y + CELL / 2 - 2)
        ctx.closePath()
        ctx.fill()
        
        // Ojos
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(screenPosition.x - 4, screenPosition.y - 3, 3.5, 0, Math.PI * 2)
        ctx.arc(screenPosition.x + 4, screenPosition.y - 3, 3.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Pupilas mirando en dirección de movimiento
        ctx.fillStyle = '#000080'
        ctx.beginPath()
        ctx.arc(
          screenPosition.x - 4 + ghost.velocity.x * 1.5,
          screenPosition.y - 3 + ghost.velocity.y * 1.5,
          2, 0, Math.PI * 2
        )
        ctx.arc(
          screenPosition.x + 4 + ghost.velocity.x * 1.5,
          screenPosition.y - 3 + ghost.velocity.y * 1.5,
          2, 0, Math.PI * 2
        )
        ctx.fill()
      }

      // Dibujar Pac-Man usando vectores para rotación
      ctx.fillStyle = '#FFFF00'
      let rotation = 0
      if (pacman.velocity.x > 0) rotation = 0
      else if (pacman.velocity.x < 0) rotation = Math.PI
      else if (pacman.velocity.y < 0) rotation = -Math.PI / 2
      else if (pacman.velocity.y > 0) rotation = Math.PI / 2

      const startAngle = rotation + pacman.mouth * Math.PI
      const endAngle = rotation + 2 * Math.PI - pacman.mouth * Math.PI
      const centerX = pacman.position.x * CELL + CELL / 2
      const centerY = pacman.position.y * CELL + CELL / 2
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, CELL / 2 - 2, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
      
      // Ojo de Pac-Man
      if (!pacman.velocity.equals(Vector2D.zero())) {
        ctx.fillStyle = 'black'
        ctx.beginPath()
        let eyeOffset = new Vector2D(0, -5)
        
        if (pacman.velocity.x > 0) eyeOffset.x += 3
        else if (pacman.velocity.x < 0) eyeOffset.x -= 3
        if (pacman.velocity.y > 0) eyeOffset.y += 8
        else if (pacman.velocity.y < 0) eyeOffset.y -= 3
        
        ctx.arc(centerX + eyeOffset.x, centerY + eyeOffset.y, 2, 0, Math.PI * 2)
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

      const directionMap: Record<string, Vector2D> = {
        ArrowUp: Vector2D.up(),
        ArrowDown: Vector2D.down(),
        ArrowLeft: Vector2D.left(),
        ArrowRight: Vector2D.right(),
      }
      
      const newDirection = directionMap[e.key]
      if (newDirection) {
        pacman.nextVelocity = newDirection.clone()
      }
    }

    window.addEventListener('keydown', handleKey)
    loop()

    return () => {
      window.removeEventListener('keydown', handleKey)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [gameOver, won, theme])

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen select-none overflow-hidden ${
      theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      <h1 className={`text-3xl font-bold mb-2 tracking-widest ${
        theme === 'light' ? 'text-pink-600' : 'text-yellow-400'
      }`}>{t('pacman.title')}</h1>
      <div className="flex gap-6 mb-2">
        <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{t('pacman.score')}: {score}</p>
        <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{t('pacman.lives')}: {lives}</p>
        <p className={`font-bold ${theme === 'light' ? 'text-pink-600' : 'text-red-400'}`}>{t('pacman.cherries')}: {cherries}/3 🍒</p>
      </div>

      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        className={theme === 'light'
          ? 'border-4 border-pink-400 rounded-lg shadow-[0_0_30px_rgba(255,182,193,0.5)]'
          : 'border-4 border-blue-500 rounded-lg shadow-[0_0_30px_#00f6ff]'
        }
      />

      <p className={`mt-4 text-sm animate-pulse ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        {t('pacman.instructions')}
      </p>

      {cherries === 3 && !gameOver && (
        <button
          onClick={() => router.push('/galeria')}
          className={theme === 'light'
            ? 'mt-4 px-8 py-4 text-xl bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white rounded-full hover:scale-110 transition-all shadow-lg animate-bounce'
            : 'mt-4 px-8 py-4 text-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white rounded-full hover:scale-110 transition-all shadow-lg animate-bounce'
          }
        >
          {t('pacman.galleryButton')}
        </button>
      )}

      {won && (
        <div className="mt-6 text-center">
          <p className="text-green-400 text-2xl mb-4 animate-bounce">{t('pacman.won')}</p>
          {cherries === 3 && (
            <p className="text-pink-400 text-lg mb-4">{t('pacman.cherries')}: {cherries}/3 🍒</p>
          )}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              {t('pacman.playAgain')}
            </button>

            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition transform"
            >
              {t('gallery.back')}
            </button>
          </div>
        </div>
      )}

      {gameOver && !won && (
        <div className="mt-6 text-center">
          <p className="text-red-400 text-2xl mb-4">{t('pacman.gameOver')}</p>
          <p className="text-gray-400 mb-4">{t('pacman.cherries')}: {cherries}/3 🍒</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              {t('pacman.retry')}
            </button>

            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition transform"
            >
              {t('gallery.back')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}