'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '@/lib/helpers/scroll'
import { useI18n } from '@/app/providers'

export default function ScrollToTopButton() {
  const { t } = useI18n()

  return (
    <motion.button
      type="button"
      aria-label={t('actions.scrollTop')}
      className="fixed bottom-8 right-8 bg-ghost-purple/20 backdrop-blur-xl border
                 border-ghost-purple/30 rounded-full p-3 text-ghost-purple
                 hover:bg-ghost-purple hover:text-white transition-all
                 duration-300 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  )
}
