import React from 'react'
import aboutCountryBg from '@/assets/aboutus/aboutcountrybg.png'

const AboutBanner = () => {
  // JSON data for statistics
  const statistics = [
    {
      id: 1,
      number: "3K+",
      title: "Successfully Trained",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 2,
      number: "15K+",
      title: "Classes Completed",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 3,
      number: "97K+",
      title: "Satisfaction Rate",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    },
    {
      id: 4,
      number: "102K+",
      title: "Students Community",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ]

  return (
    <div>
      {/* Statistics Banner Section */}
      <div 
        className="py-20 relative"
        style={{
          backgroundImage: `url(${aboutCountryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Light peach overlay for better readability */}
        <div className="absolute inset-0 bg-orange-100 bg-opacity-60"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {statistics.map((stat) => (
              <div key={stat.id} className="text-center">
                {/* White circular icon background */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-blue-900">
                    {stat.icon}
                  </div>
                </div>
                
              <div>
                  {/* Large bold number */}
                  <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-3">
                  {stat.number}
                </div>
                
                {/* Description text */}
                <div className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                  {stat.title}
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutBanner