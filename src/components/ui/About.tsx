'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'
import { Target, Lightbulb, Rocket } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      icon: Target,
      title: "Mi Misión",
      description:
        "Transformar ideas innovadoras en soluciones digitales que impacten positivamente la experiencia del usuario y generen valor real para los negocios.",
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: Lightbulb,
      title: "Mi Enfoque",
      description:
        "Combino creatividad y tecnología para desarrollar aplicaciones web modernas, escalables y centradas en el usuario, siempre siguiendo las mejores prácticas.",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Rocket,
      title: "Mi Pasión",
      description:
        "Aprender constantemente nuevas tecnologías y metodologías para mantenerme a la vanguardia del desarrollo web y ofrecer soluciones innovadoras.",
      gradient: "from-pink-500/20 to-blue-500/20",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut", // válido en Framer Motion
      },
    },
  }

  return (
    <section
      id="sobre-mi"
      className="min-h-screen flex items-center justify-center py-20"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            variants={itemVariants}
          >
            <span className="text-gradient">Sobre Mí</span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Software engineering student with a passion for web development and
            creating seamless user experiences. Skilled in JavaScript, React,
            and Node.js, I enjoy turning complex problems into simple, beautiful,
            and intuitive designs. When I&apos;m not coding, you&apos;ll find me
            exploring the latest tech trends or hiking in nature.
          </motion.p>

          <motion.div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative glass-effect rounded-2xl p-8 h-full card-hover">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-ghost-purple to-ghost-pink mb-6 group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-semibold text-gradient mb-4">
                    {card.title}
                  </h3>

                  <p className="text-white/80 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {[
              { number: "2+", label: "Años de Experiencia" },
              { number: "15+", label: "Proyectos Completados" },
              { number: "10+", label: "Tecnologías Dominadas" },
              { number: "100%", label: "Clientes Satisfechos" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-gradient mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/70 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
