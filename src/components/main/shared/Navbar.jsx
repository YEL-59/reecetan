import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ChevronDown, Home, User, LogOut, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/contexts/cart-context'

const Navbar = () => {
  const [isAuthenticated] = useState(true) // For demo purposes
  const { itemCount } = useCart()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold text-gray-900">RankReview</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/aboutus" className="text-gray-600 hover:text-gray-900 transition-colors">
              About Us
            </Link>
            <Link to="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
              Courses
            </Link>
            <Link to="/testimonial" className="text-gray-600 hover:text-gray-900 transition-colors">
              Testimonials
            </Link>
            <Link to="/contactus" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Logged in user - show profile section
              <>
                {/* Cart Icon */}
                <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* Notification Bell */}
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Olivia Rhye</span>
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-0" align="end">
                    {/* User Info Section */}
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Olivia Rhye</p>
                          <p className="text-xs text-gray-500">olivia@untitledui.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <Home className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/myaccount" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          <User className="w-4 h-4" />
                          <span>My Account</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // Not logged in - show auth buttons
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
