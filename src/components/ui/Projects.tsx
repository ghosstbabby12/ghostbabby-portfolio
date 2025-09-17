'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Plataforma de comercio electrónico completa con Next.js, Stripe para pagos, panel administrativo y gestión de inventario.",
      technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
      image: "/api/placeholder/400/250",
      githubUrl: "https://github.com/tuusuario/ecommerce-project",
      liveUrl: "https://ecommerce-demo.vercel.app",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Aplicación web para gestión de tareas con autenticación, colaboración en tiempo real y notificaciones push.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
      image: "/api/placeholder/400/250",
      githubUrl: "https://github.com/tuusuario/task-manager",
      liveUrl: "https://taskmanager-demo.vercel.app",
      featured: true
    },
    {
      id: 3,
      title: "Creative Portfolio",
      description: "Sitio web interactivo para artista con galería, efectos 3D, animaciones avanzadas y sistema de contacto.",
      technologies: ["Next.js", "Three.js", "Framer Motion", "GSAP"],
      image: "/api/placeholder/400/250",
      githubUrl: "https://github.com/tuusuario/creative-portfolio",
      liveUrl: "https://creative-portfolio-demo.vercel.app",
      featured: false
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Dashboard del clima con datos en tiempo real, gráficos interactivos y predicciones meteorológicas.",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      image: "/api/placeholder/400/250",
      githubUrl: "https://github.com/tuusuario/weather-dashboard",
      liveUrl: "https://weather-dashboard-demo.vercel.app",
      featured: false
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "Herramienta de análisis de redes sociales con métricas detalladas, reportes automáticos y visualización de datos.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
      image: "/api/placeholder/400/250",
      githubUrl: "https://github.com/tuusuario/social-analytics",
      liveUrl: "https://social-analytics-demo.vercel.app",
      featured: true
    },
    {
      id: 6,
      title: "Learning Management System",
      description: "Plataforma educativa con cursos online, seguimiento de progreso, quizzes interactivos y certificaciones.",
      technologies: ["Next.js", "Supabase", "Stripe", "Video.js", "PDF.js"],
      image: "/api/placeholder/400/250",
      githubUrl: "https://github.com/tuusuario/lms-platform",
      liveUrl: "https://lms-demo.vercel.app",
      featured: false
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="proyectos" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Mis Proyectos
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades en desarrollo web, 
            desde aplicaciones empresariales hasta experiencias interactivas creativas.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className={`glass-effect rounded-xl overflow-hidden card-hover ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Imagen del proyecto */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-ghost-purple/20 to-ghost-pink/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🚀</div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-ghost-purple/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Destacado
                  </div>
                )}
              </div>

              {/* Contenido del proyecto */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Enlaces */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-ghost-purple transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span>Código</span>
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-ghost-pink transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    <span>Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA para más proyectos */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 mb-6">
            ¿Interesado en ver más de mi trabajo?
          </p>
          <motion.a
            href="https://github.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-btn inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            Ver más en GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects