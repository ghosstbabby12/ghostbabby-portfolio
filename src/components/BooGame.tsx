'use client'

import { useEffect, useRef, useState } from 'react'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const GRAVITY = 0.7
const JUMP_FORCE = -13
const MOVE_SPEED = 4.5
const WORLD_WIDTH = 3500

interface Player {
  x: number
  y: number
  vx: number
  vy: number
  direction: number
  animFrame: number
  onGround: boolean
}

interface Boo {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  hiding: boolean
  size: number
  speed: number
}

interface Turtle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  direction: number
  dead: boolean
  animFrame: number
}

interface Mushroom {
  id: number
  x: number
  y: number
  vy: number
  vx: number
  collected: boolean
}

interface Block {
  id: number
  x: number
  y: number
  width: number
  height: number
  hit: boolean
  bouncing: boolean
  bounceOffset: number
  testimonial: Testimonial | null
}

interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  avatar: string
  stars: number
  x: number
  y: number
  vy: number
  collected: boolean
  floating: boolean
}

interface TestimonialData {
  id: number
  name: string
  role: string
  text: string
  avatar: string
  stars: number
}

interface Platform {
  x: number
  y: number
  width: number
  height: number
}

export default function MarioGhostHouseClassic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [victory, setVictory] = useState(false)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(200)
  const [lives, setLives] = useState(3)
  const [player, setPlayer] = useState<Player>({
    x: 100, y: 400, vx: 0, vy: 0, direction: 1, animFrame: 0, onGround: false
  })
  const [boos, setBoos] = useState<Boo[]>([{
    id: 0, x: 800, y: 300, vx: 0, vy: 0, hiding: false, size: 80, speed: 2.5
  }])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [turtles, setTurtles] = useState<Turtle[]>([])
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([])
  const [keys, setKeys] = useState({ left: false, right: false, jump: false })
  const [cameraX, setCameraX] = useState(0)
  const [invincible, setInvincible] = useState(false)
  const [collectedTestimonials, setCollectedTestimonials] = useState<TestimonialData[]>([])
  const [showTestimonialPopup, setShowTestimonialPopup] = useState<Testimonial | null>(null)
  const [hitEffect, setHitEffect] = useState<{x: number, y: number, show: boolean}>({x: 0, y: 0, show: false})
  const animationFrame = useRef<number>()

  const GOAL_X = WORLD_WIDTH - 300

  const testimonialData: TestimonialData[] = [
    { id: 0, name: 'Jesus Villota', role: 'CEO de Tech Solutions', text: '¡Excelente trabajo! Superó todas nuestras expectativas.', avatar: '👩‍💼', stars: 5 },
    { id: 1, name: 'Carlos Ruiz', role: 'CTO de StartupXYZ', text: 'Código limpio y bien documentado. Muy profesional.', avatar: '👨‍💻', stars: 5 },
    { id: 2, name: 'María López', role: 'Product Manager', text: 'Entrega a tiempo y comunicación impecable.', avatar: '👩‍🎨', stars: 5 },
    { id: 3, name: 'Diego Torres', role: 'Lead Developer', text: 'Gran habilidad técnica y trabajo en equipo.', avatar: '👨‍🔧', stars: 5 },
    { id: 4, name: 'Sofía Martínez', role: 'UX Designer', text: 'Atención al detalle y diseño excepcional.', avatar: '👩‍🎨', stars: 5 },
    { id: 5, name: 'Luis Fernández', role: 'Founder de AppCo', text: 'Soluciones innovadoras y creativas.', avatar: '👨‍💼', stars: 5 },
    { id: 6, name: 'Carmen Díaz', role: 'HR Manager', text: 'Profesional, puntual y confiable.', avatar: '👩‍💼', stars: 5 },
    { id: 7, name: 'Pablo Sánchez', role: 'Senior Engineer', text: 'Arquitectura sólida y escalable.', avatar: '👨‍🔬', stars: 5 },
  ]

  const generateCV = () => {
    // Descargar el PDF real del CV
    // Añadimos timestamp para evitar problemas de caché
    const timestamp = new Date().getTime()
    const a = document.createElement('a')
    a.href = `/CV_CAMILA_BASTIDAS.pdf?v=${timestamp}`
    a.download = 'CV_CAMILA_BASTIDAS.pdf'
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  useEffect(() => {
    // Plataformas estratégicamente posicionadas para golpear bloques
    const initialPlatforms: Platform[] = [
      // Piso principal
      { x: 0, y: 520, width: 3600, height: 80 },
      
      // Plataformas para acceder a bloques (perfectamente alineadas)
      { x: 280, y: 450, width: 140, height: 20 },
      { x: 680, y: 400, width: 140, height: 20 },
      { x: 1080, y: 400, width: 140, height: 20 },
      { x: 1480, y: 400, width: 140, height: 20 },
      { x: 1880, y: 400, width: 140, height: 20 },
      { x: 2280, y: 400, width: 140, height: 20 },
      { x: 2680, y: 400, width: 140, height: 20 },
      { x: 3080, y: 400, width: 140, height: 20 },
      
      // Plataformas intermedias para navegación
      { x: 500, y: 460, width: 100, height: 20 },
      { x: 900, y: 460, width: 100, height: 20 },
      { x: 1300, y: 460, width: 100, height: 20 },
      { x: 1700, y: 460, width: 100, height: 20 },
      { x: 2100, y: 460, width: 100, height: 20 },
      { x: 2500, y: 460, width: 100, height: 20 },
      { x: 2900, y: 460, width: 100, height: 20 },
      
      // Plataformas altas (opcionales)
      { x: 400, y: 300, width: 100, height: 20 },
      { x: 800, y: 280, width: 100, height: 20 },
      { x: 1200, y: 300, width: 100, height: 20 },
      { x: 1600, y: 280, width: 100, height: 20 },
      { x: 2000, y: 300, width: 100, height: 20 },
      { x: 2400, y: 280, width: 100, height: 20 },
      { x: 2800, y: 300, width: 100, height: 20 },
    ]
    setPlatforms(initialPlatforms)

    // Bloques perfectamente alineados sobre las plataformas
    const initialBlocks: Block[] = testimonialData.map((t, i) => ({
      id: i,
      x: 330 + (i * 400), // Centrados sobre las plataformas
      y: 330, // Altura perfecta para golpear desde las plataformas
      width: 40,
      height: 40,
      hit: false,
      bouncing: false,
      bounceOffset: 0,
      testimonial: null
    }))
    setBlocks(initialBlocks)

    // Tortugas enemigas distribuidas por el nivel
    const initialTurtles: Turtle[] = [
      { id: 0, x: 600, y: 496, vx: -1.5, vy: 0, direction: -1, dead: false, animFrame: 0 },
      { id: 1, x: 1200, y: 496, vx: 1.5, vy: 0, direction: 1, dead: false, animFrame: 0 },
      { id: 2, x: 1800, y: 496, vx: -1.5, vy: 0, direction: -1, dead: false, animFrame: 0 },
      { id: 3, x: 2400, y: 496, vx: 1.5, vy: 0, direction: 1, dead: false, animFrame: 0 },
      { id: 4, x: 3000, y: 496, vx: -1.5, vy: 0, direction: -1, dead: false, animFrame: 0 },
    ]
    setTurtles(initialTurtles)

    // Hongos de vida distribuidos estratégicamente
    const initialMushrooms: Mushroom[] = [
      { id: 0, x: 1000, y: 480, vy: 0, vx: 1, collected: false },
      { id: 1, x: 2000, y: 480, vy: 0, vx: 1, collected: false },
      { id: 2, x: 2800, y: 480, vy: 0, vx: 1, collected: false },
    ]
    setMushrooms(initialMushrooms)
  }, [])

  useEffect(() => {
    if (!gameStarted || gameOver || victory) return
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
  }, [gameStarted, gameOver, victory])

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
    if (!gameStarted || gameOver || victory) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let animTime = 0

    const drawPeach = (x: number, y: number, dir: number, frame: number) => {
      const screenX = x - cameraX
      
      ctx.save()
      
      // Sombra
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(screenX + 8, y + 40, 16, 4)

      const walkCycle = Math.floor(frame / 6) % 2

      // Vestido (estilo pixel art)
      ctx.fillStyle = '#FF69B4'
      ctx.fillRect(screenX + 6, y + 18, 20, 4)
      ctx.fillRect(screenX + 4, y + 22, 24, 18)
      
      // Detalles vestido
      ctx.fillStyle = '#FF1493'
      ctx.fillRect(screenX + 4, y + 22, 24, 2)
      ctx.fillRect(screenX + 4, y + 30, 24, 2)
      
      // Brazos
      ctx.fillStyle = '#FDBCB4'
      ctx.fillRect(screenX + 2, y + 20, 4, 10)
      ctx.fillRect(screenX + 26, y + 20, 4, 10)
      
      // Guantes
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(screenX + 2, y + 28, 4, 4)
      ctx.fillRect(screenX + 26, y + 28, 4, 4)
      
      // Cabeza
      ctx.fillStyle = '#FDBCB4'
      ctx.fillRect(screenX + 8, y + 4, 16, 16)
      
      // Cabello
      ctx.fillStyle = '#FFD700'
      ctx.fillRect(screenX + 6, y + 2, 20, 10)
      
      // Corona
      ctx.fillStyle = '#FFD700'
      ctx.fillRect(screenX + 10, y, 12, 4)
      ctx.fillRect(screenX + 12, y - 2, 2, 2)
      ctx.fillRect(screenX + 18, y - 2, 2, 2)
      
      // Joya corona
      ctx.fillStyle = '#FF1493'
      ctx.fillRect(screenX + 15, y, 2, 2)
      
      // Ojos
      ctx.fillStyle = '#000000'
      ctx.fillRect(screenX + 10 + dir, y + 10, 2, 2)
      ctx.fillRect(screenX + 18 + dir, y + 10, 2, 2)
      
      // Boca
      ctx.fillStyle = '#FF69B4'
      ctx.fillRect(screenX + 14, y + 14, 4, 2)
      
      // Piernas (animadas)
      ctx.fillStyle = '#FDBCB4'
      if (walkCycle === 0) {
        ctx.fillRect(screenX + 10, y + 38, 4, 6)
        ctx.fillRect(screenX + 18, y + 38, 4, 6)
      } else {
        ctx.fillRect(screenX + 12, y + 38, 4, 6)
        ctx.fillRect(screenX + 16, y + 38, 4, 6)
      }
      
      // Zapatos
      ctx.fillStyle = '#FF1493'
      ctx.fillRect(screenX + 8, y + 42, 6, 4)
      ctx.fillRect(screenX + 18, y + 42, 6, 4)
      
      ctx.restore()
    }

    const drawBigBoo = (x: number, y: number, hiding: boolean, animTime: number, booSize: number = 80) => {
      const screenX = x - cameraX
      const size = booSize
      const floatY = y + Math.sin(animTime * 2) * 12

      ctx.save()

      // Glow púrpura/azul más intenso (estilo King Boo)
      for (let i = 5; i > 0; i--) {
        const glowSize = size + i * 18
        const alpha = hiding ? 0.12 / i : 0.4 / i

        const glow = ctx.createRadialGradient(screenX, floatY, 0, screenX, floatY, glowSize)
        glow.addColorStop(0, `rgba(138, 43, 226, ${alpha})`)
        glow.addColorStop(0.5, `rgba(75, 0, 130, ${alpha * 0.7})`)
        glow.addColorStop(1, 'rgba(138, 43, 226, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(screenX, floatY, glowSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Sombra del cuerpo
      ctx.fillStyle = 'rgba(75, 0, 130, 0.5)'
      ctx.fillRect(screenX - size/2 + 10, floatY - size/2 + 6, size - 16, size)
      ctx.fillRect(screenX - size/2 + 6, floatY - size/2 + 10, size - 8, size - 8)
      ctx.fillRect(screenX - size/2 + 2, floatY - size/2 + 14, size, size - 16)

      // Cuerpo principal blanco brillante
      const bodyColor = hiding ? '#F0F0FF' : '#FFFFFF'
      ctx.fillStyle = bodyColor

      // Cuerpo redondeado pixel art
      ctx.fillRect(screenX - size/2 + 12, floatY - size/2, size - 24, size)
      ctx.fillRect(screenX - size/2 + 8, floatY - size/2 + 4, size - 16, size - 8)
      ctx.fillRect(screenX - size/2 + 4, floatY - size/2 + 8, size - 8, size - 16)
      ctx.fillRect(screenX - size/2, floatY - size/2 + 12, size, size - 24)
      
      // Detalles de iluminación en el cuerpo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.fillRect(screenX - size/2 + 8, floatY - size/2 + 8, size/3, size/3)
      
      ctx.fillStyle = 'rgba(200, 220, 255, 0.3)'
      ctx.fillRect(screenX - size/2 + 4, floatY - size/2 + 12, size - 8, 4)
      
      // Cola ondeante mejorada
      const tailSegments = 6
      for (let i = 0; i < tailSegments; i++) {
        const waveX = Math.sin(animTime * 4 + i * 0.6) * 6
        const tailY = floatY + size/2 + i * 10
        const tailSize = (size/1.8) - (i * 6)
        
        // Sombra de cola
        ctx.fillStyle = 'rgba(0, 0, 50, 0.2)'
        ctx.fillRect(screenX - tailSize/2 + waveX + 3, tailY + 2, tailSize, 10)
        
        // Segmento de cola
        ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#F5F5FF'
        ctx.fillRect(screenX - tailSize/2 + waveX, tailY, tailSize, 10)
        
        // Borde del segmento
        ctx.strokeStyle = '#E0E0FF'
        ctx.lineWidth = 1
        ctx.strokeRect(screenX - tailSize/2 + waveX, tailY, tailSize, 10)
        
        // Highlight en cola
        if (i % 2 === 0) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.fillRect(screenX - tailSize/2 + waveX + 2, tailY + 2, tailSize/2, 3)
        }
      }

      if (hiding) {
        // Manos cubriendo mejoradas
        for (let hand = -1; hand <= 1; hand += 2) {
          const handX = screenX + hand * (size/2 + 8)
          
          // Sombra de mano
          ctx.fillStyle = 'rgba(0, 0, 50, 0.3)'
          ctx.fillRect(handX + (hand > 0 ? 3 : -18), floatY - 12, 16, 28)
          
          // Mano
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(handX + (hand > 0 ? 0 : -15), floatY - 14, 15, 28)
          
          // Borde de mano
          ctx.strokeStyle = '#E0E0FF'
          ctx.lineWidth = 2
          ctx.strokeRect(handX + (hand > 0 ? 0 : -15), floatY - 14, 15, 28)
          
          // Dedos detallados
          for (let i = 0; i < 4; i++) {
            const fingerY = floatY - 18 + i * 8
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(handX + (hand > 0 ? -3 : 15), fingerY, 8, 6)
            
            ctx.fillStyle = '#F0F0FF'
            ctx.fillRect(handX + (hand > 0 ? -5 : 17), fingerY + 1, 4, 4)
            
            // Uñas
            ctx.fillStyle = 'rgba(200, 200, 255, 0.5)'
            ctx.fillRect(handX + (hand > 0 ? -6 : 18), fingerY, 3, 2)
          }
        }
      } else {
        // Ojos grandes mejorados
        const eyeGap = 28
        
        for (let side = -1; side <= 1; side += 2) {
          const eyeX = screenX + side * eyeGap
          
          // Sombra del ojo
          ctx.fillStyle = 'rgba(0, 0, 80, 0.4)'
          ctx.fillRect(eyeX - 8, floatY - 14, 16, 26)
          ctx.fillRect(eyeX - 10, floatY - 10, 2, 18)
          ctx.fillRect(eyeX - 6, floatY - 16, 12, 2)
          
          // Blanco del ojo (con tinte púrpura oscuro de King Boo)
          ctx.fillStyle = '#1a0033'
          ctx.fillRect(eyeX - 7, floatY - 14, 14, 24)
          ctx.fillRect(eyeX - 9, floatY - 10, 2, 16)
          ctx.fillRect(eyeX - 5, floatY - 16, 10, 2)
          ctx.fillRect(eyeX + 7, floatY - 10, 2, 16)
          ctx.fillRect(eyeX - 5, floatY + 10, 10, 2)

          // Iris púrpura/carmesí brillante (estilo King Boo)
          const irisGradient = ctx.createLinearGradient(eyeX - 6, floatY - 8, eyeX + 6, floatY + 8)
          irisGradient.addColorStop(0, '#FF00FF')
          irisGradient.addColorStop(0.5, '#CC00CC')
          irisGradient.addColorStop(1, '#8B008B')
          ctx.fillStyle = irisGradient
          ctx.fillRect(eyeX - 6, floatY - 8, 12, 16)
          
          // Pupila oscura
          ctx.fillStyle = '#000040'
          ctx.fillRect(eyeX - 4, floatY - 4, 8, 12)
          
          // Brillos en el iris (múltiples capas)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
          ctx.fillRect(eyeX - 4, floatY - 6, 3, 4)
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
          ctx.fillRect(eyeX + 2, floatY - 2, 2, 3)
          
          ctx.fillStyle = 'rgba(200, 255, 255, 0.7)'
          ctx.fillRect(eyeX - 1, floatY + 4, 4, 2)
        }
        
        // Cejas malvadas
        ctx.fillStyle = '#000040'
        const browWave = Math.sin(animTime * 3) * 2
        ctx.fillRect(screenX - 34, floatY - 22 + browWave, 12, 4)
        ctx.fillRect(screenX - 36, floatY - 20 + browWave, 2, 4)
        ctx.fillRect(screenX + 22, floatY - 22 + browWave, 12, 4)
        ctx.fillRect(screenX + 34, floatY - 20 + browWave, 2, 4)
        
        // Boca grande mejorada
        ctx.fillStyle = '#8B0000'
        ctx.fillRect(screenX - 28, floatY + 14, 56, 20)
        ctx.fillRect(screenX - 30, floatY + 16, 2, 16)
        ctx.fillRect(screenX + 28, floatY + 16, 2, 16)
        ctx.fillRect(screenX - 26, floatY + 12, 4, 4)
        ctx.fillRect(screenX + 22, floatY + 12, 4, 4)
        
        // Interior oscuro de la boca
        ctx.fillStyle = '#4B0000'
        ctx.fillRect(screenX - 24, floatY + 18, 48, 14)
        
        // Lengua detallada
        const tongueGradient = ctx.createLinearGradient(screenX - 10, floatY + 22, screenX + 10, floatY + 30)
        tongueGradient.addColorStop(0, '#FF69B4')
        tongueGradient.addColorStop(0.5, '#FF1493')
        tongueGradient.addColorStop(1, '#C71585')
        ctx.fillStyle = tongueGradient
        ctx.fillRect(screenX - 10, floatY + 22, 20, 10)
        
        // Textura de lengua
        ctx.fillStyle = 'rgba(255, 105, 180, 0.5)'
        ctx.fillRect(screenX - 8, floatY + 23, 16, 2)
        ctx.fillRect(screenX - 6, floatY + 27, 12, 2)
        
        // Dientes mejorados con más detalle
        ctx.fillStyle = '#FFFFFF'
        for (let i = 0; i < 8; i++) {
          const toothX = screenX - 26 + i * 7
          
          // Diente principal
          ctx.fillRect(toothX, floatY + 14, 6, 10)
          
          // Highlight en diente
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
          ctx.fillRect(toothX + 1, floatY + 15, 2, 6)
          
          // Sombra en diente
          ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
          ctx.fillRect(toothX + 4, floatY + 16, 2, 7)
          
          ctx.fillStyle = '#FFFFFF'
        }
        
        // Babas/saliva
        ctx.fillStyle = 'rgba(150, 255, 255, 0.3)'
        const droolX = screenX - 20 + Math.sin(animTime * 2) * 15
        ctx.fillRect(droolX, floatY + 34, 3, 8 + Math.sin(animTime * 3) * 4)
        ctx.fillRect(droolX + 20, floatY + 34, 3, 6 + Math.cos(animTime * 3) * 3)
      }
      
      // Borde exterior para definición
      ctx.strokeStyle = hiding ? 'rgba(200, 200, 255, 0.5)' : 'rgba(230, 240, 255, 0.6)'
      ctx.lineWidth = 2
      ctx.strokeRect(screenX - size/2, floatY - size/2 + 12, size, size - 24)

      // Corona de King Boo (pixel art)
      if (!hiding) {
        const crownY = floatY - size/2 - 28
        const crownBounce = Math.sin(animTime * 2) * 2

        // Sombra de la corona
        ctx.fillStyle = 'rgba(139, 90, 0, 0.3)'
        ctx.fillRect(screenX - 32, crownY + crownBounce + 3, 64, 26)

        // Base de la corona (oro)
        const goldGradient = ctx.createLinearGradient(screenX - 30, crownY, screenX + 30, crownY + 24)
        goldGradient.addColorStop(0, '#FFD700')
        goldGradient.addColorStop(0.5, '#FFA500')
        goldGradient.addColorStop(1, '#FF8C00')
        ctx.fillStyle = goldGradient

        // Band principal de la corona
        ctx.fillRect(screenX - 30, crownY + crownBounce + 18, 60, 8)

        // Picos de la corona (5 picos)
        for (let i = 0; i < 5; i++) {
          const spikeX = screenX - 26 + i * 13
          const spikeHeight = i === 2 ? 20 : 16 // Pico central más alto

          // Pico dorado
          ctx.fillStyle = goldGradient
          ctx.fillRect(spikeX, crownY + crownBounce + 18 - spikeHeight, 10, spikeHeight)

          // Highlight en el pico
          ctx.fillStyle = '#FFED4E'
          ctx.fillRect(spikeX + 1, crownY + crownBounce + 19 - spikeHeight, 3, spikeHeight - 4)

          // Sombra en el pico
          ctx.fillStyle = 'rgba(139, 90, 0, 0.4)'
          ctx.fillRect(spikeX + 7, crownY + crownBounce + 20 - spikeHeight, 2, spikeHeight - 2)
        }

        // Highlights en la banda
        ctx.fillStyle = '#FFED4E'
        ctx.fillRect(screenX - 28, crownY + crownBounce + 19, 56, 3)

        // Sombras en la banda
        ctx.fillStyle = 'rgba(139, 90, 0, 0.5)'
        ctx.fillRect(screenX - 28, crownY + crownBounce + 23, 56, 2)

        // Gemas en la corona (rubíes y zafiros)
        const gems = [
          { x: -20, color: '#DC143C', highlight: '#FF69B4' }, // Rubí izquierda
          { x: 0, color: '#4169E1', highlight: '#87CEEB' },   // Zafiro centro
          { x: 20, color: '#DC143C', highlight: '#FF69B4' }   // Rubí derecha
        ]

        gems.forEach(gem => {
          const gemX = screenX + gem.x
          const gemY = crownY + crownBounce + 20

          // Glow de gema
          ctx.fillStyle = gem.highlight
          ctx.shadowBlur = 8
          ctx.shadowColor = gem.color
          ctx.fillRect(gemX - 5, gemY - 5, 10, 10)
          ctx.shadowBlur = 0

          // Gema principal
          ctx.fillStyle = gem.color
          ctx.fillRect(gemX - 4, gemY - 4, 8, 8)
          ctx.fillRect(gemX - 3, gemY - 5, 6, 1)
          ctx.fillRect(gemX - 5, gemY - 3, 1, 6)
          ctx.fillRect(gemX + 4, gemY - 3, 1, 6)
          ctx.fillRect(gemX - 3, gemY + 4, 6, 1)

          // Brillo en la gema
          ctx.fillStyle = gem.highlight
          ctx.fillRect(gemX - 2, gemY - 2, 3, 3)

          // Reflejo
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.fillRect(gemX - 1, gemY - 1, 2, 2)
        })

        // Detalles decorativos en la corona
        ctx.fillStyle = '#B8860B'
        for (let i = 0; i < 6; i++) {
          const decorX = screenX - 25 + i * 10
          ctx.fillRect(decorX, crownY + crownBounce + 21, 2, 2)
        }
      }

      ctx.restore()
    }

    const drawBlock = (block: Block) => {
      const screenX = block.x - cameraX
      const y = block.y - block.bounceOffset
      
      if (block.hit) {
        // Bloque usado (marrón oscuro)
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(screenX, y, block.width, block.height)
        
        ctx.fillStyle = '#654321'
        ctx.fillRect(screenX, y, block.width, 4)
        ctx.fillRect(screenX, y, 4, block.height)
        
        ctx.fillStyle = '#5D4E37'
        ctx.fillRect(screenX + 4, y + 4, 32, 32)
        
        // Grietas
        ctx.fillStyle = '#3D2E17'
        ctx.fillRect(screenX + 10, y + 8, 2, 24)
        ctx.fillRect(screenX + 28, y + 8, 2, 24)
      } else {
        // Bloque activo (dorado brillante)
        const pulse = Math.sin(animTime * 5) * 2
        
        ctx.fillStyle = '#FFD700'
        ctx.shadowBlur = 15 + pulse
        ctx.shadowColor = '#FFD700'
        ctx.fillRect(screenX, y, block.width, block.height)
        ctx.shadowBlur = 0
        
        // Bordes 3D
        ctx.fillStyle = '#FFED4E'
        ctx.fillRect(screenX, y, block.width, 4)
        ctx.fillRect(screenX, y, 4, block.height)
        
        ctx.fillStyle = '#B8860B'
        ctx.fillRect(screenX, y + 36, block.width, 4)
        ctx.fillRect(screenX + 36, y, 4, block.height)
        
        // Símbolo ?
        ctx.fillStyle = '#FFFFFF'
        ctx.shadowBlur = 5
        ctx.shadowColor = '#FFFFFF'
        ctx.font = 'bold 28px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('?', screenX + 20, y + 20 + pulse)
        ctx.shadowBlur = 0
      }
    }

    const drawTestimonial = (t: Testimonial) => {
      const screenX = t.x - cameraX
      
      if (t.floating) {
        // Testimonial flotante con glow
        ctx.save()
        ctx.translate(screenX, t.y)
        
        // Glow dorado
        ctx.shadowBlur = 25
        ctx.shadowColor = '#FFD700'
        
        // Carta de testimonial (pixel art)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(-22, -22, 44, 44)
        
        // Borde
        ctx.strokeStyle = '#FFD700'
        ctx.lineWidth = 3
        ctx.strokeRect(-22, -22, 44, 44)
        
        ctx.shadowBlur = 0
        
        // Barra superior
        ctx.fillStyle = '#FFD700'
        ctx.fillRect(-20, -20, 40, 6)
        
        // Avatar grande
        ctx.font = '28px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(t.avatar, 0, 4)
        
        // Estrellas
        ctx.font = '14px Arial'
        ctx.fillStyle = '#FFD700'
        ctx.fillText('⭐'.repeat(t.stars), 0, 18)
        
        // Efecto de brillo giratorio
        const sparkles = 8
        for (let i = 0; i < sparkles; i++) {
          const angle = (Date.now() * 0.003 + i * Math.PI * 2 / sparkles)
          const dist = 35 + Math.sin(Date.now() * 0.005) * 5
          const sx = Math.cos(angle) * dist
          const sy = Math.sin(angle) * dist
          
          ctx.fillStyle = '#FFD700'
          ctx.beginPath()
          ctx.arc(sx, sy, 2, 0, Math.PI * 2)
          ctx.fill()
        }
        
        ctx.restore()
      }
    }

    const drawFlag = (animTime: number) => {
      const screenX = GOAL_X - cameraX
      const y = 200

      // Asta (pixel art)
      ctx.fillStyle = '#FFD700'
      ctx.fillRect(screenX, y, 8, 320)

      // Anillos
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#FFA500' : '#FFD700'
        ctx.fillRect(screenX - 2, y + i * 50, 12, 8)
      }

      // Bandera ondeante (pixel style)
      const wave = Math.floor(Math.sin(animTime * 3) * 3)
      ctx.fillStyle = victory ? '#FFD700' : '#FF69B4'
      ctx.fillRect(screenX + 8, y + 20, 60 + wave, 50)

      // Borde bandera
      ctx.strokeStyle = victory ? '#FFA500' : '#C71585'
      ctx.lineWidth = 2
      ctx.strokeRect(screenX + 8, y + 20, 60 + wave, 50)

      // Estrella
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('★', screenX + 38, y + 52)
    }

    const drawTurtle = (turtle: Turtle, animTime: number) => {
      const screenX = turtle.x - cameraX
      const walkCycle = Math.floor(turtle.animFrame / 8) % 2

      ctx.save()

      if (turtle.dead) {
        // Tortuga muerta (caparazón volteado)
        ctx.fillStyle = '#228B22'
        ctx.fillRect(screenX + 4, turtle.y + 8, 24, 16)

        // Patrón del caparazón
        ctx.fillStyle = '#FFFF00'
        ctx.fillRect(screenX + 8, turtle.y + 10, 4, 4)
        ctx.fillRect(screenX + 16, turtle.y + 10, 4, 4)
        ctx.fillRect(screenX + 12, turtle.y + 16, 4, 4)

        // Borde
        ctx.strokeStyle = '#006400'
        ctx.lineWidth = 2
        ctx.strokeRect(screenX + 4, turtle.y + 8, 24, 16)
      } else {
        // Caparazón
        ctx.fillStyle = '#228B22'
        ctx.fillRect(screenX + 4, turtle.y, 24, 20)

        // Patrón hexagonal del caparazón
        ctx.fillStyle = '#FFFF00'
        ctx.fillRect(screenX + 8, turtle.y + 4, 4, 4)
        ctx.fillRect(screenX + 16, turtle.y + 4, 4, 4)
        ctx.fillRect(screenX + 12, turtle.y + 8, 4, 4)
        ctx.fillRect(screenX + 8, turtle.y + 12, 4, 4)
        ctx.fillRect(screenX + 16, turtle.y + 12, 4, 4)

        // Borde del caparazón
        ctx.strokeStyle = '#006400'
        ctx.lineWidth = 2
        ctx.strokeRect(screenX + 4, turtle.y, 24, 20)

        // Cabeza
        ctx.fillStyle = '#90EE90'
        const headX = turtle.direction > 0 ? screenX + 26 : screenX + 2
        ctx.fillRect(headX, turtle.y + 8, 6, 8)

        // Ojo
        ctx.fillStyle = '#000000'
        ctx.fillRect(headX + (turtle.direction > 0 ? 3 : 1), turtle.y + 10, 2, 2)

        // Patas (animadas)
        ctx.fillStyle = '#90EE90'
        if (walkCycle === 0) {
          // Patas delanteras
          ctx.fillRect(screenX + 2, turtle.y + 18, 4, 6)
          ctx.fillRect(screenX + 26, turtle.y + 18, 4, 6)
          // Patas traseras
          ctx.fillRect(screenX + 8, turtle.y + 20, 4, 4)
          ctx.fillRect(screenX + 20, turtle.y + 20, 4, 4)
        } else {
          // Patas delanteras
          ctx.fillRect(screenX + 2, turtle.y + 20, 4, 4)
          ctx.fillRect(screenX + 26, turtle.y + 20, 4, 4)
          // Patas traseras
          ctx.fillRect(screenX + 8, turtle.y + 18, 4, 6)
          ctx.fillRect(screenX + 20, turtle.y + 18, 4, 6)
        }
      }

      ctx.restore()
    }

    const drawMushroom = (mushroom: Mushroom, animTime: number) => {
      const screenX = mushroom.x - cameraX
      const bounce = Math.sin(animTime * 5) * 2

      ctx.save()

      // Sombra
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(screenX + 4, mushroom.y + 22, 16, 4)

      // Tallo
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(screenX + 8, mushroom.y + 12 + bounce, 8, 12)

      // Borde del tallo
      ctx.strokeStyle = '#E0E0E0'
      ctx.lineWidth = 1
      ctx.strokeRect(screenX + 8, mushroom.y + 12 + bounce, 8, 12)

      // Sombrero (rojo con puntos blancos)
      ctx.fillStyle = '#FF0000'
      ctx.fillRect(screenX + 4, mushroom.y + 8 + bounce, 16, 8)
      ctx.fillRect(screenX + 2, mushroom.y + 10 + bounce, 20, 4)

      // Parte superior redondeada
      ctx.fillRect(screenX + 6, mushroom.y + 6 + bounce, 12, 2)
      ctx.fillRect(screenX + 8, mushroom.y + 4 + bounce, 8, 2)

      // Puntos blancos
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(screenX + 6, mushroom.y + 8 + bounce, 3, 3)
      ctx.fillRect(screenX + 15, mushroom.y + 8 + bounce, 3, 3)
      ctx.fillRect(screenX + 10, mushroom.y + 11 + bounce, 4, 4)

      // Brillo en el sombrero
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.fillRect(screenX + 8, mushroom.y + 6 + bounce, 4, 4)

      // Glow de vida
      ctx.shadowBlur = 10
      ctx.shadowColor = '#FF0000'
      ctx.strokeStyle = '#FF0000'
      ctx.lineWidth = 1
      ctx.strokeRect(screenX + 4, mushroom.y + 8 + bounce, 16, 8)
      ctx.shadowBlur = 0

      ctx.restore()
    }

    const animate = () => {
      animTime += 0.016

      // Fondo oscuro estilo Ghost House
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      
      // Patrón de fondo (arquitectura fantasmal)
      ctx.fillStyle = 'rgba(40, 40, 80, 0.3)'
      for (let i = 0; i < 20; i++) {
        const x = (i * 80 - (cameraX * 0.3)) % CANVAS_WIDTH
        ctx.fillRect(x, 0, 60, CANVAS_HEIGHT)
      }
      
      // Ventanas fantasmales
      ctx.fillStyle = 'rgba(100, 100, 150, 0.2)'
      for (let i = 0; i < 10; i++) {
        const x = (i * 150 - (cameraX * 0.2)) % CANVAS_WIDTH
        for (let j = 0; j < 3; j++) {
          ctx.fillRect(x + 20, 50 + j * 150, 40, 60)
        }
      }

      // Plataformas (pixel art)
      platforms.forEach(platform => {
        const screenX = platform.x - cameraX
        
        // Sombra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(screenX + 4, platform.y + 4, platform.width, platform.height)
        
        // Base marrón
        ctx.fillStyle = '#8B7355'
        ctx.fillRect(screenX, platform.y, platform.width, platform.height)
        
        // Bordes
        ctx.fillStyle = '#A0826D'
        ctx.fillRect(screenX, platform.y, platform.width, 4)
        ctx.fillRect(screenX, platform.y, 4, platform.height)
        
        ctx.fillStyle = '#6B5344'
        ctx.fillRect(screenX, platform.y + platform.height - 4, platform.width, 4)
        ctx.fillRect(screenX + platform.width - 4, platform.y, 4, platform.height)
        
        // Textura pixel
        for (let i = 0; i < platform.width / 20; i++) {
          ctx.fillStyle = i % 2 === 0 ? '#9B7E5F' : '#8B6E4F'
          ctx.fillRect(screenX + i * 20, platform.y + 6, 18, platform.height - 12)
        }
      })

      // Bloques
      blocks.forEach(block => drawBlock(block))

      // Testimonials flotantes (efecto visual)
      testimonials.forEach(t => drawTestimonial(t))

      // Bandera
      drawFlag(animTime)

      // Efecto HIT cuando se golpea un bloque
      if (hitEffect.show) {
        const screenX = hitEffect.x - cameraX
        ctx.save()
        ctx.translate(screenX, hitEffect.y)
        
        ctx.shadowBlur = 20
        ctx.shadowColor = '#FFD700'
        
        ctx.fillStyle = '#FFD700'
        ctx.font = 'bold 24px monospace'
        ctx.textAlign = 'center'
        ctx.fillText('HIT!', 0, 0)
        
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 20px monospace'
        ctx.fillText('+100', 0, 25)
        
        ctx.shadowBlur = 0
        ctx.restore()
      }

      // Tortugas
      turtles.forEach(turtle => {
        if (!turtle.dead || turtle.vy !== 0) {
          drawTurtle(turtle, animTime)
        }
      })

      // Hongos
      mushrooms.forEach(mushroom => {
        if (!mushroom.collected) {
          drawMushroom(mushroom, animTime)
        }
      })

      // Boos
      boos.forEach(boo => {
        drawBigBoo(boo.x, boo.y, boo.hiding, animTime)
      })

      // Peach
      if (invincible && Math.floor(animTime * 10) % 2 === 0) {
        ctx.globalAlpha = 0.5
      }
      drawPeach(player.x, player.y, player.direction, player.animFrame)
      ctx.globalAlpha = 1

      // HUD (estilo SMB)
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, CANVAS_WIDTH, 50)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '20px monospace'
      ctx.textAlign = 'left'
      ctx.fillText('PEACH', 20, 30)
      
      ctx.fillStyle = '#FFD700'
      ctx.fillText('★' + score.toString().padStart(6, '0'), 150, 30)
      
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.fillText('TIME', CANVAS_WIDTH / 2, 20)
      ctx.fillText(time.toString().padStart(3, '0'), CANVAS_WIDTH / 2, 40)
      
      ctx.fillStyle = '#FF1493'
      ctx.textAlign = 'right'
      ctx.fillText('x' + lives, CANVAS_WIDTH - 20, 30)
      ctx.fillText('👑', CANVAS_WIDTH - 60, 30)
      
      // Barra inferior de testimonios recolectados
      const bottomBarHeight = 80
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, CANVAS_HEIGHT - bottomBarHeight, CANVAS_WIDTH, bottomBarHeight)
      
      // Borde superior de la barra
      ctx.fillStyle = '#FFD700'
      ctx.fillRect(0, CANVAS_HEIGHT - bottomBarHeight, CANVAS_WIDTH, 3)
      
      // Título de la barra
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 16px monospace'
      ctx.textAlign = 'left'
      ctx.fillText(`TESTIMONIOS: ${collectedTestimonials.length}/${testimonialData.length}`, 10, CANVAS_HEIGHT - bottomBarHeight + 20)
      
      // Mostrar testimonios recolectados
      collectedTestimonials.forEach((testimonial, index) => {
        const x = 10 + (index * 90)
        const y = CANVAS_HEIGHT - bottomBarHeight + 30
        
        // Fondo del testimonial
        ctx.fillStyle = '#1a1a1a'
        ctx.fillRect(x, y, 85, 45)
        
        // Borde
        ctx.strokeStyle = '#FFD700'
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, 85, 45)
        
        // Avatar
        ctx.font = '24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(testimonial.avatar, x + 20, y + 25)
        
        // Nombre (truncado)
        ctx.font = '10px monospace'
        ctx.fillStyle = '#FFFFFF'
        const firstName = testimonial.name.split(' ')[0]
        ctx.fillText(firstName.substring(0, 8), x + 55, y + 18)
        
        // Estrellas
        ctx.font = '10px Arial'
        ctx.fillStyle = '#FFD700'
        ctx.fillText('⭐'.repeat(testimonial.stars), x + 55, y + 32)
        
        // Role (truncado)
        ctx.font = '8px monospace'
        ctx.fillStyle = '#AAAAAA'
        const roleText = testimonial.role.substring(0, 9)
        ctx.fillText(roleText, x + 55, y + 42)
      })

      animationFrame.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [gameStarted, gameOver, victory, player, boos, blocks, testimonials, platforms, turtles, mushrooms, cameraX, score, time, lives, invincible, collectedTestimonials])

  useEffect(() => {
    if (!gameStarted || gameOver || victory) return

    const gameLoop = setInterval(() => {
      // Actualizar bloques que rebotan
      setBlocks(prev => prev.map(block => {
        if (block.bouncing) {
          const newOffset = block.bounceOffset + 3
          if (newOffset >= 20) {
            return { ...block, bouncing: false, bounceOffset: 0 }
          }
          return { ...block, bounceOffset: newOffset }
        }
        return block
      }))

      // Actualizar testimonials flotantes (solo animación, ya están recolectados)
      setTestimonials(prev => prev.map(t => {
        if (t.floating && !t.collected) {
          let newY = t.y + t.vy
          let newVy = t.vy + 0.5
          
          // Eliminar si cae fuera
          if (newY > CANVAS_HEIGHT) {
            return { ...t, floating: false }
          }
          
          return { ...t, y: newY, vy: newVy }
        }
        return t
      }))

      setPlayer(prev => {
        let { x, y, vx, vy, direction, animFrame, onGround } = prev

        if (keys.left) {
          vx = -MOVE_SPEED
          direction = -1
          animFrame++
        } else if (keys.right) {
          vx = MOVE_SPEED
          direction = 1
          animFrame++
        } else {
          vx = 0
          animFrame = 0
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

        // Colisiones con plataformas
        onGround = false
        platforms.forEach(platform => {
          if (
            x + 32 > platform.x &&
            x < platform.x + platform.width &&
            y + 46 >= platform.y &&
            y + 46 <= platform.y + 25 &&
            vy >= 0
          ) {
            y = platform.y - 46
            vy = 0
            onGround = true
          }
          
          // Golpear desde abajo
          if (
            x + 32 > platform.x &&
            x < platform.x + platform.width &&
            y <= platform.y + platform.height &&
            y + 15 >= platform.y + platform.height &&
            vy < 0
          ) {
            y = platform.y + platform.height
            vy = 0
          }
        })

        // Golpear bloques desde abajo (física mejorada)
        blocks.forEach(block => {
          if (
            !block.hit &&
            x + 32 > block.x &&
            x < block.x + block.width &&
            y < block.y + block.height &&
            y + 10 > block.y &&
            vy < 0
          ) {
            setBlocks(prev => prev.map(b => {
              if (b.id === block.id) {
                // Crear testimonial flotante
                const testimonialData_item = testimonialData[b.id]
                setTestimonials(t => [...t, {
                  ...testimonialData_item,
                  x: b.x + 20,
                  y: b.y - 50,
                  vy: -8,
                  collected: false,
                  floating: true
                }])
                
                // Añadir a testimonios recolectados inmediatamente
                setCollectedTestimonials(prev => [...prev, testimonialData_item])

                // Sistema de combo: más puntos por golpes consecutivos
                const comboBonus = collectedTestimonials.length * 50
                setScore(s => s + 100 + comboBonus)

                // Bonificación de tiempo al golpear bloques
                setTime(t => Math.min(200, t + 10))
                
                // Mostrar popup
                setShowTestimonialPopup({
                  ...testimonialData_item,
                  x: b.x + 20,
                  y: b.y - 50,
                  vy: -8,
                  collected: false,
                  floating: true
                })
                setTimeout(() => setShowTestimonialPopup(null), 2500)
                
                // Mostrar efecto HIT
                setHitEffect({x: b.x + 20, y: b.y - 30, show: true})
                setTimeout(() => setHitEffect(prev => ({...prev, show: false})), 500)
                
                return { ...b, hit: true, bouncing: true }
              }
              return b
            }))
            vy = 1 // Rebote hacia abajo
          }
        })

        // Victoria
        if (x >= GOAL_X && !victory) {
          setVictory(true)
        }

        if (y > CANVAS_HEIGHT) {
          setLives(l => {
            const newLives = l - 1
            if (newLives <= 0) setGameOver(true)
            return newLives
          })
          return { x: 100, y: 400, vx: 0, vy: 0, direction: 1, animFrame: 0, onGround: false }
        }

        return { x, y, vx, vy, direction, animFrame, onGround }
      })

      setCameraX(prev => {
        const targetX = Math.max(0, player.x - CANVAS_WIDTH / 3)
        const maxCameraX = WORLD_WIDTH - CANVAS_WIDTH
        return Math.min(maxCameraX, prev + (targetX - prev) * 0.1)
      })

      // IA de los Boos (con dificultad progresiva)
      setBoos(prevBoos => prevBoos.map(boo => {
        const dx = player.x + 16 - boo.x
        const dy = player.y + 23 - boo.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        const playerLookingAtBoo =
          (player.direction > 0 && dx > 0) ||
          (player.direction < 0 && dx < 0)

        const hiding = playerLookingAtBoo && dist < 400

        let { x, y, vx, vy, speed } = boo

        // Velocidad aumenta con el tiempo
        const difficultyMultiplier = 1 + (200 - time) * 0.003

        if (!hiding && dist < 600) {
          const adjustedSpeed = speed * difficultyMultiplier
          const targetVx = (dx / dist) * adjustedSpeed
          const targetVy = (dy / dist) * adjustedSpeed

          vx += (targetVx - vx) * 0.1
          vy += (targetVy - vy) * 0.1
        } else {
          vx *= 0.95
          vy *= 0.95
        }

        x += vx
        y += vy

        return { ...boo, x, y, vx, vy, hiding }
      }))

      // Añadir nuevos Boos según testimonios recolectados
      if (collectedTestimonials.length === 3 && boos.length === 1) {
        setBoos(prev => [...prev, {
          id: 1,
          x: WORLD_WIDTH - 400,
          y: 300,
          vx: 0,
          vy: 0,
          hiding: false,
          size: 70,
          speed: 2.8
        }])
      } else if (collectedTestimonials.length === 6 && boos.length === 2) {
        setBoos(prev => [...prev, {
          id: 2,
          x: 1500,
          y: 250,
          vx: 0,
          vy: 0,
          hiding: false,
          size: 65,
          speed: 3.0
        }])
      }

      // Actualizar tortugas
      setTurtles(prevTurtles => prevTurtles.map(turtle => {
        if (turtle.dead) {
          // Tortugas muertas desaparecen después de un tiempo
          return turtle
        }

        let { x, y, vx, vy, direction, animFrame } = turtle

        // Movimiento horizontal
        x += vx
        animFrame++

        // Cambiar dirección en los bordes o obstáculos
        if (x < 50 || x > WORLD_WIDTH - 50) {
          vx = -vx
          direction = -direction
        }

        // Gravedad simple (las tortugas caminan sobre el piso)
        const onFloor = y >= 496
        if (!onFloor) {
          vy += GRAVITY
          y += vy
        } else {
          y = 496
          vy = 0
        }

        return { ...turtle, x, y, vx, vy, direction, animFrame }
      }))

      // Actualizar hongos
      setMushrooms(prevMushrooms => prevMushrooms.map(mushroom => {
        if (mushroom.collected) return mushroom

        let { x, y, vx, vy } = mushroom

        // Movimiento suave izquierda-derecha
        x += vx

        // Rebotar en los bordes
        if (x < mushroom.id * 50 || x > mushroom.id * 50 + 100) {
          vx = -vx
        }

        return { ...mushroom, x, y, vx, vy }
      }))

      // Colisión jugador con tortugas
      turtles.forEach((turtle, index) => {
        if (turtle.dead) return

        const dx = player.x + 16 - (turtle.x + 16)
        const dy = player.y + 23 - (turtle.y + 12)
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 30) {
          // Si el jugador salta sobre la tortuga
          if (player.vy > 0 && player.y < turtle.y) {
            setTurtles(prev => prev.map((t, i) =>
              i === index ? { ...t, dead: true } : t
            ))
            setScore(s => s + 200)
            setPlayer(p => ({ ...p, vy: JUMP_FORCE * 0.6 })) // Pequeño rebote
          } else if (!invincible) {
            // La tortuga daña al jugador
            setLives(l => {
              const newLives = l - 1
              if (newLives <= 0) setGameOver(true)
              return newLives
            })
            setTime(t => Math.max(0, t - 10))
            setInvincible(true)
            setTimeout(() => setInvincible(false), 2000)
            setPlayer(p => ({ ...p, x: Math.max(100, p.x - 50), vx: 0, vy: JUMP_FORCE * 0.5 }))
          }
        }
      })

      // Colisión jugador con hongos (vida extra)
      mushrooms.forEach((mushroom, index) => {
        if (mushroom.collected) return

        const dx = player.x + 16 - (mushroom.x + 12)
        const dy = player.y + 23 - (mushroom.y + 12)
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 25) {
          setMushrooms(prev => prev.map((m, i) =>
            i === index ? { ...m, collected: true } : m
          ))
          setLives(l => Math.min(5, l + 1)) // Máximo 5 vidas
          setScore(s => s + 500)
          setTime(t => Math.min(200, t + 20)) // Bonus de tiempo
        }
      })

      // Colisión con Boos
      if (!invincible) {
        for (const boo of boos) {
          const dx = player.x + 16 - boo.x
          const dy = player.y + 23 - boo.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (!boo.hiding && dist < 85) {
            setLives(l => {
              const newLives = l - 1
              if (newLives <= 0) setGameOver(true)
              return newLives
            })
            // Penalización de tiempo al recibir daño
            setTime(t => Math.max(0, t - 15))
            setInvincible(true)
            setTimeout(() => setInvincible(false), 2000)
            setPlayer(p => ({ ...p, x: 100, y: 400, vx: 0, vy: 0 }))
            break
          }
        }
      }

    }, 16)

    return () => clearInterval(gameLoop)
  }, [gameStarted, gameOver, victory, keys, player, boos, blocks, platforms, turtles, mushrooms, invincible, testimonialData, collectedTestimonials, time])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setVictory(false)
    setScore(0)
    setTime(200)
    setLives(3)
    setPlayer({ x: 100, y: 400, vx: 0, vy: 0, direction: 1, animFrame: 0, onGround: false })
    setInvincible(false)
    setBlocks(prev => prev.map(b => ({ ...b, hit: false, bouncing: false, bounceOffset: 0 })))
    setTestimonials([])
    setCollectedTestimonials([])
    setBoos([{ id: 0, x: 800, y: 300, vx: 0, vy: 0, hiding: false, size: 80, speed: 2.5 }])

    // Resetear tortugas
    setTurtles([
      { id: 0, x: 600, y: 496, vx: -1.5, vy: 0, direction: -1, dead: false, animFrame: 0 },
      { id: 1, x: 1200, y: 496, vx: 1.5, vy: 0, direction: 1, dead: false, animFrame: 0 },
      { id: 2, x: 1800, y: 496, vx: -1.5, vy: 0, direction: -1, dead: false, animFrame: 0 },
      { id: 3, x: 2400, y: 496, vx: 1.5, vy: 0, direction: 1, dead: false, animFrame: 0 },
      { id: 4, x: 3000, y: 496, vx: -1.5, vy: 0, direction: -1, dead: false, animFrame: 0 },
    ])

    // Resetear hongos
    setMushrooms([
      { id: 0, x: 1000, y: 480, vy: 0, vx: 1, collected: false },
      { id: 1, x: 2000, y: 480, vy: 0, vx: 1, collected: false },
      { id: 2, x: 2800, y: 480, vy: 0, vx: 1, collected: false },
    ])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-2 sm:p-4">
      <div className="mb-3 sm:mb-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-pink-400 mb-1 sm:mb-2" style={{ fontFamily: 'monospace' }}>
          SUPER PEACH BROS.
        </h1>
        <p className="text-green-400 text-sm sm:text-base md:text-lg" style={{ fontFamily: 'monospace' }}>WORLD 1-1 GHOST HOUSE</p>
      </div>

      <div className="relative shadow-2xl w-full max-w-[800px]">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-gray-800 bg-black w-full"
          style={{ imageRendering: 'pixelated' }}
        />

        {showTestimonialPopup && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce px-4 w-full max-w-[95%] sm:max-w-md">
            <div className="rounded-lg p-3 sm:p-4 md:p-6 border-2 sm:border-4 shadow-2xl" style={{ fontFamily: 'monospace', backgroundColor: '#000000', borderColor: '#ffd700' }}>
              <div className="text-center mb-2 sm:mb-3">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-1 sm:mb-2">{showTestimonialPopup.avatar}</div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#ffd700' }}>¡TESTIMONIAL!</div>
              </div>
              <div className="p-3 sm:p-4 rounded border-2" style={{ backgroundColor: '#1a1a1a', borderColor: '#4a4a4a' }}>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white text-center mb-1">
                  {showTestimonialPopup.name}
                </h3>
                <p className="text-xs sm:text-sm text-center mb-2" style={{ color: '#9ca3af' }}>
                  {showTestimonialPopup.role}
                </p>
                <p className="text-center mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl" style={{ color: '#ffd700' }}>
                  {'⭐'.repeat(showTestimonialPopup.stars)}
                </p>
                <p className="text-white text-center italic text-xs sm:text-sm leading-relaxed">
                  "{showTestimonialPopup.text}"
                </p>
              </div>
              <div className="text-center mt-3 sm:mt-4">
                <p className="font-bold text-lg sm:text-xl md:text-2xl" style={{ color: '#4ade80' }}>+100 PUNTOS!</p>
              </div>
            </div>
          </div>
        )}

        {!gameStarted && !gameOver && !victory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}>
            <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 w-full max-w-[95%] sm:max-w-md md:max-w-lg">
              <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2 sm:mb-4" style={{ fontFamily: 'monospace' }}>
                INSTRUCCIONES
              </h2>
              <div className="p-4 sm:p-5 md:p-6 rounded border-2" style={{ backgroundColor: '#1a1a1a', borderColor: '#4a4a4a' }}>
                <p className="text-white text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'monospace' }}>
                  ⬅️ ➡️ MOVER
                </p>
                <p className="text-white text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'monospace' }}>
                  ESPACIO / ⬆️ SALTAR
                </p>
                <p className="text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'monospace', color: '#ffd700' }}>
                  GOLPEA BLOQUES ? DESDE ABAJO
                </p>
                <p className="text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'monospace', color: '#4ade80' }}>
                  RECOLECTA TESTIMONIOS 📜
                </p>
                <p className="text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'monospace', color: '#90EE90' }}>
                  SALTA SOBRE TORTUGAS 🐢
                </p>
                <p className="text-base sm:text-lg mb-2 sm:mb-3" style={{ fontFamily: 'monospace', color: '#FF0000' }}>
                  COME HONGOS = +1 VIDA 🍄
                </p>
                <p className="text-base sm:text-lg" style={{ fontFamily: 'monospace', color: '#22d3ee' }}>
                  EVITA AL BOO 👻
                </p>
              </div>
              <button
                onClick={startGame}
                className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-xl sm:text-2xl rounded border-2 sm:border-4 border-green-400 transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'monospace' }}
              >
                🎮 START
              </button>
            </div>
          </div>
        )}

        {victory && (
          <div className="absolute inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}>
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 rounded border-2 sm:border-4 text-center space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-[95%] sm:max-w-md md:max-w-lg" style={{ backgroundColor: '#1a1a1a', borderColor: '#ffd700' }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400" style={{ fontFamily: 'monospace' }}>
                STAGE CLEAR!
              </h2>
              <div className="p-3 sm:p-4 rounded" style={{ backgroundColor: '#000000' }}>
                <p className="text-white text-xl sm:text-2xl md:text-3xl mb-2" style={{ fontFamily: 'monospace' }}>
                  SCORE: {score}
                </p>
                <p className="text-base sm:text-lg md:text-xl" style={{ fontFamily: 'monospace', color: '#4ade80' }}>
                  TESTIMONIOS: {collectedTestimonials.length}/{testimonialData.length}
                </p>
              </div>
              <button
                onClick={generateCV}
                className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base sm:text-lg md:text-xl rounded border-2 sm:border-4 border-blue-400 transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'monospace' }}
              >
                📄 DOWNLOAD CV
              </button>
              <button
                onClick={startGame}
                className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-sm sm:text-base md:text-lg rounded border-2 sm:border-4 border-green-400 transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'monospace' }}
              >
                🔄 RETRY
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.98)' }}>
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 rounded border-2 sm:border-4 text-center space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-[95%] sm:max-w-md" style={{ backgroundColor: '#1a1a1a', borderColor: '#ef4444' }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ fontFamily: 'monospace', color: '#ef4444' }}>
                GAME OVER
              </h2>
              <div className="p-3 sm:p-4 rounded" style={{ backgroundColor: '#000000' }}>
                <p className="text-white text-xl sm:text-2xl md:text-3xl" style={{ fontFamily: 'monospace' }}>
                  SCORE: {score}
                </p>
              </div>
              <button
                onClick={startGame}
                className="w-full px-6 sm:px-8 md:px-12 py-3 sm:py-3.5 md:py-4 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-lg sm:text-xl md:text-2xl rounded border-2 sm:border-4 border-green-400 transition-all hover:scale-105 active:scale-95"
                style={{ fontFamily: 'monospace' }}
              >
                🔄 CONTINUE
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-6 text-center text-gray-400 px-4" style={{ fontFamily: 'monospace' }}>
        <p className="text-xs sm:text-sm md:text-base">© 2024 SUPER PEACH BROS.</p>
      </div>
    </div>
  )
}