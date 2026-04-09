import CreateLinkForm from '@/components/CreateLinkForm'
import PaylinkList from '@/components/PaylinkList'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-[#FC4C02] px-6 pt-10 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 0%, transparent 60%)' }}
        />
        <div className="max-w-md mx-auto relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#FC4C02] font-black text-sm">P</span>
            </div>
            <h1 className="text-white text-2xl font-black tracking-tight">ayLink</h1>
          </div>
          <p className="text-orange-100 text-sm">Paylink Manager</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 mt-6 mb-10">
        <CreateLinkForm />

        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-5 bg-[#FC4C02] rounded-full"></span>
          <h2 className="text-gray-800 font-bold">Tus links</h2>
        </div>

        <Suspense fallback={null}>
          <PaylinkList />
        </Suspense>
      </div>
    </main>
  )
}