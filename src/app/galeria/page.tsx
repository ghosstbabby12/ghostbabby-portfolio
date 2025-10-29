'use client'

import { useState } from 'react'

interface CardData {
  img: string
  question: string
  answer: string
}

export default function Galeria() {
  const sections = {
    games: [
      { img: '/galeria/games1.jpg', question: '¿Cuál es mi videojuego favorito?', answer: 'league of legends' },
      { img: '/galeria/games2.jpg', question: '¿Personaje favorito?', answer: 'jinx' },
      { img: '/galeria/games2.jpg', question: '¿Que rol prefiero en  los video juegos?', answer: 'shooter' },

    ],

    food: [
      { img: '/galeria/food1.jpg', question: '¿Qué significa HTML?', answer: 'hypertext markup language' },
      { img: '/galeria/food2.jpg', question: '¿Prefieres dulce o salado?', answer: 'dulce' },
      { img: '/galeria/food3.jpg', question: '¿Plato que más cocinas?', answer: 'pasta' },
    ],

    hommies: [
      { img: '/galeria/hommies1.jpg', question: '¿Qué es una variable?', answer: 'espacio para guardar un valor' },
      { img: '/galeria/hommies2.jpg', question: '¿Con quién pasas más tiempo?', answer: 'amigos' },
      { img: '/galeria/hommies3.jpg', question: '¿Qué lenguaje se usa para estilos web?', answer: 'css' },
    ],

    trips: [
      { img: '/galeria/trip1.jpg', question: '¿Qué significa la sigla API?', answer: 'application programming interface' },
      { img: '/galeria/trip2.jpg', question: '¿Nombre de la agencia de viajes?', answer: '360' },
      { img: '/galeria/trip3.jpg', question: '¿Qué lenguaje se usa para la lógica en la web?', answer: 'javascript' },
    ],

    hobbies: [
      { img: '/galeria/hobby1.jpg', question: '¿Qué es el frontend?', answer: 'la parte visible de una web' },
      { img: '/galeria/hobby2.jpg', question: '¿Género musical favorito?', answer: 'techno' },
      { img: '/galeria/hobby3.jpg', question: '¿Qué significa CSS?', answer: 'cascading style sheets' },
    ],
  }

  const [unlocked, setUnlocked] = useState<{ [key: string]: boolean }>({})

  const handleAnswer = (key: string, userAnswer: string, correct: string) => {
    if (userAnswer.toLowerCase().trim() === correct.toLowerCase()) {
      setUnlocked((prev) => ({ ...prev, [key]: true }))
    } else {
      alert('❌ Respuesta incorrecta, inténtalo de nuevo')
    }
  }

  const Card = ({ data, id }: { data: CardData; id: string }) => {
    const [input, setInput] = useState('')
    const isOpen = unlocked[id]

    return (
      <div className="relative w-full h-60 md:h-72 rounded-2xl overflow-hidden shadow-lg border border-purple-500 bg-purple-900/40 hover:scale-105 transition-transform">
        {!isOpen ? (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/70 p-4 text-center">
            <p className="text-lg font-semibold mb-3">{data.question}</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded px-2 py-1 text-black w-3/4"
              placeholder="Tu respuesta..."
            />
            <button
              onClick={() => handleAnswer(id, input, data.answer)}
              className="mt-3 bg-yellow-400 text-black font-bold px-4 py-1 rounded hover:scale-105 transition-transform"
            >
              Enviar
            </button>
          </div>
        ) : (
          <img
            src={data.img}
            alt="Unlocked"
            className="w-full h-full object-cover transition-all duration-500"
          />
        )}
      </div>
    )
  }

  const renderSection = (title: string, color: string, cards: CardData[], key: string) => (
    <section className="mb-14 w-full max-w-5xl">
      <h2 className={`text-3xl font-semibold mb-6 border-b pb-2 ${color}`}>{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={`${key}-${index}`} id={`${key}-${index}`} data={card} />
        ))}
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col items-center p-10">
      <h1 className="text-5xl font-bold mb-10 text-center animate-pulse">
        🌟 My Gallery
      </h1>

      <p className="text-lg text-center max-w-2xl mb-12 opacity-90">
        Bienvenido a mi galería secreta. Cada carta está bloqueada 🔒 y solo podrás revelarla si respondes correctamente la pregunta encima. 🎮🍕✈️
      </p>

      {renderSection('🎮 Video Games', 'border-purple-400', sections.games, 'games')}
      {renderSection('🍔 Food', 'border-pink-400', sections.food, 'food')}
      {renderSection('👯 Hommies', 'border-blue-400', sections.hommies, 'hommies')}
      {renderSection('✈️ Trips', 'border-indigo-400', sections.trips, 'trips')}
      {renderSection('🎨 Hobbies', 'border-yellow-400', sections.hobbies, 'hobbies')}

      <button
        onClick={() => (window.location.href = '/')}
        className="mt-10 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
      >
        ⬅️ Volver al inicio
      </button>
    </div>
  )
}
