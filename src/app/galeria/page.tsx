'use client'

export default function Galeria() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center p-10">
      <h1 className="text-5xl font-bold mb-10 text-center animate-glow">
        🌟 My Gallery
      </h1>

      <p className="text-lg text-center max-w-2xl mb-12 opacity-90">
        Bienvenido a mi galeria secreta, auí podras encontrarar un resumen visual de mi vida y hobbies 
        Cada sección representa momentos y pasiones únicas: desde los videojuegos hasta los viajes con amigos. 🎮🍕✈️
      </p>

      {/* 🎮 Video Games Section */}
      <section className="mb-14 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-purple-500 pb-2">🎮 Video Games</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <img src="/galeria/games1.jpg" alt="Video Game 1" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/games2.jpg" alt="Video Game 2" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* 🍔 Food Section */}
      <section className="mb-14 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-pink-400 pb-2">🍔 Food</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <img src="/galeria/food1.jpg" alt="Food 1" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/food2.jpg" alt="Food 2" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/food3.jpg" alt="Food 3" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/food4.jpg" alt="Food 4" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/food5.jpg" alt="Food 5" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* 👯 Hommies Section */}
      <section className="mb-14 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-blue-400 pb-2">👯 Hommies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <img src="/galeria/hommies1.jpg" alt="Hommies 1" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/hommies2.jpg" alt="Hommies 2" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/hommies3.jpg" alt="Hommies 3" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>

      {/* ✈️ Trips Section */}
      <section className="mb-14 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-indigo-400 pb-2">✈️ Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <img src="/galeria/trip1.jpg" alt="Trip 1" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/trip2.jpg" alt="Trip 2" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          
        </div>
      </section>

      {/* 🎨 Hobbies Section */}
      <section className="mb-20 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-6 border-b border-yellow-400 pb-2">🎨 Hobbies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <img src="/galeria/hobby1.jpg" alt="Hobby 1" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
          <img src="/galeria/hobby2.jpg" alt="Hobby 2" className="rounded-xl shadow-lg hover:scale-105 transition-transform" />
        </div>
      </section>

      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
      >
        ⬅️ Volver al inicio
      </button>
    </div>
  )
}
