'use client'

export default function StrudelPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-6">🎶 Strudel Live Coding</h1>
      <p className="text-gray-400 mb-6 text-center max-w-xl">
        Aquí puedes probar código musical en vivo con Strudel, un entorno de live coding directamente en el navegador.
      </p>

      <iframe
        src="https://strudel.tidalcycles.org"
        title="Strudel REPL"
        className="w-full max-w-5xl h-[80vh] border border-purple-500 rounded-xl"
      />

      <button
        onClick={() => (window.location.href = '/')}
        className="mt-10 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
      >
        ⬅️ Volver al inicio
      </button>
    </div>
  )
}
