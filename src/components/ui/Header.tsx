"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useTheme, useI18n } from '../../app/providers'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const { t, lang, toggleLang } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#mygame', label: t('nav.mygame') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">👻</span>
            <span className="text-xl font-bold text-gradient animate-glow">
              Ghost Portfolio
              By Camila Bastidas
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="nav-link"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-md text-white/90 hover:text-ghost-purple transition-colors"
              aria-label={theme === 'light' ? t('actions.theme.light') : t('actions.theme.dark')}
              title={theme === 'light' ? t('actions.theme.light') : t('actions.theme.dark')}
            >
              {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="ml-2 px-2 py-1 rounded-md bg-white/5 text-sm text-white/90 hover:bg-white/10 transition-colors"
              aria-label={t('actions.language')}
              title={t('actions.language')}
            >
              <div className="flex items-center space-x-2">
                <Globe size={16} />
                <span className="uppercase">{lang}</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-xl rounded-lg mt-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-2 text-white/90 hover:text-ghost-purple transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile controls */}
              <div className="flex items-center justify-between px-3 pt-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-white/90 hover:text-ghost-purple transition-colors"
                >
                  {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button
                  onClick={toggleLang}
                  className="px-3 py-1 rounded-md bg-white/5 text-sm text-white/90 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Globe size={16} />
                    <span className="uppercase">{lang}</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header
