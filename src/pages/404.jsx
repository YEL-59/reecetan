import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"
          data-aos="fade-down-right"
          data-aos-delay="200"
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce"
          data-aos="fade-down-left"
          data-aos-delay="400"
        />
        <div 
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"
          data-aos="fade-up-right"
          data-aos-delay="600"
        />
        
        {/* Rotating Elements */}
        <div 
          className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-blue-300 rounded-full opacity-30 animate-spin"
          style={{ animationDuration: '20s' }}
          data-aos="zoom-in"
          data-aos-delay="800"
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-12 h-12 border-2 border-purple-300 rounded-full opacity-30 animate-spin"
          style={{ animationDuration: '15s' }}
          data-aos="zoom-in"
          data-aos-delay="1000"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* 404 Number */}
          <div 
            className="mb-8"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div 
            className="mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the digital wilderness. 
              Don't worry, we'll help you find your way back!
            </p>
          </div>

          {/* Animated Illustration */}
          <div 
            className="mb-12"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="relative inline-block">
              {/* Main Character */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 relative animate-bounce">
                {/* Eyes */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                
                {/* Sad Expression */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                
                {/* Question Mark */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg animate-ping">
                  ?
                </div>
              </div>

              {/* Search Elements */}
              <div 
                className="absolute -top-8 -left-8 w-6 h-6 bg-red-400 rounded-full opacity-70 animate-pulse"
                data-aos="fade-right"
                data-aos-delay="700"
              />
              <div 
                className="absolute -bottom-6 -right-6 w-4 h-4 bg-green-400 rounded-full opacity-70 animate-pulse"
                data-aos="fade-left"
                data-aos-delay="900"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </Link>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full shadow-lg hover:shadow-xl hover:border-blue-400 hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </div>
          </div>

          {/* Helpful Links */}
          <div 
            className="mt-12"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <p className="text-gray-500 mb-4">Or try these helpful links:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { path: "/aboutus", label: "About Us", icon: "👥" },
                { path: "/contactus", label: "Contact", icon: "📞" },
                { path: "/login", label: "Login", icon: "🔐" }
              ].map((link, index) => (
                <div
                  key={link.path}
                  className="transform hover:scale-105 transition-transform duration-300"
                  data-aos="fade-up"
                  data-aos-delay={1000 + index * 100}
                >
                  <Link
                    to={link.path}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Fact */}
          <div 
            className="mt-12 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <p className="text-sm text-gray-600">
              💡 <strong>Fun Fact:</strong> The 404 error was first introduced by Tim Berners-Lee in 1990. 
              It's named after room 404 at CERN where the original web servers were located!
            </p>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
            data-aos="fade-in"
            data-aos-delay={i * 200}
          />
        ))}
      </div>
    </div>
  )
}

export default NotFound
