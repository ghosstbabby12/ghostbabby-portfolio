// src/components/shared/Button.tsx
'use client'

import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

// Define the base button props by omitting the 'disabled' property from Framer Motion's button props.
// This is done to prevent the type conflict.
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'disabled'> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  loading?: boolean;
  leftIcon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  className?: string;
  href?: string;
  target?: string;
  animate?: boolean;
  // Add the 'disabled' property back with the correct type.
  disabled?: boolean; 
}

const Button = ({
  children,
  variant = 'default',
  size = 'default',
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
  href,
  target,
  animate = true,
  disabled,
  ...props
}: ButtonProps) => {

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return `
          bg-gradient-to-r from-ghost-purple to-ghost-pink text-white
          hover:from-ghost-purple/90 hover:to-ghost-pink/90
          shadow-lg shadow-ghost-purple/25 hover:shadow-ghost-purple/40
        `
      case 'secondary':
        return `
          bg-white/10 text-white border border-white/20
          hover:bg-white/20 hover:border-white/30
          backdrop-blur-xl
        `
      case 'outline':
        return `
          border-2 border-ghost-purple text-ghost-purple bg-transparent
          hover:bg-ghost-purple hover:text-white
          relative overflow-hidden
        `
      case 'ghost':
        return `
          bg-transparent text-white/90 hover:text-white
          hover:bg-white/10
        `
      case 'link':
        return `
          bg-transparent text-ghost-purple hover:text-ghost-pink
          underline-offset-4 hover:underline
        `
      default:
        return `
          bg-white/5 text-white border border-white/10
          hover:bg-white/10 hover:border-white/20
          backdrop-blur-xl
        `
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm rounded-lg'
      case 'lg':
        return 'px-8 py-4 text-lg rounded-2xl'
      case 'icon':
        return 'p-3 rounded-full'
      default:
        return 'px-6 py-3 text-base rounded-xl'
    }
  }

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.42, 0, 0.58, 1]
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }

  const buttonContent = (
    <>
      {variant === 'outline' && (
        <span className="absolute inset-0 bg-gradient-to-r from-ghost-purple to-ghost-pink transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></span>
      )}
      
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      )}
      
      {LeftIcon && !loading && (
        <LeftIcon className="w-4 h-4 mr-2" />
      )}
      
      <span className={cn(
        "relative z-10 transition-all duration-300",
        loading && "opacity-75"
      )}>
        {children}
      </span>
      
      {RightIcon && !loading && (
        <RightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center font-medium",
    "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ghost-purple/50",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
    getSizeStyles(),
    getVariantStyles(),
    className
  )

  if (href) {
    const LinkComponent = motion.a
    return (
      <LinkComponent
        href={href}
        target={target}
        className={baseClasses}
        variants={animate ? buttonVariants as Variants : undefined}
        initial={animate ? "initial" : undefined}
        whileHover={animate && !disabled ? "hover" : undefined}
        whileTap={animate && !disabled ? "tap" : undefined}
      >
        {buttonContent}
      </LinkComponent>
    )
  }

  return (
    <motion.button
      className={baseClasses}
      variants={animate ? buttonVariants as Variants : undefined}
      initial={animate ? "initial" : undefined}
      whileHover={animate && !disabled && !loading ? "hover" : undefined}
      whileTap={animate && !disabled && !loading ? "tap" : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {buttonContent}
    </motion.button>
  )
}

export const ButtonGroup = ({
  children,
  className,
  vertical = false
}: {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
}) => (
  <div className={cn(
    "flex gap-3",
    vertical ? "flex-col" : "flex-row flex-wrap justify-center items-center",
    className
  )}>
    {children}
  </div>
)

export const FloatingActionButton = ({
  children,
  className,
  ...props
}: ButtonProps) => (
  <Button
    variant="primary"
    size="icon"
    className={cn(
      "fixed bottom-6 right-6 z-50 shadow-2xl shadow-ghost-purple/30",
      "hover:shadow-2xl hover:shadow-ghost-purple/50",
      className
    )}
    {...props}
  >
    {children}
  </Button>
)

export const IconButton = ({
  icon: Icon,
  className,
  size = 'default',
  ...props
}: Omit<ButtonProps, 'children'> & {
  icon: React.ComponentType<any>;
}) => (
  <Button
    size="icon"
    variant="ghost"
    className={cn("rounded-full", className)}
    {...props}
  >
    <Icon className={cn(
      size === 'sm' ? 'w-4 h-4' : 
      size === 'lg' ? 'w-6 h-6' : 
      'w-5 h-5'
    )} />
  </Button>
)

export default Button