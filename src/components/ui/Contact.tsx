'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { useI18n, useTheme } from '../../app/providers'
import { SOCIAL_LINKS } from '@/lib/constants'
import { socialIconComponents } from '@/components/shared/SocialIcons'
import { inputClasses, labelClasses, textClasses, borderClasses } from '@/lib/helpers/theme'

const Contact = () => {
  const { t } = useI18n()
  const { actualTheme } = useTheme()

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
        <p className={`text-center mb-12 ${textClasses(actualTheme)}`}>
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
            <label className={labelClasses(actualTheme)}>
              {t('contact.name')}
            </label>
            <input
              type="text"
              className={inputClasses(actualTheme)}
              placeholder={t('contact.placeholderName')}
            />
          </div>

          <div>
            <label className={labelClasses(actualTheme)}>
              {t('contact.email')}
            </label>
            <input
              type="email"
              className={inputClasses(actualTheme)}
              placeholder={t('contact.placeholderEmail')}
            />
          </div>

          <div>
            <label className={labelClasses(actualTheme)}>
              {t('contact.message')}
            </label>
            <textarea
              rows={5}
              className={`${inputClasses(actualTheme)} resize-none`}
              placeholder={t('contact.placeholderMessage')}
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
          className={`mt-12 pt-8 border-t ${borderClasses(actualTheme)}`}
        >
          <p className={`text-center mb-6 text-sm ${textClasses(actualTheme)}`}>
            {t('contact.social')}
          </p>
          <div className="flex justify-center items-center gap-4">
            {SOCIAL_LINKS.map((social, index) => {
              const IconComponent = socialIconComponents[social.name as keyof typeof socialIconComponents]
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
                  aria-label={social.ariaLabel}
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