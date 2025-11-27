import { Music, Palette, Coffee, Gamepad2, Dumbbell, Code2 } from 'lucide-react'

export interface Interest {
  icon: any
  labelKey: string
  gradient: string
  link: string | null
}

export const interests: Interest[] = [
  {
    icon: Music,
    labelKey: 'about.interests.music',
    gradient: "from-purple-500 to-pink-500",
    link: "/strudel"
  },
  {
    icon: Palette,
    labelKey: 'about.interests.art',
    gradient: "from-pink-500 to-red-500",
    link: null
  },
  {
    icon: Coffee,
    labelKey: 'about.interests.cooking',
    gradient: "from-amber-500 to-orange-500",
    link: null
  },
  {
    icon: Gamepad2,
    labelKey: 'about.interests.gaming',
    gradient: "from-blue-500 to-purple-500",
    link: "#mygame"
  },
  {
    icon: Dumbbell,
    labelKey: 'about.interests.sports',
    gradient: "from-green-500 to-emerald-500",
    link: null
  },
  {
    icon: Code2,
    labelKey: 'about.interests.coding',
    gradient: "from-cyan-500 to-blue-500",
    link: "#projects"
  }
]

export interface TechCategory {
  titleKey: string
  items: TechItem[]
}

export interface TechItem {
  name: string
  color: string
  textColor?: string
  emoji?: string
  borderColor?: string
  specialAnimation?: boolean
}

export const techCategories: TechCategory[] = [
  {
    titleKey: 'Languages',
    items: [
      { name: 'Java', color: '#b07219', textColor: '#ffffff' },
      { name: '🐍 Python', color: '#3776ab', textColor: '#ffffff' },
      { name: 'C++', color: '#00599c', textColor: '#ffffff' },
      { name: 'C#', color: '#239120', textColor: '#ffffff' },
      { name: 'JavaScript', color: '#f7df1e', textColor: '#000000' },
      { name: 'TypeScript', color: '#3178c6', textColor: '#ffffff' }
    ]
  },
  {
    titleKey: 'Frontend',
    items: [
      { name: 'HTML5', color: '#e34f26', textColor: '#ffffff' },
      { name: 'CSS3', color: '#1572b6', textColor: '#ffffff' },
      { name: '⚛️ React', color: '#61dafb', textColor: '#282c34', specialAnimation: true },
      { name: 'Bootstrap', color: '#7952b3', textColor: '#ffffff' }
    ]
  },
  {
    titleKey: 'Backend & Database',
    items: [
      { name: 'Node.js', color: '#339933', textColor: '#ffffff' },
      { name: 'MySQL', color: '#4479a1', textColor: '#ffffff' },
      { name: 'PostgreSQL', color: '#336791', textColor: '#ffffff' },
      { name: '🍃 MongoDB', color: '#47A248', textColor: '#ffffff' },
      { name: 'SQLite', color: '#003B57', textColor: '#ffffff' }
    ]
  },
  {
    titleKey: 'Game Development',
    items: [
      { name: '🎮 Unity', color: '#222222', textColor: '#ffffff', borderColor: '#ffffff' },
      { name: 'Canvas API', color: '#5a5a5a', textColor: '#ffffff' }
    ]
  },
  {
    titleKey: 'Tools & Platform',
    items: [
      { name: 'Git', color: '#f05032', textColor: '#ffffff' },
      { name: 'GitHub', color: '#24292e', textColor: '#ffffff', borderColor: '#ffffff' },
      { name: '▲ Vercel', color: '#000000', textColor: '#ffffff', borderColor: '#ffffff' },
      { name: 'Render', color: '#46E3B7', textColor: '#ffffff' },
      { name: 'Heroku', color: '#430098', textColor: '#ffffff' },
      { name: 'Google Cloud', color: '#4285f4', textColor: '#ffffff' },
      { name: 'Postman', color: '#ff6c37', textColor: '#ffffff' }
    ]
  }
]

export interface Stat {
  number: string
  labelKey: string
}

export const stats: Stat[] = [
  { number: "21", labelKey: 'about.stats.age' },
  { number: "2+", labelKey: 'about.stats.exp' },
  { number: "15+", labelKey: 'about.stats.projects' },
  { number: "10+", labelKey: 'about.stats.tech' }
]

export interface Card {
  titleKey: string
  descriptionKey: string
  emoji: string
}

export const cards: Card[] = [
  {
    titleKey: 'about.cards.mission.title',
    descriptionKey: 'about.cards.mission.description',
    emoji: "🎯"
  },
  {
    titleKey: 'about.cards.approach.title',
    descriptionKey: 'about.cards.approach.description',
    emoji: "💡"
  },
  {
    titleKey: 'about.cards.passion.title',
    descriptionKey: 'about.cards.passion.description',
    emoji: "🚀"
  }
]
