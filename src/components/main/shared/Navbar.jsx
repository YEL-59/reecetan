import { Link } from 'react-router-dom'
import { Bell, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  // Mock authentication state - replace with actual auth logic
  const isAuthenticated = false // Change this to true to test logged-in state

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center relative">
              {/* Lightbulb icon */}
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
              </svg>
              {/* Light rays */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">EduHTrainerCo</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link to="/courses" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
            <Link to="/testimonial" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Testimonial
            </Link>
          </nav>

          {/* User Section - Conditional Rendering */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Logged in user - show profile section
              <>
                {/* Notification Bell */}
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                
                {/* User Avatar and Name */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">A</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Abir Adnan</span>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
              </>
            ) : (
              // Not logged in - show login/signup buttons
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Log In
                </Link>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
