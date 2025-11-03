'use client'
import { useI18n } from "@/app/providers"
import BooGame from '@/components/BooGame'

export default function BooPage() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <BooGame />
    </div>
  )
}
