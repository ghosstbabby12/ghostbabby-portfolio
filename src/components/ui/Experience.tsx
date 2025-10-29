'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { Briefcase, GraduationCap } from "lucide-react"
import { useI18n } from '../../app/providers'

const experiences = [
  {
    id: 1,
    title: "Desarrollador Frontend",
    company: "Tech Solutions",
    period: "2023 - Actualidad",
    description:
      "Construcción de interfaces modernas con React, Next.js y TailwindCSS. Optimización de rendimiento y experiencia de usuario.",
    icon: <Briefcase className="w-6 h-6 text-ghost-purple" />
  },
  {
    id: 2,
    title: "Ingeniero de Software",
    company: "InnovApp",
    period: "2021 - 2023",
    description:
      "Diseño y desarrollo de aplicaciones web escalables. Implementación de autenticación y despliegues en la nube.",
    icon: <Briefcase className="w-6 h-6 text-ghost-pink" />
  },
  {
    id: 3,
    title: "Licenciatura en Ingeniería Informática",
    company: "Universidad X",
    period: "2017 - 2021",
    description:
      "Formación en algoritmos, estructuras de datos, desarrollo web, bases de datos y proyectos colaborativos.",
    icon: <GraduationCap className="w-6 h-6 text-ghost-blue" />
  }
]

const Experience = () => {
  const { t } = useI18n()
  return (
    <Section
      id="experience"
      title={t('experience.title')}
      subtitle={t('experience.subtitle')}
      background="default"
      padding="lg"
    >
      <div className="relative">
        
  

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Punto de la línea */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center bg-ghost-gradient rounded-full shadow-lg z-10">
                {exp.icon}
              </div>

              {/* Card de experiencia */}
              <div
                className={`w-full md:w-1/2 mt-12 md:mt-0 p-6 rounded-2xl glass-effect border border-white/10 shadow-lg ${
                  index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                }`}
              >
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <p className="text-ghost-purple font-medium">{exp.company}</p>
                <span className="text-sm text-white/60">{exp.period}</span>
                <p className="mt-4 text-white/70 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience
