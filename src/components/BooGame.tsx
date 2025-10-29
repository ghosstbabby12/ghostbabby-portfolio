'use client'

import { useEffect, useRef, useState } from 'react'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 4

interface Player {
  x: number
  y: number
  vx: number
  vy: number
  width: number
  height: number
  onGround: boolean
  direction: number
}

interface Boo {
  x: number
  y: number
  vx: number
  vy: number
  hiding: boolean
  size: number
}

interface Coin {
  id: number
  x: number
  y: number
  collected: boolean
  animation: number
}

interface Platform {
  x: number
  y: number
  width: number
  height: number
}

interface TestimonialCard {
  id: number
  title: string
  text: string
  collected: boolean
  avatar: string
  role: string
}

export default function MarioGhostHouse() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(300)
  const [lives, setLives] = useState(3)
  const [player, setPlayer] = useState<Player>({
    x: 100,
    y: 400,
    vx: 0,
    vy: 0,
    width: 32,
    height: 40,
    onGround: false,
    direction: 1
  })
  const [boos, setBoos] = useState<Boo[]>([])
  const [coins, setCoins] = useState<Coin[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [keys, setKeys] = useState({ left: false, right: false, jump: false })
  const [cameraX, setCameraX] = useState(0)
  const animationFrame = useRef<number>()
  const [invincible, setInvincible] = useState(false)
  const [testimonials, setTestimonials] = useState<TestimonialCard[]>([])
  const [showCardPopup, setShowCardPopup] = useState<TestimonialCard | null>(null)

  const TESTIMONIAL_STORAGE_KEY = 'arcade_testimonials_v1'

  const testimonialPool: TestimonialCard[] = [
    { id: 0, title: 'Ana García', role: 'CEO', text: 'Increíble experiencia de usuario 👏', collected: false, avatar: '👩‍💼' },
    { id: 1, title: 'Luis Martínez', role: 'Developer', text: '¡Código limpio y eficiente!', collected: false, avatar: '👨‍💻' },
    { id: 2, title: 'María López', role: 'Designer', text: 'Diseño impecable y moderno 🎨', collected: false, avatar: '👩‍🎨' },
    { id: 3, title: 'Diego Ruiz', role: 'Manager', text: 'Profesionalismo en cada detalle', collected: false, avatar: '👨‍💼' },
    { id: 4, title: 'Sofía Torres', role: 'Marketing', text: 'Creatividad e innovación constante 🎵', collected: false, avatar: '👩‍🚀' },
    { id: 5, title: 'Pablo Sánchez', role: 'Founder', text: 'Excelente trabajo en equipo', collected: false, avatar: '🧑‍💼' },
    { id: 6, title: 'Clara Jiménez', role: 'UX Designer', text: 'Interfaz intuitiva y atractiva 😄', collected: false, avatar: '👩‍🔬' },
    { id: 7, title: 'Jorge Castro', role: 'Architect', text: 'Arquitectura sólida y escalable', collected: false, avatar: '👨‍🏭' },
    { id: 8, title: 'Irene Vega', role: 'Consultant', text: 'Perfecto para el portfolio profesional', collected: false, avatar: '👩‍⚕️' },
    { id: 9, title: 'Raúl Mendoza', role: 'Entrepreneur', text: 'Superó todas nuestras expectativas 🙂', collected: false, avatar: '👨‍🚀' },
  ]

  useEffect(() => {
    const initialPlatforms: Platform[] = [
      { x: 0, y: 500, width: 400, height: 100 },
      { x: 500, y: 500, width: 400, height: 100 },
      { x: 1000, y: 500, width: 400, height: 100 },
      { x: 1500, y: 500, width: 400, height: 100 },
      { x: 200, y: 380, width: 120, height: 20 },
      { x: 400, y: 320, width: 120, height: 20 },
      { x: 600, y: 260, width: 120, height: 20 },
      { x: 800, y: 320, width: 120, height: 20 },
      { x: 1000, y: 380, width: 120, height: 20 },
      { x: 1200, y: 320, width: 120, height: 20 },
      { x: 1400, y: 260, width: 120, height: 20 },
    ]
    setPlatforms(initialPlatforms)

    const initialBoos: Boo[] = [
      { x: 300, y: 300, vx: 0, vy: 0, hiding: false, size: 35 },
      { x: 600, y: 200, vx: 0, vy: 0, hiding: false, size: 35 },
      { x: 900, y: 350, vx: 0, vy: 0, hiding: false, size: 35 },
      { x: 1200, y: 250, vx: 0, vy: 0, hiding: false, size: 35 },
    ]
    setBoos(initialBoos)

    const initialCoins: Coin[] = [
      { id: 0, x: 260, y: 340, collected: false, animation: 0 },
      { id: 1, x: 460, y: 280, collected: false, animation: 0 },
      { id: 2, x: 660, y: 220, collected: false, animation: 0 },
      { id: 3, x: 860, y: 280, collected: false, animation: 0 },
      { id: 4, x: 1060, y: 340, collected: false, animation: 0 },
      { id: 5, x: 1260, y: 280, collected: false, animation: 0 },
      { id: 6, x: 1460, y: 220, collected: false, animation: 0 },
      { id: 7, x: 500, y: 450, collected: false, animation: 0 },
      { id: 8, x: 700, y: 450, collected: false, animation: 0 },
      { id: 9, x: 1100, y: 450, collected: false, animation: 0 },
    ]
    setCoins(initialCoins)

    try {
      const raw = localStorage.getItem(TESTIMONIAL_STORAGE_KEY)
      if (raw) {
        const saved: TestimonialCard[] = JSON.parse(raw)
        const merged = testimonialPool.map(p => {
          const found = saved.find(s => s.id === p.id)
          return found ? { ...p, collected: found.collected } : p
        })
        setTestimonials(merged)
      } else {
        setTestimonials(testimonialPool.map(p => ({ ...p })))
      }
    } catch {
      setTestimonials(testimonialPool.map(p => ({ ...p })))
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(TESTIMONIAL_STORAGE_KEY, JSON.stringify(testimonials))
    } catch {}
  }, [testimonials])

  useEffect(() => {
    if (!gameStarted || gameOver) return
    const timer = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          setGameOver(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStarted, gameOver])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setKeys(k => ({ ...k, left: true }))
      if (e.key === 'ArrowRight') setKeys(k => ({ ...k, right: true }))
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault()
        setKeys(k => ({ ...k, jump: true }))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setKeys(k => ({ ...k, left: false }))
      if (e.key === 'ArrowRight') setKeys(k => ({ ...k, right: false }))
      if (e.key === ' ' || e.key === 'ArrowUp') setKeys(k => ({ ...k, jump: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let animTime = 0

    const drawMario = (x: number, y: number, dir: number) => {
      const screenX = x - cameraX
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.beginPath()
      ctx.ellipse(screenX + 16, y + 40, 12, 4, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#FF0000'
      ctx.fillRect(screenX + 8, y + 16, 16, 16)
      ctx.fillStyle = '#0000FF'
      ctx.fillRect(screenX + 6, y + 18, 20, 14)
      ctx.fillStyle = '#FFD700'
      ctx.beginPath()
      ctx.arc(screenX + 12, y + 22, 2, 0, Math.PI * 2)
      ctx.arc(screenX + 20, y + 22, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#FDBCB4'
      ctx.beginPath()
      ctx.arc(screenX + 16, y + 10, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#FF0000'
      ctx.fillRect(screenX + 6, y + 2, 20, 8)
      ctx.beginPath()
      ctx.arc(screenX + 16, y + 6, 10, Math.PI, 0)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('M', screenX + 16, y + 8)
      ctx.fillStyle = '#000000'
      const eyeDir = dir > 0 ? 2 : -2
      ctx.fillRect(screenX + 12 + eyeDir, y + 10, 2, 2)
      ctx.fillRect(screenX + 18 + eyeDir, y + 10, 2, 2)
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(screenX + 10, y + 14, 12, 2)
      ctx.fillStyle = '#FDBCB4'
      ctx.fillRect(screenX + 4, y + 20, 4, 8)
      ctx.fillRect(screenX + 24, y + 20, 4, 8)
      ctx.fillStyle = '#0000FF'
      ctx.fillRect(screenX + 10, y + 32, 5, 8)
      ctx.fillRect(screenX + 17, y + 32, 5, 8)
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(screenX + 8, y + 38, 7, 4)
      ctx.fillRect(screenX + 17, y + 38, 7, 4)
    }

    const drawBoo = (x: number, y: number, hiding: boolean, size: number) => {
      const screenX = x - cameraX
      
      ctx.fillStyle = '#FFFFFF'
      ctx.shadowBlur = 15
      ctx.shadowColor = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(screenX, y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.arc(screenX + (i - 1) * 12, y + size + i * 8, size * 0.3 - i * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      if (hiding) {
        ctx.fillStyle = '#FFFFFF'
        ctx.beginPath()
        ctx.ellipse(screenX - 15, y, 8, 20, -0.3, 0, Math.PI * 2)
        ctx.ellipse(screenX + 15, y, 8, 20, 0.3, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillStyle = '#1a0033'
        ctx.beginPath()
        ctx.ellipse(screenX - 10, y - 5, 8, 12, 0, 0, Math.PI * 2)
        ctx.ellipse(screenX + 10, y - 5, 8, 12, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#FF1493'
        ctx.beginPath()
        ctx.arc(screenX - 10, y - 2, 4, 0, Math.PI * 2)
        ctx.arc(screenX + 10, y - 2, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#8B0000'
        ctx.beginPath()
        ctx.arc(screenX, y + 10, 15, 0, Math.PI)
        ctx.fill()
        ctx.fillStyle = '#FFFFFF'
        for (let i = 0; i < 4; i++) {
          ctx.beginPath()
          ctx.moveTo(screenX - 12 + i * 8, y + 10)
          ctx.lineTo(screenX - 8 + i * 8, y + 10)
          ctx.lineTo(screenX - 10 + i * 8, y + 18)
          ctx.fill()
        }
      }
    }

    const animate = () => {
      animTime += 0.016

      const bgGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
      bgGradient.addColorStop(0, '#1a0a2e')
      bgGradient.addColorStop(0.5, '#16213e')
      bgGradient.addColorStop(1, '#0f1419')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      ctx.strokeStyle = 'rgba(139, 69, 19, 0.2)'
      ctx.lineWidth = 2
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 15; j++) {
          const x = i * 40 - (cameraX % 40)
          const y = j * 40
          ctx.strokeRect(x, y, 40, 40)
        }
      }

      platforms.forEach(platform => {
        const screenX = platform.x - cameraX
        ctx.fillStyle = '#6B4423'
        ctx.fillRect(screenX, platform.y, platform.width, platform.height)
        ctx.strokeStyle = '#4A2F1A'
        ctx.lineWidth = 2
        for (let i = 0; i < platform.width / 40; i++) {
          for (let j = 0; j < platform.height / 40; j++) {
            ctx.strokeRect(screenX + i * 40, platform.y + j * 40, 40, 40)
            ctx.fillStyle = '#8B6432'
            ctx.fillRect(screenX + i * 40 + 5, platform.y + j * 40 + 5, 10, 10)
          }
        }
      })

      setCoins(prevCoins => {
        const updated = prevCoins.map(c => ({ ...c, animation: c.animation + (c.collected ? 0 : 0.1) }))
        updated.forEach(coin => {
          if (!coin.collected) {
            const screenX = coin.x - cameraX
            const scale = Math.abs(Math.cos(coin.animation))
            ctx.save()
            ctx.translate(screenX, coin.y)
            const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 25)
            glow.addColorStop(0, 'rgba(255, 215, 0, 0.6)')
            glow.addColorStop(1, 'rgba(255, 215, 0, 0)')
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(0, 0, 25, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = '#FFD700'
            ctx.beginPath()
            ctx.ellipse(0, 0, 18 * scale, 18, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = '#FFA500'
            ctx.lineWidth = 3
            ctx.stroke()
            if (scale > 0.3) {
              ctx.fillStyle = '#FFA500'
              ctx.font = 'bold 20px Arial'
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillText('10', 0, 0)
            }
            ctx.restore()
          }
        })
        return updated
      })

      boos.forEach(boo => {
        drawBoo(boo.x, boo.y + Math.sin(animTime * 2 + boo.x) * 5, boo.hiding, boo.size)
      })

      if (invincible && Math.floor(animTime * 10) % 2 === 0) {
        ctx.globalAlpha = 0.5
      }
      drawMario(player.x, player.y, player.direction)
      ctx.globalAlpha = 1

      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.fillRect(0, 0, CANVAS_WIDTH, 50)
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'left'
      ctx.fillText('MARIO', 20, 30)
      ctx.fillStyle = '#FFD700'
      ctx.fillText('🪙 ' + score, 200, 30)
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.fillText('TIME', CANVAS_WIDTH / 2 - 50, 20)
      ctx.fillStyle = time < 30 ? '#FF0000' : '#FFFFFF'
      ctx.font = 'bold 24px Arial'
      ctx.fillText(String(time), CANVAS_WIDTH / 2 - 50, 42)
      ctx.fillStyle = '#FF0000'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'right'
      ctx.fillText('❤️ x ' + lives, CANVAS_WIDTH - 20, 30)

      animationFrame.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [gameStarted, gameOver, player, boos, platforms, cameraX, score, time, lives, invincible])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = setInterval(() => {
      setPlayer(prev => {
        let { x, y, vx, vy, onGround, direction } = prev

        if (keys.left) {
          vx = -MOVE_SPEED
          direction = -1
        } else if (keys.right) {
          vx = MOVE_SPEED
          direction = 1
        } else {
          vx = 0
        }

        if (keys.jump && onGround) {
          vy = JUMP_FORCE
          onGround = false
        }

        if (!onGround) {
          vy += GRAVITY
        }

        x += vx
        y += vy

        onGround = false
        platforms.forEach(platform => {
          if (
            x + 32 > platform.x &&
            x < platform.x + platform.width &&
            y + 40 >= platform.y &&
            y + 40 <= platform.y + 20 &&
            vy >= 0
          ) {
            y = platform.y - 40
            vy = 0
            onGround = true
          }
        })

        if (y > CANVAS_HEIGHT) {
          setLives(l => {
            const newLives = l - 1
            if (newLives <= 0) setGameOver(true)
            return newLives
          })
          return { x: 100, y: 400, vx: 0, vy: 0, width: 32, height: 40, onGround: false, direction: 1 }
        }

        return { x, y, vx, vy, width: 32, height: 40, onGround, direction }
      })

      setCameraX(Math.max(0, player.x - CANVAS_WIDTH / 3))

      setBoos(prev => prev.map(boo => {
        const dx = player.x - boo.x
        const dy = player.y - boo.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        const playerLookingAtBoo = 
          (player.direction > 0 && dx > 0) || 
          (player.direction < 0 && dx < 0)
        
        const hiding = playerLookingAtBoo && dist < 300

        let { x, y } = boo

        if (!hiding && dist < 400) {
          const speed = 1.5
          x += (dx / dist) * speed
          y += (dy / dist) * speed
        }

        return { ...boo, x, y, hiding }
      }))

      if (!invincible) {
        boos.forEach(boo => {
          if (!boo.hiding) {
            const dx = player.x + 16 - boo.x
            const dy = player.y + 20 - boo.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist < 40) {
              setLives(l => {
                const newLives = l - 1
                if (newLives <= 0) setGameOver(true)
                return newLives
              })
              setInvincible(true)
              setTimeout(() => setInvincible(false), 2000)
              setPlayer(p => ({ ...p, x: 100, y: 400, vx: 0, vy: 0 }))
            }
          }
        })
      }

      setCoins(prev => {
        return prev.map(coin => {
          if (!coin.collected) {
            const dx = coin.x - (player.x + 16)
            const dy = coin.y - (player.y + 20)
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist < 30) {
              setScore(s => s + 10)

              setTestimonials(prevCards => {
                const already = prevCards.find(c => c.id === coin.id)?.collected
                if (already) return prevCards
                const updated = prevCards.map(c => c.id === coin.id ? { ...c, collected: true } : c)
                const card = updated.find(c => c.id === coin.id)
                if (card) {
                  setShowCardPopup(card)
                  setTimeout(() => setShowCardPopup(null), 3000)
                }
                try { localStorage.setItem(TESTIMONIAL_STORAGE_KEY, JSON.stringify(updated)) } catch {}
                return updated
              })

              return { ...coin, collected: true }
            }
          }
          return coin
        })
      })

    }, 16)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, keys, player, boos, platforms, invincible])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setTime(300)
    setLives(3)
    setPlayer({ x: 100, y: 400, vx: 0, vy: 0, width: 32, height: 40, onGround: false, direction: 1 })
    setInvincible(false)
    setCoins(prev => prev.map(c => ({ ...c, collected: false, animation: 0 })))
  }

  const collectedCount = testimonials.filter(t => t.collected).length

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black p-4">
      <div className="mb-4 text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mb-2">
          👻 GHOST HOUSE
        </h1>
        <p className="text-yellow-300 text-sm">Recolecta testimonios • {collectedCount}/{testimonialPool.length}</p>
      </div>

      {/* Arcade Console Top - Cards Display - FUERA del canvas */}
      <div className="w-full max-w-[800px] mb-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border-4 border-yellow-700 p-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {testimonials.map(card => (
            <div
              key={card.id}
              className={`min-w-[100px] flex-shrink-0 p-2 rounded-lg border-2 transition-all duration-300 ${
                card.collected 
                  ? 'border-yellow-400 bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg' 
                  : 'border-gray-600 bg-gray-800 opacity-40'
              }`}
              title={card.collected ? card.title + ' - ' + card.text : 'Bloqueado'}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">
                  {card.collected ? card.avatar : '🔒'}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {card.collected ? card.title.split(' ')[0] : '???'}
                </div>
                {card.collected && (
                  <div className="text-yellow-400 text-xs mt-1">★★★★★</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative shadow-2xl w-full max-w-[800px]">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-8 border-yellow-700 rounded-lg bg-black w-full"
          style={{ imageRendering: 'pixelated' }}
        />

        {showCardPopup && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 shadow-2xl border-4 border-yellow-400 max-w-sm">
              <div className="text-6xl text-center mb-2">{showCardPopup.avatar}</div>
              <h3 className="text-white font-bold text-xl text-center">{showCardPopup.title}</h3>
              <p className="text-yellow-300 text-center text-sm mb-2">{showCardPopup.role}</p>
              <div className="text-yellow-400 text-center text-2xl mb-2">★★★★★</div>
              <p className="text-white text-center text-sm italic">{showCardPopup.text}</p>
              <p className="text-green-400 text-center font-bold mt-3 text-lg">+10 PUNTOS!</p>
            </div>
          </div>
        )}
        
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">¡RECOLECTA TESTIMONIOS!</h2>
              <p className="text-white text-lg mb-2">🎮 Usa las flechas para moverte</p>
              <p className="text-white text-lg mb-2">⬆️ o ESPACIO para saltar</p>
              <p className="text-yellow-300 text-sm mb-4">Los Boos se esconden cuando los miras 👀</p>
              <button
                onClick={startGame}
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold text-2xl rounded-xl shadow-lg transform hover:scale-105 transition-all border-4 border-yellow-400"
              >
                START
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-95 rounded-lg">
            <div className="bg-purple-900 bg-opacity-95 p-10 rounded-2xl border-8 border-yellow-500 text-center space-y-4">
              <h2 className="text-6xl font-bold text-red-500 mb-4">GAME OVER</h2>
              <p className="text-yellow-400 text-4xl font-bold mb-2">🪙 {score}</p>
              <p className="text-purple-300 text-2xl">📝 {collectedCount}/{testimonialPool.length} Cards</p>
              <p className="text-white text-xl">Tiempo: {time}s</p>
              {collectedCount === testimonialPool.length && (
                <div className="bg-yellow-500 text-black p-4 rounded-lg font-bold text-xl animate-pulse mt-4">
                  🎉 ¡TODOS LOS TESTIMONIOS! 🎉
                </div>
              )}
              <button
                onClick={startGame}
                className="mt-4 px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold text-xl rounded-xl transform hover:scale-105 transition-all border-4 border-yellow-400"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center space-y-2 max-w-2xl">
        <p className="text-yellow-300 text-sm">💡 TIP: Los Boos se esconden cuando los miras</p>
        <p className="text-purple-300 text-xs">Las tarjetas se guardan en tu consola arcade</p>
      </div>
    </div>
  )
}