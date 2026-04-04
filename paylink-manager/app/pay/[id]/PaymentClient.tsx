'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  linkId: string
  status: string
}

function formatCardNumber(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value: string) {
  const clean = value.replace(/\D/g, '').slice(0, 4)
  if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
  return clean
}

function validateCard(number: string, expiry: string, cvv: string, name: string) {
  const errors: Record<string, string> = {}

  if (number.replace(/\s/g, '').length < 16)
    errors.number = 'Número de tarjeta inválido'

  if (expiry.length < 5) {
    errors.expiry = 'Fecha inválida'
  } else {
    const [mm, yy] = expiry.split('/')
    const month = parseInt(mm)
    const year = parseInt('20' + yy)
    const now = new Date()
    if (month < 1 || month > 12) errors.expiry = 'Mes inválido'
    else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1))
      errors.expiry = 'Tarjeta vencida'
  }

  if (cvv.length < 3) errors.cvv = 'CVV inválido'

  if (name.trim().length < 3) errors.name = 'Ingresá el nombre completo'

  return errors
}

export default function PaymentClient({ linkId, status }: Props) {
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState<'card' | 'cash'>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  if (status === 'paid') {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">✓</span>
        </div>
        <p className="font-bold text-gray-800 text-lg">¡Este link ya fue pagado!</p>
        <p className="text-gray-400 text-sm mt-1">El pago fue procesado exitosamente.</p>
      </div>
    )
  }

  async function handlePay() {
    if (method === 'card') {
      const validationErrors = validateCard(cardNumber, expiry, cvv, cardName)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
    }

    setErrors({})
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await fetch(`/api/links/${linkId}`, { method: 'PATCH' })

    router.push(`/pay/${linkId}/success`)
  }

  return (
    <div className="p-6 flex flex-col gap-4">

      {/* Selector de método */}
      <div className="flex gap-3">
        <button
          onClick={() => setMethod('card')}
          className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-colors ${
            method === 'card'
              ? 'border-[#FC4C02] bg-orange-50 text-[#FC4C02]'
              : 'border-gray-200 text-gray-400'
          }`}
        >
          💳 Tarjeta
        </button>
        <button
          onClick={() => setMethod('cash')}
          className={`flex-1 py-3 rounded-xl border-2 text-sm font-bold transition-colors ${
            method === 'cash'
              ? 'border-[#FC4C02] bg-orange-50 text-[#FC4C02]'
              : 'border-gray-200 text-gray-400'
          }`}
        >
          💵 Efectivo
        </button>
      </div>

      {/* Campos de tarjeta */}
      {method === 'card' && (
        <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={cardNumber}
              onChange={(e) => {
                setCardNumber(formatCardNumber(e.target.value))
                setErrors((prev) => ({ ...prev, number: '' }))
              }}
              className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all ${
                errors.number ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.number && <p className="text-red-500 text-xs">{errors.number}</p>}
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <input
                type="text"
                placeholder="MM/AA"
                value={expiry}
                onChange={(e) => {
                  setExpiry(formatExpiry(e.target.value))
                  setErrors((prev) => ({ ...prev, expiry: '' }))
                }}
                className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all ${
                  errors.expiry ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => {
                  setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))
                  setErrors((prev) => ({ ...prev, cvv: '' }))
                }}
                className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all ${
                  errors.cvv ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Nombre en la tarjeta"
              value={cardName}
              onChange={(e) => {
                setCardName(e.target.value)
                setErrors((prev) => ({ ...prev, name: '' }))
              }}
              className={`border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

        </div>
      )}

      {method === 'cash' && (
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">
            Podés pagar en efectivo en cualquier tienda de conveniencia cercana.
          </p>
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={loading}
        className="bg-[#FC4C02] text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Procesando...
          </>
        ) : (
          'Pagar ahora'
        )}
      </button>

      <p className="text-xs text-center text-gray-400">🔒 Pago seguro procesado por PayLink</p>
    </div>
  )
}