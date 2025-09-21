'use client'
import { motion, useInView, Variants, easeInOut, easeOut } from "framer-motion"
import { ReactNode, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  containerClassName?: string
  title?: string
  subtitle?: string
  background?: 'default' | 'gradient' | 'particles' | 'none'
  padding?: 'default' | 'sm' | 'lg' | 'xl' | 'none'
  fullHeight?: boolean
  centerContent?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full'
  animate?: boolean
  stagger?: number
}

const Section = ({
  id,
  children,
  className,
  containerClassName,
  title,
  subtitle,
  background = 'default',
  padding = 'default',
  fullHeight = false,
  centerContent = false,
  maxWidth = '6xl',
  animate = true,
  stagger = 0.1
}: SectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.2
  })

  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm': return 'py-12 px-4 sm:px-6 lg:px-8'
      case 'lg': return 'py-32 px-4 sm:px-6 lg:px-8'
      case 'xl': return 'py-40 px-4 sm:px-6 lg:px-8'
      case 'none': return ''
      default: return 'py-20 px-4 sm:px-6 lg:px-8'
    }
  }

  const getBackgroundStyles = () => {
    switch (background) {
      case 'gradient': return 'bg-gradient-to-br from-ghost-purple/5 via-transparent to-ghost-pink/5'
      case 'particles': return 'relative overflow-hidden'
      case 'none': return ''
      default: return 'relative'
    }
  }

  const getMaxWidthStyles = () => {
    const widthMap = {
      'sm': 'max-w-sm',
      'md': 'max-w-md', 
      'lg': 'max-w-lg',
      'xl': 'max-w-xl',
      '2xl': 'max-w-2xl',
      '4xl': 'max-w-4xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      'full': 'max-w-full'
    }
    return widthMap[maxWidth]
  }

  // 🔹 Variants tipados y corregidos
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: stagger,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut // ✅ función en lugar de string
      }
    }
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeInOut // ✅ función en lugar de string
      }
    }
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(
        "relative",
        fullHeight && "min-h-screen",
        centerContent && "flex items-center justify-center",
        getPaddingStyles(),
        getBackgroundStyles(),
        className
      )}
      variants={animate ? containerVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate ? (isInView ? "visible" : "hidden") : undefined}
    >
      {/* Background Effects */}
      {background === 'particles' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ghost-purple/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ghost-pink/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-ghost-blue/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </>
      )}

      <div className={cn(
        "relative z-10 mx-auto",
        getMaxWidthStyles(),
        containerClassName
      )}>
        {/* Section Title */}
        {title && (
          <motion.div 
            className="text-center mb-16"
            variants={animate ? titleVariants : undefined}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{title}</span>
            </h2>
            {subtitle && (
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Section Content */}
        <motion.div variants={animate ? itemVariants : undefined}>
          {children}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ghost-purple/30 to-transparent opacity-0 animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
    </motion.section>
  )
}

export default Section
