export default function LoadingPayPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Skeleton del header */}
        <div className="bg-gray-200 animate-pulse p-6 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
        </div>

        {/* Skeleton del monto */}
        <div className="text-center py-6 border-b border-gray-100">
          <div className="h-3 bg-gray-200 rounded w-24 mx-auto mb-3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
        </div>

        {/* Skeleton del formulario */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-14 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

      </div>
    </main>
  )
}