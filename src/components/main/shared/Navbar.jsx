import { Link } from 'react-router-dom'
import { Bell, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.png'

export default function Navbar() {
  // Mock authentication state - replace with actual auth logic
  const isAuthenticated = false // Change this to true to test logged-in state

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="RANK ONE REVIEW" 
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/aboutus" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link to="/courses" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <Link to="/contactus" className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
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
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full">
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
