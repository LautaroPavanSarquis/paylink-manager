'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateLinkForm() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [amountError, setAmountError] = useState('')
  const router = useRouter()

  function validateAmount(value: string): boolean {
    const num = Number(value)
    if (num <= 0) {
      setAmountError('El monto debe ser mayor a cero')
      return false
    }
    setAmountError('')
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateAmount(amount)) return

    setLoading(true)

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, amount, description }),
    })

    if (response.ok) {
      setName('')
      setAmount('')
      setDescription('')
      setAmountError('')
      router.refresh()
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-orange-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-[#FC4C02] rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-black">+</span>
        </div>
        <h2 className="text-gray-800 font-bold text-lg">Nuevo link de pago</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Nombre del producto
          </label>
          <input
            type="text"
            placeholder="Ej: Corte de cabello"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Monto (Arg)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              min="0.01"
              step="0.01"
              onChange={(e) => {
                setAmount(e.target.value)
                if (amountError) validateAmount(e.target.value)
              }}
              onBlur={(e) => validateAmount(e.target.value)}
              required
              className={`border rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all w-full ${
                amountError ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
          </div>
          {amountError && <p className="text-red-500 text-xs">{amountError}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Descripción <span className="text-gray-300 normal-case">(opcional)</span>
          </label>
          <input
            type="text"
            placeholder="Ej: Sesión del 5 de abril"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC4C02] focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#FC4C02] text-white font-bold py-3 rounded-xl hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-1"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creando...
            </>
          ) : (
            'Crear link de pago'
          )}
        </button>
      </form>
    </div>
  )
}