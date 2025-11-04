'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { Briefcase, GraduationCap, Code, Award } from "lucide-react"
import { useI18n, useTheme } from '../../app/providers'

const Experience = () => {
  const { t } = useI18n()
  const { theme } = useTheme()
  
  const experiences = [
    {
      id: 1,
      title: t('experience.items.student.title'),
      company: t('experience.items.student.company'),
      period: t('experience.items.student.period'),
      description: t('experience.items.student.description'),
      icon: <GraduationCap className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: t('experience.items.developer.title'),
      company: t('experience.items.developer.company'),
      period: t('experience.items.developer.period'),
      description: t('experience.items.developer.description'),
      icon: <Code className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      title: t('experience.items.projects.title'),
      company: t('experience.items.projects.company'),
      period: t('experience.items.projects.period'),
      description: t('experience.items.projects.description'),
      icon: <Briefcase className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: t('experience.items.achievements.title'),
      company: t('experience.items.achievements.company'),
      period: t('experience.items.achievements.period'),
      description: t('experience.items.achievements.description'),
      icon: <Award className="w-6 h-6 text-white" />
    }
  ]

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
              className={`relative flex flex-col md:flex-row items-center gap-8 md:min-h-[200px] ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Punto de la línea */}
              <motion.div
                className="hidden md:flex absolute left-1/2 w-12 h-12 items-center justify-center rounded-full shadow-lg z-20 border-4"
                style={{
                  background: theme === 'light'
                    ? 'linear-gradient(to bottom right, #d5748e, #eaa4ba)'
                    : 'linear-gradient(to bottom right, #667eea, #764ba2)',
                  borderColor: theme === 'light' ? '#ffffff' : '#0a0118',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {exp.icon}
              </motion.div>

              {/* Espaciador invisible para el diseño */}
              <div className="hidden md:block w-1/2"></div>

              {/* Card de experiencia */}
              <motion.div
                className="w-full md:w-1/2 p-6 rounded-2xl glass-effect border shadow-xl hover:shadow-2xl transition-all duration-300 group relative z-10"
                style={{
                  borderColor: theme === 'light'
                    ? 'rgba(213, 116, 142, 0.2)'
                    : 'rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {exp.title}
                    </h3>
                    <p
                      className="font-medium mt-1"
                      style={{
                        color: theme === 'light' ? '#c2185b' : '#667eea'
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                </div>

                <span
                  className="inline-block text-sm px-3 py-1 rounded-full mb-4"
                  style={{
                    color: theme === 'light' ? '#5a5a5a' : 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: theme === 'light' ? 'rgba(213, 116, 142, 0.1)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {exp.period}
                </span>

                <p
                  className="leading-relaxed"
                  style={{
                    color: theme === 'light' ? '#3a3a3a' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience