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

  // Initialize from localStorage or system preference
  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null
      if (stored === "light" || stored === "dark") {
        setTheme(stored)
      } else {
        // Default to dark to preserve current look
        setTheme("dark")
      }
    } catch {}
  }, [])

  // Apply class to <html> for light mode and persist
  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
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
      missionTitle: "Mi Misión",
      missionDesc: "Transformar ideas innovadoras en soluciones digitales que impacten positivamente la experiencia del usuario y generen valor real para los negocios.",
      approachTitle: "Mi Enfoque",
      approachDesc: "Combino creatividad y tecnología para desarrollar aplicaciones web modernas, escalables y centradas en el usuario, siempre siguiendo las mejores prácticas.",
      passionTitle: "Mi Pasión",
      passionDesc: "Aprender constantemente nuevas tecnologías y metodologías para mantenerme a la vanguardia del desarrollo web y ofrecer soluciones innovadoras.",
      stats: {
        exp: "Años de Experiencia",
        projects: "Proyectos Completados",
        tech: "Tecnologías Dominadas",
        clients: "Clientes Satisfechos",
      }
    },
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
    about: {
      missionTitle: "My Mission",
      missionDesc: "Turning innovative ideas into digital solutions that positively impact user experience and deliver real business value.",
      approachTitle: "My Approach",
      approachDesc: "I combine creativity and technology to build modern, scalable, user-centered web applications following best practices.",
      passionTitle: "My Passion",
      passionDesc: "Continuously learning new technologies and methodologies to stay at the forefront of web development and deliver innovative solutions.",
      stats: {
        exp: "Years of Experience",
        projects: "Completed Projects",
        tech: "Technologies Mastered",
        clients: "Satisfied Clients",
      }
    },
  },
} as const

function getByPath(obj: any, path: string): string {
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

    // Also update <html lang="...">
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

// Combined Providers
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
