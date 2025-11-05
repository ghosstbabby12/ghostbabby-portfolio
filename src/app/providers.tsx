"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

// THEME
export type Theme = "dark" | "light" | "system"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")

  // Detectar preferencias del sistema
  const getSystemTheme = (): "dark" | "light" => {
    if (typeof window === "undefined") return "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  // Inicializar tema desde localStorage o usar system por defecto
  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null
      if (stored === "light" || stored === "dark" || stored === "system") {
        setTheme(stored)
      } else {
        setTheme("system")
      }
    } catch {}
  }, [])

  // Aplicar tema al DOM y escuchar cambios en las preferencias del sistema
  useEffect(() => {
    const root = document.documentElement

    // Función para aplicar el tema efectivo
    const applyTheme = (effectiveTheme: "dark" | "light") => {
      if (effectiveTheme === "light") {
        root.classList.add("light")
      } else {
        root.classList.remove("light")
      }
    }

    // Determinar el tema efectivo
    const effectiveTheme = theme === "system" ? getSystemTheme() : theme
    applyTheme(effectiveTheme)

    // Guardar en localStorage
    try {
      localStorage.setItem("theme", theme)
    } catch {}

    // Si el tema es "system", escuchar cambios en las preferencias del sistema
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light")
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((t) => {
        if (t === "dark") return "light"
        if (t === "light") return "system"
        return "dark"
      })
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

// I18N
export type Lang = "es" | "en"

interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const DICTIONARY = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      experience: "Experiencia",
      mygame: "Juego",
      gallery: "Galería",
      contact: "Contacto",
    },
    actions: {
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
      scrollTop: "Volver arriba",
      theme: {
        light: "Modo Claro",
        dark: "Modo Oscuro",
        system: "Modo Sistema",
      },
      language: "Idioma",
    },

    hero: {
      welcome: "¡Bienvenido!",
      intro: {
        part1: "Este portafolio es una experiencia interactiva donde puedes ",
        unlock: "desbloquear niveles",
        part2: ", descubrir ",
        hidden: "secciones ocultas",
        part3: " ver el detalle de mi experiencia laboral y mi proceso de crecimiento. Diviertete!"
      },
      builtWith: "Construido con:",
      strudel: {
        title: "Strudel Live Coding",
        description: "Experimenta con música generativa y live coding"
      }
    },

    sections: {
      aboutTitle: "Sobre Mí",
      projectsTitle: "Mis Proyectos",
      contactTitle: "Contáctame",
    },
    experience: {
      title: "Experiencia",
      subtitle: "Mi trayectoria en el desarrollo de software y aprendizaje continuo",
      items: {
        student: {
          title: "Estudiante de Ingeniería de Software",
          company: "UNIVERSIDAD COOPERATIVA DE COLOMBIA",
          period: "2021 - Actualidad",
          description: "Formación académica en desarrollo de software, algoritmos, estructuras de datos, bases de datos y metodologías ágiles. Participación activa en proyectos académicos y competencias de programación."
        },
        developer: {
          title: "Desarrolladora Full Stack",
          company: "Proyectos Freelance",
          period: "2023 - Actualidad",
          description: "Desarrollo de aplicaciones web modernas utilizando Next.js, React, TypeScript y Tailwind CSS. Creación de experiencias interactivas y portafolios gamificados con enfoque en UX/UI."
        },
        projects: {
          title: "Creadora de Proyectos Interactivos",
          company: "Portfolio Personal",
          period: "2022 - Actualidad",
          description: "Diseño y desarrollo de experiencias web únicas inspiradas en videojuegos retro. Implementación de sistemas de gamificación, música generativa con Strudel y elementos interactivos creativos."
        },
        achievements: {
          title: "Logros y Aprendizaje",
          company: "Desarrollo Continuo",
          period: "2021 - Actualidad",
          description: "Dominio de múltiples tecnologías modernas, participación en comunidades de desarrollo, creación de proyectos que combinan arte, música y programación. Inspiración constante de los juegos retro y la cultura gamer."
        }
      }
    },
    mygame: {
      title: "Juego",
      subtitle: "Disfruta de una versión arcade interactiva integrada en mi portfolio",
      header: {
        score: "PUNTAJE",
        level: "NIVEL",
        credits: "CRÉDITOS",
        selectGame: "SELECCIONA UN JUEGO"
      }
    },
    contact: {
      title: "Contáctame",
      subtitle: "¿Tienes una idea, proyecto o colaboración? Escríbeme y lo hablamos 🚀",
      social: "Sígueme en mis redes sociales",
      submit: "Enviar Mensaje",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      placeholderName: "Tu nombre",
      placeholderEmail: "tu@email.com",
      placeholderMessage: "Escribe tu mensaje...",
      cta: "¿Tienes una idea, proyecto o colaboración? Escríbeme y lo hablamos 🚀"
    },
    projects: {
      description: "Una selección de proyectos que demuestran mis habilidades en desarrollo web, desde aplicaciones empresariales hasta experiencias interactivas creativas."
    },
    about: {
      title: "Sobre Mí",
      greeting: "¡Hola! Soy",
      name: "Camila Bastidas",
      bio: "Estudiante de Ingeniería de Software de 21 años apasionada por crear experiencias digitales únicas que combinan tecnología, arte y creatividad.",
      inspiration: "Mi inspiración viene de",
      tetrisGames: "los juegos retro",
      inspirationEnd: "que me enseñaron que lo simple puede ser extraordinario.",
      
      interestsTitle: "✨ Mis Pasiones",
      interests: {
        music: "Música",
        art: "Arte",
        cooking: "Cocina",
        gaming: "Videojuegos",
        sports: "Deporte",
        coding: "Programación"
      },
      
      statsTitle: "📊 En Números",
      stats: {
        age: "Años",
        exp: "Años de Experiencia",
        projects: "Proyectos Completados",
        tech: "Tecnologías Dominadas"
      },
      
      cards: {
        mission: {
          title: "Mi Misión",
          description: "Transformar ideas creativas en soluciones digitales que inspiren y generen impacto real en la vida de las personas."
        },
        approach: {
          title: "Mi Enfoque",
          description: "Combino el pensamiento lógico de la ingeniería con la creatividad del arte para crear experiencias web memorables."
        },
        passion: {
          title: "Mi Pasión",
          description: "Aprender constantemente, experimentar con nuevas tecnologías y crear proyectos que conecten la nostalgia retro con el futuro digital."
        }
      }
    },
    pacman: {
      title: "👻 GHOST-MAN",
      score: "Puntaje",
      lives: "Vidas",
      cherries: "Cerezas",
      instructions: "Usa las flechas ⬆️⬇️⬅️➡️ para moverte",
      galleryButton: "🍒 Galería 👁️✨",
      won: "¡GANASTE! 🎉",
      gameOver: "GAME OVER 👻",
      playAgain: "Jugar de nuevo",
      retry: "Reintentar",
      card: {
        title: "PAC-MAN",
        description: "Una reinterpretación de la acción clásica arcade, donde cada píxel devorado cuenta para algo más.",
        pressToStart: "PRESIONA PARA INICIAR",
        startButton: "START",
        codeButton: "</> Código",
        demoButton: "↗ Demo"
      }
    },
    boo: {
      title: "👻 GHOST HOUSE",
      startTip: "¡CUIDADO CON LOS BOOS!",
      controls: "Usa las flechas para moverte — ⬆️ o ESPACIO para saltar",
      start: "START",
      card: {
        title: "BOO MARIO BROS",
        description: "Un spin-off retrofuturista inspirado en los enemigos de Mario, donde el jugador controla a Boo en un mundo oscuro y brillante.",
        pressToStart: "PRESIONA PARA INICIAR",
        startButton: "START",
        codeButton: "</> Código",
        demoButton: "↗ Demo"
      }
    },
    gallery: {
      title: "🎭 Galería secreta",
      description: "Aquí puedes ver las imágenes, recuerdos y momentos desbloqueados al completar el juego.",
      back: "Volver al inicio"
    },
    interactiveGallery: {
      title: "Galería Interactiva",
      subtitle: "Explora mi lado más personal 💫 — cada categoría revela momentos de mi vida si respondes correctamente las preguntas de desarrollo web.",
      locked: "Sección Bloqueada",
      unlocked: "Sección Desbloqueada",
      unlock: "🔓 Desbloquear",
      placeholder: "Escribe tu respuesta...",
      wrongAnswer: "❌ Respuesta incorrecta. ¡Inténtalo de nuevo!",
      backToHome: "Volver al Inicio",
      categories: {
        videoGames: {
          title: "Video Games",
          emoji: "🎮",
          question: "Comando para ejecutar un proyecto en Next.js"
        },
        food: {
          title: "Food",
          emoji: "🍔",
          question: "Lenguaje de programación para el frontend web (tres letras)"
        },
        friends: {
          title: "Hommies",
          emoji: "👯",
          question: "¿Qué método HTTP se usa para enviar datos al servidor?"
        },
        trips: {
          title: "Trips",
          emoji: "✈️",
          question: "Framework de CSS usado en este proyecto (nombre completo)"
        },
        hobbies: {
          title: "Hobbies",
          emoji: "🎨",
          question: "Sistema de control de versiones más popular"
        }
      }
    }
  },
  en: {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    mygame: "Game",
    gallery: "Gallery",
    contact: "Contact",
  },
  actions: {
    viewProjects: "View Projects",
    contactMe: "Contact me",
    scrollTop: "Back to top",
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
      system: "System Mode",
    },
    language: "Language",
  },
  hero: {
    welcome: "Welcome my portfolio!",
    intro: {
      part1: "This portfolio is a unique interactive experience where you can ",
      unlock: "unlock levels",
      part2: ", discover ",
      hidden: "hidden sections",
      part3: " and explore my projects in a gamified way. Every visit is an adventure!"
    },
    builtWith: "Built with:",
    strudel: {
      title: "Strudel Live Coding",
      description: "Experience generative music and live coding"
    }
  },
  sections: {
    aboutTitle: "About Me",
    projectsTitle: "My Projects",
    contactTitle: "Contact Me",
  },
  experience: {
    title: "Experience",
    subtitle: "My journey in software development and continuous learning",
    items: {
      student: {
        title: "Software Engineering Student",
        company: "UNIVERSIDAD COOPERATIVA DE COLOMBIA",
        period: "2021 - Present",
        description: "Academic training in software development, algorithms, data structures, databases and agile methodologies. Active participation in academic projects and programming competitions."
      },
      developer: {
        title: "Full Stack Developer",
        company: "Freelance Projects",
        period: "2023 - Present",
        description: "Development of modern web applications using Next.js, React, TypeScript and Tailwind CSS. Creation of interactive experiences and gamified portfolios with focus on UX/UI."
      },
      projects: {
        title: "Interactive Projects Creator",
        company: "Personal Portfolio",
        period: "2022 - Present",
        description: "Design and development of unique web experiences inspired by retro video games. Implementation of gamification systems, generative music with Strudel and creative interactive elements."
      },
      achievements: {
        title: "Achievements & Learning",
        company: "Continuous Development",
        period: "2021 - Present",
        description: "Mastery of multiple modern technologies, participation in development communities, creation of projects that combine art, music and programming. Constant inspiration from retro games and gamer culture."
      }
    }
  },
  mygame: {
    title: "Game",
    subtitle: "Enjoy an interactive arcade version embedded in my portfolio",
    header: {
      score: "SCORE",
      level: "LEVEL",
      credits: "CREDITS",
      selectGame: "SELECT GAME"
    }
  },
  contact: {
    title: "Contact Me",
    subtitle: "Got an idea, project or collaboration? Write to me and let's talk 🚀",
    social: "Follow me on social media",
    submit: "Send Message",
    name: "Name",
    email: "Email",
    message: "Message",
    placeholderName: "Your name",
    placeholderEmail: "you@email.com",
    placeholderMessage: "Write your message...",
    cta: "Got an idea, project or collaboration? Write to me and let's talk 🚀"
  },
  projects: {
    description: "A selection of projects that showcase my web development skills, from enterprise apps to interactive creative experiences."
  },
  about: {
    title: "About Me",
    greeting: "Hi! I'm",
    name: "Camila Bastidas",
    bio: "21-year-old Software Engineering student passionate about creating unique digital experiences that blend technology, art, and creativity.",
    inspiration: "My inspiration comes from",
    tetrisGames: "retro games",
    inspirationEnd: "that taught me that simplicity can be extraordinary.",
    
    interestsTitle: "✨ My Passions",
    interests: {
      music: "Music",
      art: "Art",
      cooking: "Cooking",
      gaming: "Gaming",
      sports: "Sports",
      coding: "Coding"
    },
    
    statsTitle: "📊 By The Numbers",
    stats: {
      age: "Years Old",
      exp: "Years of Experience",
      projects: "Completed Projects",
      tech: "Technologies Mastered"
    },
    
    cards: {
      mission: {
        title: "My Mission",
        description: "Transform creative ideas into digital solutions that inspire and generate real impact on people's lives."
      },
      approach: {
        title: "My Approach",
        description: "I combine the logical thinking of engineering with the creativity of art to create memorable web experiences."
      },
      passion: {
        title: "My Passion",
        description: "Constantly learning, experimenting with new technologies, and creating projects that connect retro nostalgia with the digital future."
      }
    },
    missionTitle: "My Mission",
    missionDesc: "Turning innovative ideas into digital solutions that positively impact user experience and deliver real business value.",
    approachTitle: "My Approach",
    approachDesc: "I combine creativity and technology to build modern, scalable, user-centered web applications following best practices.",
    passionTitle: "My Passion",
    passionDesc: "Continuously learning new technologies and methodologies to stay at the forefront of web development and deliver innovative solutions."
  },
  pacman: {
    title: "👻 GHOST-MAN",
    score: "Score",
    lives: "Lives",
    cherries: "Cherries",
    instructions: "Use arrows ⬆️⬇️⬅️➡️ to move",
    galleryButton: "🍒 Gallery 👁️✨",
    won: "YOU WIN! 🎉",
    gameOver: "GAME OVER 👻",
    playAgain: "Play again",
    retry: "Retry",
    card: {
      title: "PAC-MAN",
      description: "A reimagining of the classic arcade action, where every devoured pixel counts for something more.",
      pressToStart: "PRESS TO START",
      startButton: "START",
      codeButton: "</> Code",
      demoButton: "↗ Demo"
    }
  },
  boo: {
    title: "👻 GHOST HOUSE",
    startTip: "WATCH OUT FOR BOOS!",
    controls: "Use arrows to move — ⬆️ or SPACE to jump",
    start: "START",
    card: {
      title: "BOO MARIO BROS",
      description: "A retrofuturistic spin-off inspired by Mario's enemies, where the player controls Boo in a dark and bright world.",
      pressToStart: "PRESS TO START",
      startButton: "START",
      codeButton: "</> Code",
      demoButton: "↗ Demo"
    }
  },
  gallery: {
    title: "🎭 Secret gallery",
    description: "Here you can see images, memories and moments unlocked after finishing the game.",
    back: "Back to home"
  },
  interactiveGallery: {
    title: "Interactive Gallery",
    subtitle: "Explore my personal side 💫 — each category reveals moments of my life if you answer the web development questions correctly.",
    locked: "Locked Section",
    unlocked: "Unlocked Section",
    unlock: "🔓 Unlock",
    placeholder: "Write your answer...",
    wrongAnswer: "❌ Wrong answer. Try again!",
    backToHome: "Back to Home",
    categories: {
      videoGames: {
        title: "Video Games",
        emoji: "🎮",
        question: "Command to run a Next.js project"
      },
      food: {
        title: "Food",
        emoji: "🍔",
        question: "Programming language for web frontend (three letters)"
      },
      friends: {
        title: "Hommies",
        emoji: "👯",
        question: "What HTTP method is used to send data to the server?"
      },
      trips: {
        title: "Trips",
        emoji: "✈️",
        question: "CSS framework used in this project (full name)"
      },
      hobbies: {
        title: "Hobbies",
        emoji: "🎨",
        question: "Most popular version control system"
      }
    }
  }
}
} as const

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc: any, key: string) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")

  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null
      if (stored === "es" || stored === "en") {
        setLang(stored)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang)
    } catch {}

    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es")
  }, [lang])

  const t = (key: string) => {
    const value = getByPath(DICTIONARY[lang], key)
    return typeof value === "string" ? value : key
  }

  const value = useMemo(() => ({ lang, setLang, toggleLang: () => setLang((l) => (l === "es" ? "en" : "es")), t }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}