'use client'

import { useI18n, useTheme } from "@/app/providers"
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const CELL = 20
const ROWS = 22
const COLS = 28
const SPEED = 0.12
const POWER_UP_DURATION = 300

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
  const [powerUpActive, setPowerUpActive] = useState(false)
  const router = useRouter()
  const { t } = useI18n()
  const { actualTheme } = useTheme()

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

    // Pac-Man - posición inicial en pasillo libre
    let pacman = {
      position: new Vector2D(14, 14),
      velocity: Vector2D.right(),
      nextVelocity: Vector2D.right(),
      mouth: 0,
      mouthOpening: true,
    }

    type GhostType = 'blinky' | 'pinky' | 'inky' | 'clyde'
    
    type Ghost = { 
      position: Vector2D
      velocity: Vector2D
      color: string
      startPosition: Vector2D
      eaten: boolean
      respawnTimer: number
      type: GhostType
      cornerTarget: Vector2D
    }
    
    const ghosts: Ghost[] = [
      {
        position: new Vector2D(13, 10),
        velocity: Vector2D.left(),
        color: '#FF0000', // Rojo - Blinky (Shadow)
        startPosition: new Vector2D(13, 10),
        eaten: false,
        respawnTimer: 0,
        type: 'blinky',
        cornerTarget: new Vector2D(COLS - 2, 1)
      },
      {
        position: new Vector2D(14, 10),
        velocity: Vector2D.right(),
        color: '#FFB8FF', // Rosa - Pinky (Speedy)
        startPosition: new Vector2D(14, 10),
        eaten: false,
        respawnTimer: 0,
        type: 'pinky',
        cornerTarget: new Vector2D(1, 1)
      },
      {
        position: new Vector2D(12, 10),
        velocity: Vector2D.down(),
        color: '#00FFFF', // Cian - Inky (Bashful)
        startPosition: new Vector2D(12, 10),
        eaten: false,
        respawnTimer: 0,
        type: 'inky',
        cornerTarget: new Vector2D(COLS - 2, ROWS - 2)
      },
      {
        position: new Vector2D(15, 10),
        velocity: Vector2D.up(),
        color: '#FFB851', // Naranja - Clyde (Pokey)
        startPosition: new Vector2D(15, 10),
        eaten: false,
        respawnTimer: 0,
        type: 'clyde',
        cornerTarget: new Vector2D(1, ROWS - 2)
      }
    ]

    let pellets = new Set<string>()
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (map[r][c] === '.') pellets.add(`${r},${c}`)
      }
    }

    const cherryPositions = new Set<string>([
      '1,1',
      '1,26',
      '9,14'
    ])

    let powerUpTimer = 0
    let isFlashing = false
    const initialPelletCount = pellets.size

    // Verificar si una posición es válida
    const canMove = (position: Vector2D): boolean => {
      const row = Math.floor(position.y)
      const col = Math.floor(position.x)
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return false
      const tile = map[row]?.[col]
      return tile !== '#' && tile !== '-' && tile !== undefined
    }

    const getPossibleDirections = (): Vector2D[] => {
      return [
        Vector2D.right(),
        Vector2D.left(),
        Vector2D.down(),
        Vector2D.up()
      ]
    }

    // Obtener el objetivo de cada fantasma según su personalidad
    const getGhostTarget = (ghost: Ghost, isPowerUpActive: boolean): Vector2D => {
      if (isPowerUpActive) {
        // En modo asustado, huir de Pac-Man
        const awayVector = ghost.position.add(
          new Vector2D(
            ghost.position.x - pacman.position.x,
            ghost.position.y - pacman.position.y
          )
        )
        return awayVector
      }

      switch (ghost.type) {
        case 'blinky': {
          // BLINKY (Rojo - Shadow): Persigue directamente a Pac-Man
          // Cruise Elroy: se vuelve más rápido cuando quedan pocos puntos
          const remainingPellets = pellets.size
          const pelletPercentage = remainingPellets / initialPelletCount
          
          // Si quedan menos del 50% de puntos, es más agresivo
          const isCruiseElroy = pelletPercentage < 0.5
          
          return pacman.position.clone()
        }

        case 'pinky': {
          // PINKY (Rosa - Speedy): Emboscadora, apunta 4 casillas adelante de Pac-Man
          const ahead = 4
          let targetPos = pacman.position.clone()
          
          if (pacman.velocity.x > 0) {
            targetPos.x += ahead
          } else if (pacman.velocity.x < 0) {
            targetPos.x -= ahead
          } else if (pacman.velocity.y > 0) {
            targetPos.y += ahead
          } else if (pacman.velocity.y < 0) {
            targetPos.y -= ahead
            // Bug original: también se mueve a la izquierda
            targetPos.x -= ahead
          }
          
          return targetPos
        }

        case 'inky': {
          // INKY (Cian - Bashful): Usa posición de Pac-Man Y Blinky para crear emboscada
          const blinky = ghosts.find(g => g.type === 'blinky')
          if (!blinky) return pacman.position.clone()
          
          // Punto 2 casillas adelante de Pac-Man
          const ahead = 2
          let intermediatePos = pacman.position.clone()
          
          if (pacman.velocity.x > 0) {
            intermediatePos.x += ahead
          } else if (pacman.velocity.x < 0) {
            intermediatePos.x -= ahead
          } else if (pacman.velocity.y > 0) {
            intermediatePos.y += ahead
          } else if (pacman.velocity.y < 0) {
            intermediatePos.y -= ahead
          }
          
          // Vector desde Blinky a ese punto, duplicado
          const vectorX = intermediatePos.x - blinky.position.x
          const vectorY = intermediatePos.y - blinky.position.y
          
          return new Vector2D(
            blinky.position.x + vectorX * 2,
            blinky.position.y + vectorY * 2
          )
        }

        case 'clyde': {
          // CLYDE (Naranja - Pokey): Persigue si está lejos, huye si está cerca
          const distanceToPacman = ghost.position.distanceTo(pacman.position)
          
          if (distanceToPacman > 8) {
            // Lejos: persigue a Pac-Man
            return pacman.position.clone()
          } else {
            // Cerca: huye a su esquina
            return ghost.cornerTarget.clone()
          }
        }

        default:
          return pacman.position.clone()
      }
    }

    const moveGhost = (ghost: Ghost, isPowerUpActive: boolean) => {
      const directions = getPossibleDirections()
      const target = getGhostTarget(ghost, isPowerUpActive)
      
      type DirectionScore = {
        direction: Vector2D
        score: number
      }
      
      const validDirections: DirectionScore[] = []
      
      for (const direction of directions) {
        const testPosition = ghost.position.add(direction.multiply(SPEED * 2))
        
        if (canMove(testPosition)) {
          const isBackward = direction.x === -ghost.velocity.x && direction.y === -ghost.velocity.y
          const distanceToTarget = testPosition.distanceTo(target)
          
          let score = -distanceToTarget
          
          // En modo normal, usar la IA específica del fantasma
          if (!isPowerUpActive) {
            // Blinky es más directo (menos aleatorio)
            if (ghost.type === 'blinky') {
              score += Math.random() * 5
              
              // Cruise Elroy: más agresivo con pocos puntos
              const pelletPercentage = pellets.size / initialPelletCount
              if (pelletPercentage < 0.5) {
                score *= 1.5 // Prioriza más el objetivo
              }
            } else {
              score += Math.random() * 15
            }
          } else {
            // En modo asustado, más errático
            score += Math.random() * 20
          }
          
          // Penalizar retroceso
          if (isBackward) score -= 20
          
          validDirections.push({ direction, score })
        }
      }
      
      if (validDirections.length > 0) {
        validDirections.sort((a, b) => b.score - a.score)
        ghost.velocity = validDirections[0].direction.clone()
      }
    }

    const resetPositionsAfterHit = () => {
      pacman.position = new Vector2D(14, 14)
      pacman.velocity = Vector2D.right()
      pacman.nextVelocity = Vector2D.right()
      
      ghosts.forEach(ghost => { 
        if (!ghost.eaten) {
          ghost.position = ghost.startPosition.clone()
          ghost.velocity = Vector2D.up()
        }
      })
    }

    const respawnGhost = (ghost: Ghost) => {
      ghost.position = ghost.startPosition.clone()
      ghost.velocity = Vector2D.up()
      ghost.eaten = false
      ghost.respawnTimer = 0
    }

    let pausedTicks = 0

    const update = () => {
      if (pausedTicks > 0) {
        pausedTicks--
        return
      }

      // === PACMAN MOVEMENT ===
      
      // Intentar cambiar dirección
      const testNextPosition = pacman.position.add(pacman.nextVelocity.multiply(SPEED))
      if (canMove(testNextPosition)) {
        pacman.velocity = pacman.nextVelocity.clone()
      }

      // Mover Pac-Man
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

      // Comer cerezas
      if (cherryPositions.has(key)) {
        cherryPositions.delete(key)
        setCherries(prev => prev + 1)
        setScore(prev => prev + 50)
        powerUpTimer = POWER_UP_DURATION
        setPowerUpActive(true)
      }

      // Actualizar power-up timer
      if (powerUpTimer > 0) {
        powerUpTimer--
        isFlashing = powerUpTimer < 120 && Math.floor(powerUpTimer / 10) % 2 === 0
        
        if (powerUpTimer === 0) {
          setPowerUpActive(false)
          isFlashing = false
        }
      }

      // Animación de boca
      pacman.mouth += pacman.mouthOpening ? 0.05 : -0.05
      if (pacman.mouth > 0.3) pacman.mouthOpening = false
      if (pacman.mouth < 0) pacman.mouthOpening = true

      // === GHOST MOVEMENT ===
      const isPowerUpActive = powerUpTimer > 0
      
      ghosts.forEach(ghost => {
        if (ghost.eaten) {
          ghost.respawnTimer--
          if (ghost.respawnTimer <= 0) {
            respawnGhost(ghost)
          }
          return
        }

        // Velocidad base según tipo
        let ghostSpeed = SPEED * 0.9
        
        // Blinky Cruise Elroy: más rápido con pocos puntos
        if (ghost.type === 'blinky') {
          const pelletPercentage = pellets.size / initialPelletCount
          if (pelletPercentage < 0.5) {
            ghostSpeed = SPEED * 1.0 // Igual velocidad que Pac-Man
          }
          if (pelletPercentage < 0.25) {
            ghostSpeed = SPEED * 1.05 // Más rápido que Pac-Man
          }
        }

        // Cambiar dirección con frecuencia variable según tipo
        let changeChance = 0.02
        if (ghost.type === 'blinky') changeChance = 0.025 // Más agresivo
        if (ghost.type === 'inky') changeChance = 0.015 // Más errático
        if (ghost.type === 'clyde') changeChance = 0.03 // Más cambiante
        
        if (Math.random() < changeChance) {
          moveGhost(ghost, isPowerUpActive)
        }

        // Mover fantasma
        const attemptPosition = ghost.position.add(ghost.velocity.multiply(ghostSpeed))
        if (canMove(attemptPosition)) {
          ghost.position = attemptPosition
        } else {
          // Buscar nueva dirección si choca
          moveGhost(ghost, isPowerUpActive)
        }
      })

      // Colisión con fantasmas
      for (const ghost of ghosts) {
        if (ghost.eaten) continue
        
        const distance = ghost.position.distanceTo(pacman.position)
        if (distance < 0.7) {
          if (powerUpTimer > 0) {
            ghost.eaten = true
            ghost.respawnTimer = 180
            setScore(prev => prev + 200)
          } else {
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
      }

      // Victoria
      if (pellets.size === 0) {
        setWon(true)
        setGameOver(true)
      }
    }

    const draw = () => {
      // Fondo
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

      // Dibujar cerezas
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
      for (const ghost of ghosts) {
        if (ghost.eaten) continue

        const screenX = ghost.position.x * CELL
        const screenY = ghost.position.y * CELL
        
        let ghostColor = ghost.color
        if (powerUpTimer > 0) {
          ghostColor = isFlashing ? 'white' : '#0066FF'
        }
        
        ctx.fillStyle = ghostColor
        ctx.beginPath()
        ctx.arc(screenX, screenY - 3, CELL / 2 - 2, Math.PI, 0)
        ctx.lineTo(screenX + CELL / 2 - 2, screenY + CELL / 2 - 2)
        ctx.lineTo(screenX + CELL / 4, screenY + CELL / 4)
        ctx.lineTo(screenX, screenY + CELL / 2 - 2)
        ctx.lineTo(screenX - CELL / 4, screenY + CELL / 4)
        ctx.lineTo(screenX - CELL / 2 + 2, screenY + CELL / 2 - 2)
        ctx.closePath()
        ctx.fill()
        
        // Ojos
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(screenX - 4, screenY - 3, 3.5, 0, Math.PI * 2)
        ctx.arc(screenX + 4, screenY - 3, 3.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Pupilas
        if (powerUpTimer > 0 && !isFlashing) {
          ctx.fillStyle = '#FF0000'
          ctx.beginPath()
          ctx.arc(screenX - 4, screenY - 5, 2, 0, Math.PI * 2)
          ctx.arc(screenX + 4, screenY - 5, 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = '#000080'
          ctx.beginPath()
          ctx.arc(screenX - 4 + ghost.velocity.x * 1.5, screenY - 3 + ghost.velocity.y * 1.5, 2, 0, Math.PI * 2)
          ctx.arc(screenX + 4 + ghost.velocity.x * 1.5, screenY - 3 + ghost.velocity.y * 1.5, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Dibujar Pac-Man
      ctx.fillStyle = '#FFFF00'
      let rotation = 0
      if (pacman.velocity.x > 0) rotation = 0
      else if (pacman.velocity.x < 0) rotation = Math.PI
      else if (pacman.velocity.y < 0) rotation = -Math.PI / 2
      else if (pacman.velocity.y > 0) rotation = Math.PI / 2

      const startAngle = rotation + pacman.mouth * Math.PI
      const endAngle = rotation + 2 * Math.PI - pacman.mouth * Math.PI
      const centerX = pacman.position.x * CELL
      const centerY = pacman.position.y * CELL
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, CELL / 2 - 2, startAngle, endAngle)
      ctx.closePath()
      ctx.fill()
      
      // Ojo
      if (!pacman.velocity.equals(Vector2D.zero())) {
        ctx.fillStyle = 'black'
        ctx.beginPath()
        let eyeOffsetX = 0
        let eyeOffsetY = -5
        
        if (pacman.velocity.x > 0) eyeOffsetX += 3
        else if (pacman.velocity.x < 0) eyeOffsetX -= 3
        if (pacman.velocity.y > 0) eyeOffsetY += 8
        else if (pacman.velocity.y < 0) eyeOffsetY -= 3
        
        ctx.arc(centerX + eyeOffsetX, centerY + eyeOffsetY, 2, 0, Math.PI * 2)
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
  }, [gameOver, won, actualTheme])

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen select-none overflow-hidden ${
      actualTheme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      <h1 className={`text-3xl font-bold mb-2 tracking-widest ${
        actualTheme === 'light' ? 'text-pink-600' : 'text-yellow-400'
      }`}>{t('pacman.title')}</h1>
      <div className="flex gap-6 mb-2">
        <p className={actualTheme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{t('pacman.score')}: {score}</p>
        <p className={actualTheme === 'light' ? 'text-gray-700' : 'text-gray-300'}>{t('pacman.lives')}: {lives}</p>
        <p className={`font-bold ${actualTheme === 'light' ? 'text-pink-600' : 'text-red-400'}`}>{t('pacman.cherries')}: {cherries}/3 🍒</p>
        {powerUpActive && (
          <p className="font-bold text-blue-400 animate-pulse">⚡ POWER-UP ACTIVO ⚡</p>
        )}
      </div>

      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        className={actualTheme === 'light'
          ? 'border-4 border-pink-400 rounded-lg shadow-[0_0_30px_rgba(255,182,193,0.5)]'
          : 'border-4 border-blue-500 rounded-lg shadow-[0_0_30px_#00f6ff]'
        }
      />

      <p className={`mt-4 text-sm animate-pulse ${actualTheme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
        {t('pacman.instructions')}
      </p>
      
      <div className={`mt-2 text-xs ${actualTheme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
        <p>🍒 Come las cerezas para poder comer a los fantasmas</p>
        <p className="mt-1">
          <span className="text-red-500">●</span> Blinky (Rojo) - Persigue directamente | 
          <span className="text-pink-400"> ●</span> Pinky (Rosa) - Emboscador | 
          <span className="text-cyan-400"> ●</span> Inky (Cian) - Impredecible | 
          <span className="text-orange-400"> ●</span> Clyde (Naranja) - Errático
        </p>
      </div>

      {cherries >= 3 && (
        <button
          onClick={() => router.push('/galeria')}
          className={actualTheme === 'light'
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
              className={`px-6 py-3 rounded-lg hover:scale-105 transition transform ${actualTheme === 'light' ? 'bg-pink-100 text-black border-2 border-pink-300' : 'bg-yellow-400 text-black'}`}
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