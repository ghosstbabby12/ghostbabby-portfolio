'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"

const Contact = () => {
  return (
    <Section
      id="contact"
      title="Contáctame"
      subtitle="¿Tienes una idea, proyecto o colaboración? Escríbeme y lo hablamos 🚀"
      background="gradient"
      padding="lg"
      centerContent
    >
      <motion.form
        className="w-full max-w-2xl mx-auto space-y-6 bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ghost-purple"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Correo
          </label>
          <input
            type="email"
            id="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ghost-pink"
          />
        </div>

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Escribe tu mensaje..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ghost-blue resize-none"
          />
        </div>

        {/* Botón */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-ghost-purple via-ghost-pink to-ghost-blue shadow-lg hover:shadow-2xl transition-all"
        >
          Enviar Mensaje
        </motion.button>
      </motion.form>
    </Section>
  )
}

export default Contact
