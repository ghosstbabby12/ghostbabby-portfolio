'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { useI18n, useTheme } from '../../app/providers'
import { Linkedin, Github, Instagram } from 'lucide-react'

// Iconos personalizados para X (Twitter) y Vercel
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const VercelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2L2 19.777h20L12 2z"/>
  </svg>
)

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const Contact = () => {
  const { t } = useI18n()
  const { actualTheme } = useTheme()

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/camila-bastidas-2574b4363/',
      icon: Linkedin
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ghosstbabby12',
      icon: Github
    },
    {
      name: 'X',
      url: 'https://x.com/ghosstbabby',
      icon: XIcon
    },
    {
      name: 'Vercel',
      url: 'https://vercel.com/camila-bastidas-projects/',
      icon: VercelIcon
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ghosstbabby/',
      icon: Instagram
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/user/31k4nhz2uwndcdpafnakc64tt4ti?si=26316620a4f24f1c',
      icon: SpotifyIcon
    }
  ]

  return (
    <Section id="contact" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
          {t('contact.title')}
        </h2>
        <p className={`text-center mb-12 ${
          actualTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {t('contact.subtitle')}
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            {/* Nombre */}
            <label className={`block text-sm font-medium mb-2 ${
              actualTheme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {t('contact.name')}
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${
                actualTheme === 'light'
                  ? 'bg-white border-purple-300 text-gray-900 placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                  : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-ghost-purple/50'
              }`}
            />
          </div>

          <div>
            {/* Email */}
            <label className={`block text-sm font-medium mb-2 ${
              actualTheme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {t('contact.email')}
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 ${
                actualTheme === 'light'
                  ? 'bg-white border-purple-300 text-gray-900 placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                  : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-ghost-purple/50'
              }`}
            />
          </div>

          <div>
            {/* Mensaje */}
            <label className={`block text-sm font-medium mb-2 ${
              actualTheme === 'light' ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {t('contact.message')}
            </label>
            <textarea
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 resize-none ${
                actualTheme === 'light'
                  ? 'bg-white border-purple-300 text-gray-900 placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                  : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-ghost-purple/50'
              }`}
            />
          </div>

          {/* Botón */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-6 rounded-xl font-semibold text-lg bg-card-gradient text-white shadow-lg hover:shadow-2xl hover:shadow-ghost-purple/30 transition-all"
          >
            {t('contact.submit')}
          </motion.button>
        </motion.form>

        {/* Redes Sociales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className={`mt-12 pt-8 border-t ${
            actualTheme === 'light' ? 'border-gray-300' : 'border-white/10'
          }`}
        >
          <p className={`text-center mb-6 text-sm ${
            actualTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {t('contact.social') || 'Sígueme en mis redes sociales'}
          </p>
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-ghost-purple text-ghost-purple transition-all duration-300 hover:text-white hover:shadow-lg hover:shadow-ghost-purple/30 overflow-hidden"
                  aria-label={social.name}
                >
                  <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  <IconComponent />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default Contact