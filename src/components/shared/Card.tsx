'use client'

import { motion, Variants, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { easeInOut } from "framer-motion";
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react';

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: string
  onClick?: () => void
  delay?: number
  variant?: 'default' | 'glass' | 'glow' | 'minimal'
}

const Card = ({ 
  children, 
  className, 
  hover = true,
  gradient,
  onClick,
  delay = 0,
  variant = 'default'
}: CardProps) => {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/5 backdrop-blur-xl border border-white/10'
      case 'glow':
        return 'bg-white/5 backdrop-blur-xl border border-ghost-purple/30 shadow-lg shadow-ghost-purple/10'
      case 'minimal':
        return 'bg-white/3 backdrop-blur-sm border border-white/5'
      default:
        return 'glass-effect'
    }
  }

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: easeInOut 
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? "hover" : undefined}
      className={cn(
        "relative group rounded-2xl p-6 transition-all duration-300 overflow-hidden",
        getVariantStyles(),
        hover && "card-hover cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Gradient Background Effect */}
      {gradient && (
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl",
          gradient
        )}></div>
      )}
      
      {/* Shimmer Effect */}
      <div className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:left-[100%] transition-all duration-1000"></div>
      </div>

      {/* Glow Effect for glow variant */}
      {variant === 'glow' && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ghost-purple/50 to-ghost-pink/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-ghost-purple to-ghost-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-3 left-3 w-1 h-1 bg-gradient-to-br from-ghost-pink to-ghost-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
    </motion.div>
  )
}

// Card Header Component
export const CardHeader = ({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
)

// Card Title Component
export const CardTitle = ({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) => (
  <h3 className={cn("text-xl font-semibold text-gradient mb-2", className)}>
    {children}
  </h3>
)

// Card Description Component
export const CardDescription = ({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) => (
  <p className={cn("text-white/80 leading-relaxed", className)}>
    {children}
  </p>
)

// Card Footer Component
export const CardFooter = ({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) => (
  <div className={cn("mt-6 pt-4 border-t border-white/10", className)}>
    {children}
  </div>
)

// Card Icon Component
export const CardIcon = ({ 
  icon: Icon,
  className,
  size = 24
}: { 
  icon: LucideIcon
  className?: string
  size?: number
}) => (
  <div className={cn(
    "flex items-center justify-center w-12 h-12 rounded-full mb-4",
    "bg-gradient-to-br from-ghost-purple to-ghost-pink",
    "group-hover:scale-110 transition-transform duration-300",
    className
  )}>
    <Icon size={size} className="text-white" />
  </div>
)

export default Card