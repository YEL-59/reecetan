import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Content */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <Outlet />
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="hidden lg:block relative bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome to Reecetan</h1>
              <p className="text-muted-foreground text-lg">
                Your AI-powered recipe assistant and culinary companion
              </p>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Smart recipe recommendations</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Personalized meal planning</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>AI-powered cooking assistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
