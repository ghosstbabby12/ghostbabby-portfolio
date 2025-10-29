'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { useI18n } from '../../app/providers'

const Contact = () => {
  const { t } = useI18n()

  return (
    <Section
      id="contact"
      title={t('sections.contactTitle')}
      subtitle={t('contact.cta')}
      background="gradient"
      padding="lg"
      centerContent
    >
      <motion.form
        className="w-full max-w-2xl mx-auto space-y-6 
                   bg-white/40 dark:bg-white/5 
                   backdrop-blur-md rounded-2xl p-8 shadow-xl 
                   border border-gray-300 dark:border-white/10 
                   transition-all duration-300"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
            {t('contact.name')}
          </label>
          <input
            type="text"
            id="name"
            placeholder={t('contact.placeholderName')}
            className="w-full px-4 py-3 rounded-xl 
                       bg-white/70 dark:bg-white/10 
                       border border-gray-400 dark:border-white/20 
                       text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-white/50 
                       focus:outline-none focus:ring-2 
                       focus:ring-ghost-purple 
                       transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
            {t('contact.email')}
          </label>
          <input
            type="email"
            id="email"
            placeholder={t('contact.placeholderEmail')}
            className="w-full px-4 py-3 rounded-xl 
                       bg-white/70 dark:bg-white/10 
                       border border-gray-400 dark:border-white/20 
                       text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-white/50 
                       focus:outline-none focus:ring-2 
                       focus:ring-ghost-pink 
                       transition-all duration-200"
          />
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder={t('contact.placeholderMessage')}
            className="w-full px-4 py-3 rounded-xl 
                       bg-white/70 dark:bg-white/10 
                       border border-gray-400 dark:border-white/20 
                       text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-white/50 
                       focus:outline-none focus:ring-2 
                       focus:ring-ghost-blue resize-none 
                       transition-all duration-200"
          />
        </div>

        {/* Botón */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 rounded-xl font-semibold text-lg 
                     text-white bg-gradient-to-r from-ghost-purple via-ghost-pink to-ghost-blue 
                     shadow-lg hover:shadow-2xl transition-all"
        >
          {t('contact.submit')}
        </motion.button>
      </motion.form>
    </Section>
  )
}

export default Contact
