'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTheme, useI18n } from '../providers'
import { Music, Home, Play, Info, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function StrudelPage() {
  const router = useRouter()
  const { actualTheme } = useTheme()
  const { t } = useI18n()
  const [showSamples, setShowSamples] = useState(false)
  const [selectedSample, setSelectedSample] = useState('algorave')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSamples(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Define los samples disponibles
  const algoraveCode = `samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

const gain_patterns = [
"1",
"{0.75 2.5}*2",
"{0.75 2.5!9 0.75 2.5!5 0.75 2.5 0.75 2.5!7 0.75 2.5!3 <2.5 0.75> 2.5}%16",
]

const drum_structure = [
"~",
"x*2",
"{x ~!9 x ~!5 x ~ x ~!7 x ~!3 < ~ x > ~}%16",
]

const basslines = [
"[[eb1, eb2]!16 [f2, f1]!16 [g2, g1]!16 [f2, f1]!8 [bb2, bb1]!8]/2",
"[[eb1, eb2]!16 [bb2, bb1]!16 [g2, g1]!16 [f2, f1]!4 [bb1, bb2]!4 [eb1, eb2]!4 [f1, f2]!4]/8"
]

const arpeggiator1 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
]

const arpeggiator2 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{d5 bb4 g4 d4 bb3 g3 d4 bb3 eb3 d3 bb2 eb2}%16",
]

const pattern = 0
const bass = 0

bassline:
note(pick(basslines, bass))
.sound("supersaw")
.postgain(2)
.room(0.6)
.lpf(700)
.room(0.4)
.postgain(pick(gain_patterns, pattern))

main_arp:
note(pick(arpeggiator1, "<0 1 2 3>/2"))
.sound("supersaw")
.lpf(300)
.adsr("0:0:.5:.1")
.room(0.6)
.lpenv(3.3)
.postgain(pick(gain_patterns, pattern))

drums:
stack(
s("tech:5")
.postgain(6)
.pcurve(2)
.pdec(1)
.struct(pick(drum_structure, pattern)),

s("sh").struct("[x!3 ~!2 x!10 ~]")
.postgain(0.5).lpf(7000)
.bank("RolandTR808")
.speed(0.8).jux(rev).room(sine.range(0.1,0.4)).gain(0.6),

s("{~ ~ rim ~ cp ~ rim cp ~!2 rim ~ cp ~ < rim ~ >!2}%8 *2")
.bank("[KorgDDM110, OberheimDmx]").speed(1.2)
.postgain(.25),
)

drums2:
stack(
s("[~ hh]4").bank("RolandTR808").room(0.3).speed(0.75).gain(1.2),
s("hh").struct("x16").bank("RolandTR808")
.gain(0.6)
.jux(rev)
.room(sine.range(0.1,0.4))
.postgain(0.5),

s("[psr:[2|5|6|7|8|9|12|24|25]*16]?0.1")
.gain(0.1)
.postgain(pick(gain_patterns, pattern))
.hpf(1000)
.speed(0.5)
.rarely(jux(rev)),
)`

  const samples = [
    {
      id: 'algorave',
      name: 'Algorave Pattern Full',
      description: 'Patrón algorave completo con basslines y arpegiadores',
      url: `https://strudel.cc/?code=${encodeURIComponent(algoraveCode)}`
    },
    {
      id: 'simple',
      name: 'Simple Beat',
      description: 'Un beat simple para comenzar',
      url: 'https://strudel.cc/?code=sound("bd sd").fast(2)'
    },
    {
      id: 'ambient',
      name: 'Ambient Soundscape',
      description: 'Paisaje sonoro ambiental',
      url: 'https://strudel.cc/?code=note("c3 eb3 g3 bb3").slow(4).sound("sawtooth").lpf(800)'
    }
  ]

  const handleSampleChange = (sampleId: string) => {
    setSelectedSample(sampleId)
    setShowSamples(false)
  }

  const currentSample = samples.find(s => s.id === selectedSample) || samples[0]

  return (
    <div
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        actualTheme === 'light'
          ? 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100'
          : 'bg-gradient-to-br from-gray-900 via-blue-950 to-black'
      }`}
    >

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 animate-pulse" />
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}>
              {t('hero.strudel.title')}
            </h1>
            <Music className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 animate-pulse" />
          </div>

          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            actualTheme === 'light' ? 'text-gray-700' : 'text-white/90'
          }`}>
            {t('hero.strudel.description')}
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`glass-effect rounded-xl p-4 backdrop-blur-lg border ${
            actualTheme === 'light'
              ? 'bg-white/60 border-purple-200'
              : 'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5 text-purple-500" />
              <h3 className={`font-semibold ${
                actualTheme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                Live Coding
              </h3>
            </div>
            <p className={`text-sm ${
              actualTheme === 'light' ? 'text-gray-600' : 'text-white/70'
            }`}>
              Escribe código y escucha música en tiempo real
            </p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setShowSamples(!showSamples)}
              className={`glass-effect rounded-xl p-4 w-full text-left transition-all backdrop-blur-lg border ${
                actualTheme === 'light'
                  ? 'bg-white/60 border-purple-200 hover:bg-white/80'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-pink-500" />
                  <h3 className={`font-semibold ${
                    actualTheme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    Generative Music
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: showSamples ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={`w-5 h-5 ${
                    actualTheme === 'light' ? 'text-gray-600' : 'text-white/70'
                  }`} />
                </motion.div>
              </div>
              <p className={`text-sm ${
                actualTheme === 'light' ? 'text-gray-600' : 'text-white/70'
              }`}>
                {currentSample.name}
              </p>
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {showSamples && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-xl z-50 border backdrop-blur-xl ${
                    actualTheme === 'light'
                      ? 'bg-white border-purple-300'
                      : 'bg-gray-900 border-purple-500/50'
                  }`}
                >
                  {samples.map((sample) => (
                    <motion.button
                      key={sample.id}
                      onClick={() => handleSampleChange(sample.id)}
                      className={`w-full p-4 text-left transition-colors ${
                        selectedSample === sample.id
                          ? actualTheme === 'light'
                            ? 'bg-purple-100'
                            : 'bg-purple-900/50'
                          : actualTheme === 'light'
                          ? 'hover:bg-purple-50'
                          : 'hover:bg-purple-900/30'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <h4 className={`font-semibold mb-1 ${
                        actualTheme === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        {sample.name}
                      </h4>
                      <p className={`text-xs ${
                        actualTheme === 'light' ? 'text-gray-600' : 'text-white/60'
                      }`}>
                        {sample.description}
                      </p>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`glass-effect rounded-xl p-4 backdrop-blur-lg border ${
            actualTheme === 'light'
              ? 'bg-white/60 border-purple-200'
              : 'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-500" />
              <h3 className={`font-semibold ${
                actualTheme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                En el navegador
              </h3>
            </div>
            <p className={`text-sm ${
              actualTheme === 'light' ? 'text-gray-600' : 'text-white/70'
            }`}>
              No necesitas instalar nada
            </p>
          </div>
        </motion.div>

        {/* Strudel iframe */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={`rounded-2xl overflow-hidden border-4 shadow-2xl ${
            actualTheme === 'light'
              ? 'border-purple-300 shadow-purple-200/50'
              : 'border-purple-500/50 shadow-purple-500/20'
          }`}>
            <iframe
              key={selectedSample}
              src={currentSample.url}
              title="Strudel REPL"
              className="w-full h-[70vh] md:h-[75vh] lg:h-[80vh]"
              allow="microphone; midi"
            />
          </div>
        </motion.div>

        {/* Back button */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            onClick={() => router.push('/')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
              actualTheme === 'light'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            <span>{t('gallery.back')}</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
