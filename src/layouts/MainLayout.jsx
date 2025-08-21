import { Outlet } from 'react-router-dom'
import Navbar from '@/components/main/shared/Navbar'
import Footer from '@/components/main/shared/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
