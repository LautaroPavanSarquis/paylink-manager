import { notFound } from 'next/navigation'
import clientPromise from '@/lib/mongodb'
import PaymentClient from './PaymentClient'

async function getLink(id: string) {
  const client = await clientPromise
  const db = client.db('paylink')
  const link = await db.collection('links').findOne({ id })
  return link
}

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const link = await getLink(id)

  if (!link) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Header con info del comercio */}
        <div className="bg-[#FC4C02] p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-[#FC4C02] font-black text-xl">PayLink</span>
          </div>
          <h1 className="text-white font-bold text-lg">{link.name}</h1>
          {link.description && (
            <p className="text-orange-100 text-sm mt-1">{link.description}</p>
          )}
        </div>

        {/* Monto */}
        <div className="text-center py-6 border-b border-gray-100">
          <p className="text-gray-400 text-sm mb-1">Total a pagar</p>
          <p className="text-4xl font-black text-gray-800">
            ${link.amount.toLocaleString('es-MX')}
            <span className="text-lg font-normal text-gray-400 ml-1">Arg</span>
          </p>
        </div>

        {/* Formulario de pago - Client Component */}
        <PaymentClient linkId={link.id} status={link.status} />

        {/* Footer */}
        <div className="text-center py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">© 2026 PayLink, Inc.</p>
        </div>

      </div>
    </main>
  )
}
