'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { Briefcase, GraduationCap, Code, Award } from "lucide-react"
import { useI18n, useTheme } from '../../app/providers'

const Experience = () => {
  const { t } = useI18n()
  const { actualTheme } = useTheme()
  
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
        {/* Línea vertical visible en móvil */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ghost-purple via-ghost-pink to-ghost-purple md:hidden"></div>

        <div className="space-y-8 md:space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 md:min-h-[200px] ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Punto de la línea - visible en móvil y desktop */}
              <motion.div
                className="flex absolute left-0 md:left-1/2 w-12 h-12 items-center justify-center rounded-full shadow-lg z-20 border-4"
                style={{
                  background: actualTheme === 'light'
                    ? 'linear-gradient(to bottom right, #a78bfa, #c4b5fd)'
                    : 'linear-gradient(to bottom right, #667eea, #764ba2)',
                  borderColor: actualTheme === 'light' ? '#ffffff' : '#0a0118',
                  top: '0',
                  transform: 'translateX(0) md:translate(-50%, 0)'
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {exp.icon}
              </motion.div>

              {/* Espaciador invisible para el diseño desktop */}
              <div className="hidden md:block w-1/2"></div>

              {/* Card de experiencia */}
              <motion.div
                className="w-full md:w-1/2 ml-16 md:ml-0 p-4 md:p-6 rounded-2xl glass-effect border shadow-xl hover:shadow-2xl transition-all duration-300 group relative z-10"
                style={{
                  borderColor: actualTheme === 'light'
                    ? 'rgba(167, 139, 250, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gradient group-hover:scale-105 transition-all duration-300">
                      {exp.title}
                    </h3>
                    <p
                      className="font-medium mt-1 text-sm md:text-base"
                      style={{
                        color: actualTheme === 'light' ? '#7c3aed' : '#a78bfa'
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                </div>

                <span
                  className="inline-block text-xs md:text-sm px-3 py-1 rounded-full mb-3 md:mb-4"
                  style={{
                    color: actualTheme === 'light' ? '#6d28d9' : 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: actualTheme === 'light' ? 'rgba(167, 139, 250, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {exp.period}
                </span>

                <p
                  className="leading-relaxed text-sm md:text-base"
                  style={{
                    color: actualTheme === 'light' ? '#4b5563' : 'rgba(255, 255, 255, 0.7)'
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