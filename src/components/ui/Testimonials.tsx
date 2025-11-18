'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Edit2, Save, X, Plus, Trash2 } from 'lucide-react'
import { useTheme, useI18n } from '../../app/providers'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  message: string
  rating: number
  avatar?: string
}

export default function Testimonials() {
  const { actualTheme } = useTheme()
  const { t } = useI18n()

  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'María González',
      role: 'CEO',
      company: 'Tech Innovations',
      message: 'Trabajar con Camila fue una experiencia increíble. Su atención al detalle y creatividad superaron nuestras expectativas.',
      rating: 5,
      avatar: '/images/avatar.png'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      role: 'Product Manager',
      company: 'Digital Solutions',
      message: 'Profesional, creativa y con una gran capacidad para resolver problemas complejos. Altamente recomendada.',
      rating: 5,
      avatar: '/images/avatar.png'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      role: 'Lead Developer',
      company: 'StartupHub',
      message: 'Su código es limpio, eficiente y bien documentado. Una desarrolladora excepcional con gran sentido del diseño.',
      rating: 5,
      avatar: '/images/avatar.png'
    }
  ]

  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [editMode, setEditMode] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Testimonial | null>(null)

  // Cargar testimonios guardados
  useEffect(() => {
    const savedTestimonials = localStorage.getItem('customTestimonials')
    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials))
      } catch (e) {
        console.error('Error loading testimonials:', e)
      }
    }
  }, [])

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setEditForm({ ...testimonial })
  }

  const handleSave = () => {
    if (editForm) {
      const updatedTestimonials = testimonials.map(t =>
        t.id === editForm.id ? editForm : t
      )
      setTestimonials(updatedTestimonials)
      localStorage.setItem('customTestimonials', JSON.stringify(updatedTestimonials))
      setEditingId(null)
      setEditForm(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm(null)
  }

  const handleAdd = () => {
    const newId = Math.max(...testimonials.map(t => t.id), 0) + 1
    const newTestimonial: Testimonial = {
      id: newId,
      name: 'Nuevo Testimonio',
      role: 'Rol',
      company: 'Empresa',
      message: 'Mensaje del testimonio...',
      rating: 5,
      avatar: '/images/avatar.png'
    }
    setTestimonials([...testimonials, newTestimonial])
    setEditingId(newId)
    setEditForm(newTestimonial)
  }

  const handleDelete = (id: number) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id)
    setTestimonials(updatedTestimonials)
    localStorage.setItem('customTestimonials', JSON.stringify(updatedTestimonials))
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section
      id="testimonials"
      className="min-h-screen py-24 px-4 transition-colors duration-300"
      style={{
        background: actualTheme === 'light'
          ? 'linear-gradient(to bottom right, #f5f3ff, #ede9fe, #ddd6fe)'
          : 'linear-gradient(to bottom right, #030712, #581c87, #312e81)',
        color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('testimonials.title') || 'Testimonios'}
          </motion.h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto"
             style={{ color: actualTheme === 'light' ? '#4b5563' : '#d1d5db' }}>
            {t('testimonials.subtitle') || 'Lo que dicen quienes han trabajado conmigo'}
          </p>
        </div>

        {/* Content */}
        <div>
            {/* Edit Mode Toggle */}
            <div className="flex justify-end mb-6 gap-4">
              <motion.button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all shadow-lg"
                style={{
                  background: editMode
                    ? actualTheme === 'light' ? '#ef4444' : '#dc2626'
                    : actualTheme === 'light' ? '#7c3aed' : '#a855f7',
                  color: '#ffffff'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {editMode ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {editMode ? 'Salir de Edición' : 'Editar'}
              </motion.button>
              {editMode && (
                <motion.button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all shadow-lg"
                  style={{
                    background: actualTheme === 'light' ? '#10b981' : '#059669',
                    color: '#ffffff'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </motion.button>
              )}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-6 shadow-xl backdrop-blur-sm border-2 transition-all duration-300 hover:shadow-2xl"
                  style={{
                    background: actualTheme === 'light'
                      ? 'rgba(255, 255, 255, 0.9)'
                      : 'rgba(0, 0, 0, 0.3)',
                    borderColor: actualTheme === 'light' ? '#c4b5fd' : '#a855f7'
                  }}
                >
                  {editingId === testimonial.id && editForm ? (
                    // Edit Form
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 text-sm"
                        style={{
                          background: actualTheme === 'light' ? '#ffffff' : '#1f2937',
                          borderColor: actualTheme === 'light' ? '#a78bfa' : '#6b21a8',
                          color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
                        }}
                        placeholder="Nombre"
                      />
                      <input
                        type="text"
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 text-sm"
                        style={{
                          background: actualTheme === 'light' ? '#ffffff' : '#1f2937',
                          borderColor: actualTheme === 'light' ? '#a78bfa' : '#6b21a8',
                          color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
                        }}
                        placeholder="Rol"
                      />
                      <input
                        type="text"
                        value={editForm.company}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border-2 text-sm"
                        style={{
                          background: actualTheme === 'light' ? '#ffffff' : '#1f2937',
                          borderColor: actualTheme === 'light' ? '#a78bfa' : '#6b21a8',
                          color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
                        }}
                        placeholder="Empresa"
                      />
                      <textarea
                        value={editForm.message}
                        onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg border-2 text-sm resize-none"
                        style={{
                          background: actualTheme === 'light' ? '#ffffff' : '#1f2937',
                          borderColor: actualTheme === 'light' ? '#a78bfa' : '#6b21a8',
                          color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
                        }}
                        placeholder="Mensaje"
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold">Rating:</label>
                        <select
                          value={editForm.rating}
                          onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                          className="px-3 py-2 rounded-lg border-2 text-sm"
                          style={{
                            background: actualTheme === 'light' ? '#ffffff' : '#1f2937',
                            borderColor: actualTheme === 'light' ? '#a78bfa' : '#6b21a8',
                            color: actualTheme === 'light' ? '#1f2937' : '#ffffff'
                          }}
                        >
                          {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} ⭐</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleSave}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white font-semibold"
                          style={{ background: '#10b981' }}
                        >
                          <Save className="w-4 h-4" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white font-semibold"
                          style={{ background: '#6b7280' }}
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display Mode
                    <>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2"
                             style={{ borderColor: actualTheme === 'light' ? '#a78bfa' : '#a855f7' }}>
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg"
                              style={{ color: actualTheme === 'light' ? '#1f2937' : '#ffffff' }}>
                            {testimonial.name}
                          </h4>
                          <p className="text-sm"
                             style={{ color: actualTheme === 'light' ? '#7c3aed' : '#a78bfa' }}>
                            {testimonial.role}
                          </p>
                          <p className="text-xs"
                             style={{ color: actualTheme === 'light' ? '#6b7280' : '#9ca3af' }}>
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-3">
                        {renderStars(testimonial.rating)}
                      </div>

                      <p className="text-sm leading-relaxed mb-4"
                         style={{ color: actualTheme === 'light' ? '#4b5563' : '#d1d5db' }}>
                        "{testimonial.message}"
                      </p>

                      {editMode && (
                        <div className="flex gap-2 pt-2 border-t"
                             style={{ borderColor: actualTheme === 'light' ? '#e5e7eb' : '#374151' }}>
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold"
                            style={{
                              background: actualTheme === 'light' ? '#7c3aed' : '#a855f7',
                              color: '#ffffff'
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id)}
                            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold"
                            style={{
                              background: actualTheme === 'light' ? '#ef4444' : '#dc2626',
                              color: '#ffffff'
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
