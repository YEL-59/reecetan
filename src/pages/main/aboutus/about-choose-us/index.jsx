import React from 'react'
import aboutChooseUsImg from '@/assets/aboutus/aboutchoseus.png'

const AboutChooseUs = () => {
  // JSON data for features
  const features = [
    {
      id: 1,
      title: "Expert Instructors",
      description: "Learn from industry-leading professionals with real-world experience.",
      iconColor: "bg-blue-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Flexible Learning",
      description: "Study anytime, anywhere with lifetime access to course materials.",
      iconColor: "bg-green-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Affordable Pricing",
      description: "Access premium learning at a fraction of the cost.",
      iconColor: "bg-yellow-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Recognized Certification",
      description: "Get certified and enhance your resume with credentials that matter.",
      iconColor: "bg-purple-600",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      id: 5,
      title: "24/7 Student Support",
      description: "Get help when you need it — our support team is always ready.",
      iconColor: "bg-blue-900",
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Teal circular background */}
                <div className="w-96 h-96 bg-teal-400 rounded-full absolute -top-8 -left-8 opacity-20"></div>
                {/* Image */}
                <div className="relative z-10">
                  <img 
                    src={aboutChooseUsImg} 
                    alt="Student with laptop" 
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Rounded Content Card */}
            <div className="order-1 lg:order-2">
              <div className="relative lg:ml-[-40px]">
               
                <div className="relative p-6 md:p-8 lg:p-10">
                  {/* Heading */}
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Why Choose <span className="text-blue-600">Us</span>
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Explore how our step-by-step system empowers your learning journey from start to certification.
                  </p>

                  {/* Features */}
                  <div className="space-y-6">
                    {features.map((feature) => (
                      <div key={feature.id} className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${feature.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Soft highlight on the right to enhance the rounded feel */}
                <div className="hidden lg:block absolute top-1/2 right-[-24px] -translate-y-1/2 w-12 h-40 bg-white/70 blur-md rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutChooseUs
