"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useI18n } from "../../app/providers";

const Projects = () => {
  const { t } = useI18n();
  const projects = [
    {
      id: 1,
      title: "Manejo de Integración Continua",
      description:
        "Este proyecto consiste en una aplicación React sencilla que consume la API pública de usuarios aleatorios y muestra información básica de los usuarios",

      technologies: ["React 18", "Axios", "Jest + React Testing Library", "Jenkins (CI/CD)",],
      image: "/projects/ReactApp.jpg",
      githubUrl: "https://github.com/ghosstbabby12/Calidad-de-Software-P2.git",
      liveUrl: "https://calidad-de-software-p2.vercel.app",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Aplicación web para gestión de tareas con autenticación, colaboración en tiempo real y notificaciones push.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
      image: "https://placehold.co/400x250/png",
      githubUrl: "https://github.com/migueltovarb/ISWDISENO10196-4.git",
      liveUrl: "https://taskmanager-demo.vercel.app",
      featured: true,
    },
    {
      id: 3,
      title: "Creative Portfolio",
      description:
        "Sitio web interactivo para artista con galería, efectos 3D, animaciones avanzadas y sistema de contacto.",
      technologies: ["Next.js", "Three.js", "Framer Motion", "GSAP"],
      image: "/projects/Dark-light.png",
      githubUrl: "https://github.com/ghosstbabby12/Responsive-Dark-Light.git",
      liveUrl: "https://responsive-dark-light.vercel.app/es",
      featured: false,
    },
    {
      id: 4,
      title: "JuegoBricks",
      description:
        "🧪 Pruebas Unitarias con Pytest",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Tailwind"],
      image: "https://placehold.co/400x250/png",
      githubUrl: "https://github.com/ghosstbabby12/JuegoBricks.git",
      liveUrl: "https://juego-bricks-tau.vercel.app",
      featured: false,
    },
    {
      id: 5,
      title: "Login Personalizado",
      description:
        "Herramienta de análisis de redes sociales con métricas detalladas, reportes automáticos y visualización de datos.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
      image: "/projects/LoginPersonal.png",
      githubUrl: "https://github.com/ghosstbabby12/LoginPerzonalizado.git",
      liveUrl: "https://login-perzonalizado.vercel.app",
      featured: true,
    },
    {
      id: 6,
      title: "Learning Management System",
      description:
        "Plataforma educativa con cursos online, seguimiento de progreso, quizzes interactivos y certificaciones.",
      technologies: ["Next.js", "Supabase", "Stripe", "Video.js", "PDF.js"],
      image: "https://placehold.co/400x250/png",
      githubUrl: "https://github.com/tuusuario/lms-platform",
      liveUrl: "https://lms-demo.vercel.app",
      featured: false,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            {t("sections.projectsTitle")}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            {t("projects.description")}
          </p>
        </motion.div>

        {/* Grid de proyectos */}
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
              className={`rounded-xl overflow-hidden border border-white/10 backdrop-blur-lg bg-white/5 hover:shadow-lg hover:shadow-ghost-purple/20 transition ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Vista previa de ${project.title}`}
                  className="object-cover w-full h-full"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-ghost-purple/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Destacado
                  </div>
                )}
              </div>

              {/* Contenido */}
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

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-ghost-purple text-ghost-purple hover:text-white transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    <Github size={18} />
                    <span>
                      {t("actions.viewProjects") === "View Projects"
                        ? "Código"
                        : "Code"}
                    </span>
                  </motion.a>
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-ghost-purple text-ghost-purple hover:text-white transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-card-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    <ExternalLink size={18} />
                    <span>Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA GitHub */}
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
            href="https://github.com/ghosstbabby12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card-gradient text-white hover:shadow-lg hover:shadow-ghost-purple/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            {t("actions.viewProjects") === "View Projects"
              ? "Ver más en GitHub"
              : "View more on GitHub"}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
