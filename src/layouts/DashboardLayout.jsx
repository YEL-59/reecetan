import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Home,
  GraduationCap,
  BarChart3,
  FileText,
  User
} from 'lucide-react'

export default function DashboardLayout() {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Courses', href: '/dashboard/my-courses', icon: GraduationCap },
    { name: 'Quiz Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Certifications', href: '/dashboard/certifications', icon: FileText },
  ]

  const isActive = (href) => location.pathname === href

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
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
        <div className="flex-1 ml-64">
          {/* Fixed Header */}
          <div className="fixed top-0 right-0 left-64 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-end px-6">
            <div className="flex items-center space-x-3">
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-900">Abir Adnan</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Page Content with top margin for fixed header */}
          <main className="bg-white min-h-screen pt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
