'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { useI18n } from '../../app/providers'
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

const Contact = () => {
  const { t } = useI18n()

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/camila-bastidas-riascos-2574b4363',
      icon: Linkedin,
      color: 'hover:text-[#0A66C2]'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ghosstbabby12',
      icon: Github,
      color: 'hover:text-white'
    },
    {
      name: 'Vercel',
      url: 'https://vercel.com/camila-bastidas-projects/',
      icon: VercelIcon,
      color: 'hover:text-white'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ghosstbabby/',
      icon: Instagram,
      color: 'hover:text-[#E4405F]'
    },
    {
      name: 'X',
      url: 'https://x.com/tu-usuario',
      icon: XIcon,
      color: 'hover:text-white'
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-ghost-purple via-ghost-pink to-ghost-blue bg-clip-text text-transparent">
          {t('contact.title')}
        </h2>
        <p className="text-center text-gray-400 mb-12">
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
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.name')}
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 transition-all"
            />
          </div>

          <div>
            {/* Email */}
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 transition-all"
            />
          </div>

          <div>
            {/* Mensaje */}
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('contact.message')}
            </label>
            <textarea
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ghost-purple/50 transition-all resize-none"
            />
          </div>

          {/* Botón */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-6 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-ghost-purple via-ghost-pink to-ghost-blue shadow-lg hover:shadow-2xl transition-all"
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
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-center text-gray-400 mb-6 text-sm">
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
                  className={`p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg`}
                  aria-label={social.name}
                >
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