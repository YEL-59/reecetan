import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center relative">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"/>
                </svg>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">EduHTrainerCo</span>
            </div>
            <p className="text-sm text-gray-600">Empowering education through innovative training solutions.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/courses" className="hover:text-gray-900 transition-colors">Courses</Link></li>
              <li><Link to="/features" className="hover:text-gray-900 transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link to="/testimonial" className="hover:text-gray-900 transition-colors">Testimonials</Link></li>
              <li><Link to="/careers" className="hover:text-gray-900 transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/help" className="hover:text-gray-900 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2024 EduHTrainerCo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
