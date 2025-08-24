import { Outlet } from 'react-router-dom'
import authImg from '@/assets/auth.png'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:block">
        <img src={authImg} alt="Authentication" className="w-full h-full object-cover" />
      </div>

      {/* Right Side - Content */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
