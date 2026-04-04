import Link from 'next/link'
import clientPromise from '@/lib/mongodb'

async function getLinks() {
  const client = await clientPromise
  const db = client.db('paylink')
  const links = await db
    .collection('links')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()
  return links
}

export default async function PaylinkList() {
  const links = await getLinks()

  if (links.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-orange-50 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">🔗</span>
        </div>
        <p className="text-gray-400 text-sm">No hay links todavía.</p>
        <p className="text-gray-300 text-xs mt-1">¡Creá el primero arriba!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <div
          key={link.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:border-orange-200 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-800 truncate">{link.name}</p>
              {link.description && (
                <p className="text-gray-400 text-xs mt-0.5 truncate">{link.description}</p>
              )}
              <p className="text-[#FC4C02] font-black text-xl mt-1">
                ${link.amount.toLocaleString('es-MX')}
                <span className="text-xs font-normal text-gray-400 ml-1">arg</span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                link.status === 'paid'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-orange-100 text-[#FC4C02]'
              }`}>
                {link.status === 'paid' ? '✓ Pagado' : '● Pendiente'}
              </span>
              <Link
                href={`/pay/${link.id}`}
                className="text-xs text-gray-400 hover:text-[#FC4C02] transition-colors flex items-center gap-1"
              >
                Ver checkout →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}