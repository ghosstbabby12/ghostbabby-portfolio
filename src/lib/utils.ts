import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function para combinar clases de Tailwind CSS
 * Combina clsx con tailwind-merge para resolver conflictos de clases
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatear texto para URLs amigables (slugs)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/[\s_-]+/g, '-') // Reemplazar espacios con guiones
    .replace(/^-+|-+$/g, '') // Remover guiones al inicio y final
}

/**
 * Delay/Sleep utility para async functions
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Formatear fechas en español
 */
export function formatDate(date: Date | string, options?: {
  includeTime?: boolean
  format?: 'short' | 'medium' | 'long'
}): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const { includeTime = false, format = 'medium' } = options || {}
  
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : format === 'long' ? 'long' : 'short',
    day: 'numeric',
  }
  
  if (includeTime) {
    formatOptions.hour = '2-digit'
    formatOptions.minute = '2-digit'
  }
  
  return dateObj.toLocaleDateString('es-ES', formatOptions)
}

/**
 * Validar email con regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validar URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Truncar texto con elipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Capitalizar primera letra de cada palabra
 */
export function capitalize(text: string): string {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Generar ID único
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Formatear números con separadores de miles
 */
export function formatNumber(num: number, options?: {
  locale?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}): string {
  const { locale = 'es-ES', ...numberOptions } = options || {}
  return num.toLocaleString(locale, numberOptions)
}

/**
 * Detectar dispositivo móvil
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768
}

/**
 * Detectar modo oscuro del sistema
 */
export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Scroll suave a un elemento
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

/**
 * Copiar texto al clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    return false
  }
}

/**
 * Debounce function para optimizar performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function para limitar ejecuciones
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}


