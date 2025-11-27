export const getThemeClass = (actualTheme: 'light' | 'dark', lightClass: string, darkClass: string): string => {
  return actualTheme === 'light' ? lightClass : darkClass
}

export const getThemeColor = (actualTheme: 'light' | 'dark', lightColor: string, darkColor: string): string => {
  return actualTheme === 'light' ? lightColor : darkColor
}

export const inputClasses = (actualTheme: 'light' | 'dark') => `
  w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2
  ${actualTheme === 'light'
    ? 'bg-white border-purple-300 text-gray-900 placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
    : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-ghost-purple/50'
  }
`.trim()

export const labelClasses = (actualTheme: 'light' | 'dark') =>
  `block text-sm font-medium mb-2 ${actualTheme === 'light' ? 'text-gray-700' : 'text-gray-300'}`

export const textClasses = (actualTheme: 'light' | 'dark') =>
  actualTheme === 'light' ? 'text-gray-600' : 'text-gray-400'

export const borderClasses = (actualTheme: 'light' | 'dark') =>
  actualTheme === 'light' ? 'border-gray-300' : 'border-white/10'
