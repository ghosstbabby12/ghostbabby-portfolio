'use client'
import { useI18n } from "@/app/providers"
import PacmanGame from '@/components/PacmanGame'

export default function PacmanPage() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <PacmanGame />
      
    </div>
  )
}
