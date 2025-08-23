import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { ChevronDown, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import {
  Home,
  GraduationCap,
  BarChart3,
  FileText,
  User
} from 'lucide-react'

export default function DashboardLayout() {
  const location = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Courses', href: '/dashboard/my-courses', icon: GraduationCap },
    { name: 'Quiz Analytics', href: '/dashboard/quiz-analytics', icon: BarChart3 },
    { name: 'Certifications', href: '/dashboard/certifications', icon: FileText },
  ]

  const isActive = (href) => location.pathname === href

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked')
    // You can redirect to login page or clear user session
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar (desktop xl and up) */}
        <div className="hidden xl:block fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
          <div className="flex h-full flex-col">
            {/* Logo Section */}
            <div className="flex h-16 items-center px-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                {/* Shield Logo with Crown */}
                <div className="relative">
                  <div className="w-10 h-12 bg-blue-500 rounded-t-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-10 h-2 bg-blue-600 rounded-b-lg"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">RankReview</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${isActive(item.href)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-white' : 'text-gray-500'}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 xl:ml-64">
          {/* Fixed Header */}
          <div className="fixed top-0 right-0 left-0 xl:left-64 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
            {/* Menu trigger (visible below xl) */}
            <div className="xl:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <div className="flex h-16 items-center px-6 border-b border-gray-200">
                    <span className="text-lg font-bold text-gray-900">RankReview</span>
                  </div>
                  <nav className="px-3 py-4 space-y-1">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <SheetClose asChild key={item.name}>
                          <Link
                            to={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive(item.href) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <Icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-white' : 'text-gray-500'}`} />
                            {item.name}
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Right: user dropdown */}
            <div className="ml-auto">
              <div className="flex items-center space-x-3">
                {/* User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="hidden sm:inline text-sm font-medium text-gray-900">Abir Adnan</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Home className="w-4 h-4 mr-3" />
                        Home
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsDropdownOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content with top margin for fixed header */}
          <main className="bg-white min-h-screen pt-16 px-4 md:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
