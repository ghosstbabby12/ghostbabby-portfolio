"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

// THEME
export type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null
      if (stored === "light" || stored === "dark") {
        setTheme(stored)
      } else {
        setTheme("dark")
      }
    } catch {}
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") root.classList.add("light")
    else root.classList.remove("light")
    try {
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")) }),
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
      mygame: "Mi Juego",
      contact: "Contacto",
    },
    actions: {
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
      scrollTop: "Volver arriba",
      theme: {
        light: "Modo Claro",
        dark: "Modo Oscuro",
      },
      language: "Idioma",
    },

    hero: {
      welcome: "¡Bienvenido!",

      title: "Developer Full Stack",
      intro: {
        part1: "Mi portafolio es una experiencia interactiva donde puedes ",
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
      subtitle: "Un recorrido por mi experiencia profesional y académica"
    },
    mygame: {
      title: "Mi Juego",
      subtitle: "Disfruta de una versión arcade interactiva integrada en mi portfolio"
    },
    contact: {
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
      retry: "Reintentar"
    },
    boo: {
      title: "👻 GHOST HOUSE",
      startTip: "¡CUIDADO CON LOS BOOS!",
      controls: "Usa las flechas para moverte — ⬆️ o ESPACIO para saltar",
      start: "START"
    },
    gallery: {
      title: "🎭 Galería secreta",
      description: "Aquí puedes ver las imágenes, recuerdos y momentos desbloqueados al completar el juego.",
      back: "Volver al inicio"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      mygame: "My Game",
      contact: "Contact",
    },
    actions: {
      viewProjects: "View Projects",
      contactMe: "Contact me",
      scrollTop: "Back to top",
      theme: {
        light: "Light Mode",
        dark: "Dark Mode",
      },
      language: "Language",
    },

    hero: {
      welcome: "Welcome!",
      title: "Full Stack Developer",
      intro: {
        part1: " My portfolio is an interactive experience where you can",
        unlock: "unlock levels",
        part2: ", discover ",
        hidden: "hidden sections",
        part3: " view details of my work experience and my growth process.. Have fun!"
      },
      builtWith: "Built with:",
      strudel: {
        title: "Strudel Live Coding",
        description: "Experience generative music and live coding"
      }
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

    sections: {
      aboutTitle: "About Me",
      projectsTitle: "My Projects",
      contactTitle: "Contact Me",
    },
    experience: {
      title: "Experience",
      subtitle: "A journey through my professional and academic experience"
    },
    mygame: {
      title: "My Game",
      subtitle: "Enjoy an interactive arcade version embedded in my portfolio"
    },
    contact: {
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
      retry: "Retry"
    },
    boo: {
      title: "👻 GHOST HOUSE",
      startTip: "WATCH OUT FOR BOOS!",
      controls: "Use arrows to move — ⬆️ or SPACE to jump",
      start: "START"
    },
    gallery: {
      title: "🎭 Secret gallery",
      description: "Here you can see images, memories and moments unlocked after finishing the game.",
      back: "Back to home"
    }
  },
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