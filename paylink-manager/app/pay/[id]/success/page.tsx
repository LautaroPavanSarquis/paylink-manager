import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 text-center">

        {/* Ícono de éxito */}
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>

        <h1 className="text-2xl font-black text-gray-800 mb-2">
          ¡Pago exitoso!
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Tu pago fue procesado correctamente por Paylink.
        </p>

        {/* Resumen */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
          <p className="text-xs text-gray-400 mb-1">Estado del pago</p>
          <p className="font-bold text-green-600">✓ Aprobado</p>
        </div>

        <Link
          href="/"
          className="text-sm text-[#FC4C02] font-bold hover:underline"
        >
          Volver al inicio
        </Link>

        <p className="text-xs text-gray-300 mt-6">© 2026 PayLink, Inc.</p>
      </div>
    </main>
  )
}