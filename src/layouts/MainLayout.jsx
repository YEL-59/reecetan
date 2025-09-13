import { Outlet } from 'react-router-dom'
import Navbar from '@/components/main/shared/Navbar'
import Footer from '@/components/main/shared/Footer'
import AIChatBot from '@/components/AIChatBot'
import { SessionMonitor, useAutoSessionExtension, AuthDebugPanel } from '@/components/auth/AuthGuard'

export default function MainLayout() {
  // Auto-extend session on user activity
  useAutoSessionExtension()

  return (
    <SessionMonitor>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AIChatBot />
        <AuthDebugPanel />
      </div>
    </SessionMonitor>
  )
}
