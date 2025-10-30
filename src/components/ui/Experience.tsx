'use client'
import { motion } from "framer-motion"
import Section from "@/components/shared/Section"
import { Briefcase, GraduationCap, Code, Award } from "lucide-react"
import { useI18n } from '../../app/providers'

const Experience = () => {
  const { t } = useI18n()
  
  const experiences = [
    {
      id: 1,
      title: t('experience.items.student.title'),
      company: t('experience.items.student.company'),
      period: t('experience.items.student.period'),
      description: t('experience.items.student.description'),
      icon: <GraduationCap className="w-6 h-6 text-ghost-purple" />
    },
    {
      id: 2,
      title: t('experience.items.developer.title'),
      company: t('experience.items.developer.company'),
      period: t('experience.items.developer.period'),
      description: t('experience.items.developer.description'),
      icon: <Code className="w-6 h-6 text-ghost-pink" />
    },
    {
      id: 3,
      title: t('experience.items.projects.title'),
      company: t('experience.items.projects.company'),
      period: t('experience.items.projects.period'),
      description: t('experience.items.projects.description'),
      icon: <Briefcase className="w-6 h-6 text-ghost-blue" />
    },
    {
      id: 4,
      title: t('experience.items.achievements.title'),
      company: t('experience.items.achievements.company'),
      period: t('experience.items.achievements.period'),
      description: t('experience.items.achievements.description'),
      icon: <Award className="w-6 h-6 text-amber-400" />
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
        {/* Línea vertical central */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-ghost-purple via-ghost-pink to-ghost-purple opacity-30"></div>
        
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Punto de la línea */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-ghost-purple to-ghost-pink rounded-full shadow-lg z-10 border-4 border-[#0a0118]"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {exp.icon}
              </motion.div>

              {/* Espaciador invisible para el diseño */}
              <div className="hidden md:block w-1/2"></div>

              {/* Card de experiencia */}
              <motion.div
                className="w-full md:w-1/2 p-6 rounded-2xl glass-effect border border-white/10 shadow-xl hover:shadow-2xl hover:border-ghost-purple/50 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-ghost-purple font-medium mt-1">
                      {exp.company}
                    </p>
                  </div>
                </div>
                
                <span className="inline-block text-sm text-white/60 bg-white/5 px-3 py-1 rounded-full mb-4">
                  {exp.period}
                </span>
                
                <p className="text-white/70 leading-relaxed">
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