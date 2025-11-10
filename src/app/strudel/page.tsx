'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useTheme, useI18n } from '../providers'
import { Music, Home } from 'lucide-react'

export default function StrudelPage() {
  const router = useRouter()
  const { actualTheme } = useTheme()
  const { t } = useI18n()

  // Samples disponibles
  const samples = [
    {
      title: "Deep Acid Techno",
      url: "https://strudel.cc/?theme=dark#c2V0Q3BzKDE0MC82MC80KQoKCgoKJDogcygic2JkITQiKS5kaXN0b3J0KCIzOjMiKS5fc2NvcGUoKQouZHVjaygiMjozOjQiKS5kdWNrYXR0YWNrKC4yKS5kdWNrZGVwdGgoLjgpCgokYmFzczogbihpcmFuZCgxMCkuc3ViKDcpLnNlZygxNikpLnNjYWxlKCJjOm1pbm9yIikKICAucmliKDQ2LDEpCiAgLmRpc3RvcnQoIjIuMjozIikKICAKLnMoInNhd3Rvb3RoIikubHBmKDIwMCkubHBlbnYoc2xpZGVyKDIuNTI4LDAsOCkpCiAgLmxwcSgxMikub3JiaXQoMikuX3BpYW5vcm9sbCgpCgokOiBzKCJzdXBlcnNhdyIpLmRldHVuZSgxKS5yZWwoNSkuYmVhdCgyLDMyKS5zbG93KDIpCgokOiBzKCJzdXBlcnNhdyIpLmRldHVuZSgxKS5yZWwoNSkuYmVhdCgyLDMyKS5zbG93KDIpLm9yYml0KCkKLmZtKCIyIikuZm1oKDIuMDQpLnJvb20oMSkucm9vbXNpemUoNikKCgokOiBzKCJwdWxzZSIpLm9yYml0KDQpLnNlZygxNikuZGVjKC4xKS5mbSh0aW1lKS5mbWgodGltZSkKCgoKCgoKCgoK"
    },
    {
      title: "Atmospheric Jazz",
      url: "https://strudel.cc/?theme=dark#CnNhbXBsZXMoJ2dpdGh1YjplZGR5Zmx1eC9jcmF0ZScpCnNldGNwcygwLjkpIAoKCi8vID09PT09PT0gUFJPR1JFU0nDk04gREUgQUNPUkRFUyA9PT09PT09CmxldCBjaG9yZHMgPSBjaG9yZCgiPEJibTkgRm05IEVibWFqNyBBYm1hajc%2BLzQiKS5kaWN0KCdpcmVhbCcpCgovLyA9PT09PT09IENBUEEgMTogQkFURVLDjUEgU1VBVkUgPT09PT09PQpjb25zdCBkcnVtcyA9IHN0YWNrKAogIHMoImJkKjIiKS5nYWluKDAuOCkucm9vbSgwLjIpLAogIHMoImhoKjQiKS5nYWluKDAuMSkucGFuKCI8LTAuMyAwLjM%2BIikuc2hhcGUoMC40KSwKICBzKCJyaW0qMiIpLmdhaW4oMC4zKS5yb29tKDAuNCkubWFzaygiPDAgMT4vOCIpCikuYmFuaygnY3JhdGUnKQoKLy8gPT09PT09PSBDQVBBIDI6IENIT1JEUyBBVE1PU0bDiVJJQ09TID09PT09PT0KY29uc3QgcGFkcyA9IGNob3Jkcy5vZmZzZXQoLTEpCiAgLnZvaWNpbmcoKQogIC5zKCJnbV9lcGlhbm8xOjEiKQogIC5waGFzZXIoMikKICAucm9vbSgwLjgpCiAgLmdhaW4oMC44KQogIC5scGYoc2luZS5yYW5nZSg4MDAsIDE1MDApLnNsb3coMTIpKQogIC5jb2xvcigic2t5Ymx1ZSIpCgovLyA9PT09PT09IENBUEEgMzogQkFKTyAvIE1FTE9Ew41BID09PT09PT0KY29uc3QgYmFzcyA9IG4oIjwwITMgMSoyPiIpLnNldChjaG9yZHMpCiAgLm1vZGUoInJvb3Q6ZzIiKQogIC52b2ljaW5nKCkKICAucygiZ21fYWNvdXN0aWNfYmFzcyIpCiAgLmdhaW4oMC43KQogIC5yb29tKDAuNSkKICAuc2hhcGUoMC40KQogIC5scGYoNjAwKQogIC5zbG93KDIpCgovLyA9PT09PT09IENBUEEgNDogVEVYVFVSQVMgPT09PT09PQpjb25zdCB0ZXh0dXJlID0gcygicGFkKjEiKQoKICAuZ2FpbigwLjMpCiAgLnJvb20oMC45KQogIC5zaGFwZSgwLjIpCiAgLmxwZihzaW5lLnJhbmdlKDQwMCwxMDAwKS5zbG93KDE2KSkKICAuY29sb3IoImxhdmVuZGVyIikKCgpzdGFjayhkcnVtcywgcGFkcywgYmFzcywgdGV4dHVyZSkK"
    },
    {
      title: "Hard Techno Algorave",
      url: "https://strudel.cc/?theme=dark#CnNldENwcygxNTAvNjAvNCkKCnNhbXBsZXMoJ2dpdGh1YjphbGdvcmF2ZS1kYXZlL3NhbXBsZXMnKQpzYW1wbGVzKCdnaXRodWI6dGlkYWxjeWNsZXMvZGlydC1zYW1wbGVzJykKCmNvbnN0IFN0cnVjdHVyZXMgPSBbCiAgInt4IH4hNiB4IH4gfnh%2BITMgeCB%2BfSUxNiIsCiAgInt4KjR9IiwKICAKICAKICAKICAie359IgpdCgpjb25zdCBQRyA9IFsKICAiezAuMyAwLjghNiAwLjMgMC44ITIgMC4zIDAuOCEzIDAuMyAxfSIsCiAgInswLjMgMC44fSU4IiwKICAiezAuOH0iCl0KCmNvbnN0IGJlYXQgPSAxCgpEUlVNUzogc3RhY2soCiAgcygidGVjaDo1IikKICAgIC5wb3N0Z2Fpbig1KQogICAgLnBjdXJ2ZSgyKQogICAgLnBkZWMoMSkKICAgIC5zdHJ1Y3QocGljayhTdHJ1Y3R1cmVzLCBiZWF0KSksCgogIHMoIlt%2BIGNwXSIpCiAgICAuYmFuaygiS29yZ0RETTExMCIpCiAgICAuc3BlZWQoMSkKICAgIC5mYXN0KDIpCiAgICAucG9zdGdhaW4oMC4xNSkKICAgIC5scGYoMzAwMCksCgogIHMoImhoIikKICAgIC5zdHJ1Y3QoIlt4ITMgfiEyIHghMTAgfl0iKQogICAgLnBvc3RnYWluKDAuNSkKICAgIC5iYW5rKCJSb2xhbmRUUjgwOCIpCiAgICAuc3BlZWQoMS4yNSkKICAgIC5qdXgocmV2KQogICAgLnJvb20oc2luZS5yYW5nZSgwLjEsIDAuNCkpCiAgICAuZ2FpbigwLjYpLAoKICBzKCJ%2BIGhoIikKICAgIC5iYW5rKCJSb2xhbmRUUjgwOCIpCiAgICAucm9vbSgwLjcpCiAgICAuc3BlZWQoMC43NSkKICAgIC5nYWluKDAuNSkKICAgIC5mYXN0KDQpLAoKICBzKCJicmVha3MxNjUiKQogICAgLmdhaW4oMC40KQogICAgLmxvb3BBdCgxKQogICAgLmNob3AoMTYpLAoKICBzKCJwc3I6WzJ8MTJ8MjR8MjVdIikKICAgIC5mYXN0KDQpCiAgICAuc3RydWN0KCJ4ITcgfiB4IH4iKQogICAgLmp1eChyZXYpCiAgICAuaHBmKDEwMDApCiAgICAucG9zdGdhaW4ocGljayhQRywgYmVhdCkpCiAgICAuc3BlZWQoMC41KQogICAgLmdhaW4oMC4yKQopLl9wdW5jaGNhcmQoe3dpZHRoOjcwMH0pCgoKQkFTU0xJTkU6IG5vdGUoImYjM0AzIGQzQDUgYTNAOCBjIzNAMyBkM0A1IGMjM0A1IikKICAuc3RydWN0KCJ4KjE2IikKICAuc3VzdGFpbigwLjUpCiAgLnNvdW5kKCJbc3F1YXJlLCBzYXd0b290aF0iKQogIC50cmFuc3Bvc2UoLTEyKQogIC5jb2Fyc2UoMikKICAuZGVjYXkoMC4wNzUpCiAgLmdhaW4oMC43NSkKICAuaHBmKDE1MCkKICAubHBmKG1vdXNlWC5zZWdtZW50KDQpLnJhbmdlKDM1MCwgMjAwMCkpCiAgLnBvc3RnYWluKHBpY2soUEcsIGJlYXQpKQogIC5fcHVuY2hjYXJkKHt3aWR0aDo2MDB9KQoKCg%3D%3D"
    },
    {
      title: "Deep House",
      url: "https://strudel.cc/?theme=dark#c2V0Y3BtKDMwKQoKbGV0IGNob3JkcyA9IG4oIjwwLDIsNCw2PiIpLnNjYWxlKCI8QzM6bWlub3IgQzM6bWlub3IgRTM6bWlub3IgRDM6bWFqb3I%2BIikKbGV0IHN5bnRoUmV2ZXJiQ3RybCA9IHNsaWRlcigwLjQ1NykKbGV0IHN5bnRoR2FpbkN0cmwgPSBzbGlkZXIoMC40MDcsIDAsIDEpCgpzdGFjaygKICAvLyA9PT0gR1JPT1ZFIFBSSU5DSVBBTCA9PT0KICBzdGFjaygKICAgIHMoImhoIikKICAgICAgLnN0cnVjdCgiWzEgMSAxIDFdKjQiKQogICAgICAuZGVsYXkoMC4xKQogICAgICAuZ2FpbigiWzAuMDUgMC4yIDAuNSAwLjJdKjQiKSwgLy8gaGktaGF0CgogICAgcygiamF6ejoyIikKICAgICAgLnN0cnVjdCgiMSAwIDAgMCAwIDAgMSAwIiksIC8vIHBlcmN1c2nDs24gamF6egoKICAgIGNob3JkcwogICAgICAuc3RydWN0KCI8W3gwMiAtIHggLSB4MDIgLV0gW3hdIFt4XSBbeF0%2BIikKICAgICAgLnMoIjxnbV9lcGlhbm8yOjIsIHRyaWFuZ2xlPiIpCiAgICAgIC5kZWxheSgwLjI1KQogICAgICAucm9vbSgwLjIpCiAgICAgIC5scGYoOTAwKQogICAgICAuZ2FpbigwLjgpCiAgKQogICAgLm1hc2soIjwxIDEgMSAxIDEgMSAxIDE%2BLzQiKQogICAgLl9waWFub3JvbGwoKSwKCiAgLy8gPT09IEtJQ0sgKGJham8gcGVyY3VzaXZvKSA9PT0KICBzKCJqYXp6IikKICAgIC5zdHJ1Y3QoIlsxIDAgMSAwIDEgMCAxIDBdIikKICAgIC5yb29tKDAuMDYpCiAgICAuZ2FpbigiPDAuOCAwLjggMC44IDAuOCAwLjggMC44IDEuNSAxLjU%2BLzQiKQogICAgLm1hc2soIjwwIDEgMSAxIDEgMSAxIDE%2BLzQiKSwKCiAgLy8gPT09IEJBU1NMSU5FID09PQogIHN0YWNrKAogICAgcygiamF6ejoxIikKICAgICAgLmV1Y2xpZFJvdCg1LCAxNiwgMSkKICAgICAgLmdhaW4oc2xpZGVyKDAuNSwgMCwgMC41KSksIC8vIGdyb292ZSBiYXNlCgogICAgbigiMWIiKQogICAgICAuc2NhbGUoIkMyOm1pbm9yIikKICAgICAgLnN0cnVjdCgiMSBbMCAxXSBbMCAxXSAwIDAgMSA8MCBbMCAxXT4gMCIpCiAgICAgIC5nYWluKHNsaWRlcigxLCAwLCAxKSkgLy8gbMOtbmVhIGRlIGJham8KICApCiAgICAubWFzaygiPDAgMCAxIDEgMSAxIDEgMT4vNCIpLAoKICAvLyA9PT0gSElIQVQgeSBTTkFSRSBleHRyYSA9PT0KICBzdGFjaygKICAgIHMoInRyNzA3X2hoIikKICAgICAgLnN0cnVjdCgiWzAgMSAwIDEgMCAxIDAgMV0iKQogICAgICAuZGVsYXkoMC4xKQogICAgICAucm9vbSgwLjEpCiAgICAgIC5nYWluKHNsaWRlcigwLjUsIDAsIDEpKSwKCiAgICBzKCJqYXp6OjciKQogICAgICAuc3RydWN0KCIwIDAgMSAwIDAgMCAxIDAiKQogICAgICAucm9vbSgwLjMpCiAgICAgIC5nYWluKHNsaWRlcigxLCAwLCAxKSkgLy8gc25hcmUKICApCiAgICAubWFzaygiPDAgMCAwIDEgMSAxIDEgMT4vNCIpLAoKICAvLyA9PT0gU1lOVEggTUVMT0RJQ08gPT09CiAgc3RhY2soCiAgICBzKCJqYXp6OjYiKQogICAgICAuZXVjbGlkUm90KDksIDE2LCAzKQogICAgICAubHBmKHBlcmxpbi5yYW5nZSg0MDAsIDQwMDApKQogICAgICAucm9vbSgwLjAzKQogICAgICAuZ2FpbigiPDAuMSAwLjEgMC4xIDAuMSAwLjIgMC4yNSAwLjQ1IDAuNSAwLjU1IDAuNiAwLjY1IDAuNyAwLjc1Pi80IiksCgogICAgbigiMSA8MCAzPiAzIDIgMiAxIDAgMSIpCiAgICAgIC5jaG9yZCgiPENtNyBDbTcgQ203IENtNyBFbTcgRW03IERtNyBEbTc%2BIikKICAgICAgLnMoInNhd3Rvb3RoIikKICAgICAgLmxwZihwZXJsaW4ucmFuZ2UoNTAwLCA0MDAwKSkKICAgICAgLmRlbGF5KHN5bnRoUmV2ZXJiQ3RybCkKICAgICAgLnJvb20oc3ludGhSZXZlcmJDdHJsKQogICAgICAuZmFzdCgyKQogICAgICAuZ2FpbihzeW50aEdhaW5DdHJsKQogICkKICAgIC5tYXNrKCI8MCAwIDAgMCAxIDEgMSAxPi80IikKICAgIC5fcGlhbm9yb2xsKCkKKQo%3D"
    }
  ]

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
          className="text-center mb-8"
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

        {/* Strudel iframes */}
        <div className="space-y-12">
          {samples.map((sample, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              {/* Título del sample */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <h2 className={`text-2xl sm:text-3xl font-bold ${
                  actualTheme === 'light'
                    ? 'text-gray-900'
                    : 'text-white'
                }`}>
                  {sample.title}
                </h2>
                <div className={`h-1 w-24 mt-2 rounded-full ${
                  actualTheme === 'light'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gradient-to-r from-purple-400 to-pink-400'
                }`} />
              </motion.div>

              <div className={`rounded-2xl overflow-hidden border-4 shadow-2xl ${
                actualTheme === 'light'
                  ? 'border-purple-300 shadow-purple-200/50'
                  : 'border-purple-500/50 shadow-purple-500/20'
              }`}>
                <iframe
                  src={sample.url}
                  title={`Strudel REPL - ${sample.title}`}
                  className="w-full h-[70vh] md:h-[75vh] lg:h-[80vh]"
                  allow="microphone; midi"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
