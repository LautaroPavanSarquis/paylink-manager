'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
  }, [router])

  function handleVolver() {
    router.refresh()
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 text-center">

        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>

        <h1 className="text-2xl font-black text-gray-800 mb-2">
          ¡Pago exitoso!
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Tu pago fue procesado correctamente por Paylink.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
          <p className="text-xs text-gray-400 mb-1">Estado del pago</p>
          <p className="font-bold text-green-600">✓ Aprobado</p>
        </div>

        <button
          onClick={handleVolver}
          className="text-sm text-[#FC4C02] font-bold hover:underline"
        >
          Volver al inicio
        </button>

        <p className="text-xs text-gray-300 mt-6">© 2026 PayLink, Inc.</p>
      </div>
    </main>
  )
}