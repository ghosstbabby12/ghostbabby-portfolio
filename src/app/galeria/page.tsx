
'use client'
import { useI18n } from "@/app/providers"

export default function Galeria() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-800 via-purple-800 to-pink-800 text-white">
      <h1 className="text-4xl font-bold mb-6">{t('gallery.title')}</h1>

      <p className="max-w-lg text-center text-lg mb-10">
        {t('gallery.description')}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* 🖼️ Ejemplos de imágenes */}
        <img src="/galeria1.jpg" alt="hobbies 1" className="rounded-xl shadow-lg" />
        <img src="/galeria2.jpg" alt="video games 2" className="rounded-xl shadow-lg" />
        <img src="/galeria3.jpg" alt="food 3" className="rounded-xl shadow-lg" />
        <img src="/galeria4.jpg" alt="hommies" className="rounded-xl shadow-lg" />
        <img src="/galeria3.jpg" alt="travels" className="rounded-xl shadow-lg" />
      </div>

      <button
        onClick={() => (window.location.href = '/')}
        className="mt-10 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
      >
        {t('gallery.back')}
      </button>
    </div>
  )
}
