import React from 'react'
import aboutMarketImg from '@/assets/aboutus/aboutmarket.png'
import { useGetAboutUs } from '../../home/api'

const AboutMarketplace = () => {
  // Fetch about us data from API
  const { data: aboutUsData, isLoading, isError } = useGetAboutUs()

  // Use API data with fallbacks
  const aboutDescription = aboutUsData?.description || "Rank One Review & Training Center is a place where dreams are nurtured, achievements are celebrated, and inspiration meets growth. We believe in the power of individual potential and the transformative impact of quality education. At Rank One, we understand that the journey to success is unique for each individual. Our dedicated team of experienced professionals is committed to creating an environment where passion meets purpose, and where every learner can unlock their full potential. We offer personalized education and tailored training programs designed to meet your specific needs. Our holistic approach combines comprehensive curriculum, innovative teaching methodologies, and state-of-the-art resources to ensure the best learning experience."
  return (
    <>
      {/* Title Section with Gradient Background */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
            The premier global marketplace for
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600">
            learning and instruction
          </h2>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={aboutMarketImg}
                  alt="Medical professionals collaborating"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right Side - About Us Text */}
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-blue-900 mb-6">
                About Us
              </h3>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                {/* Split description into paragraphs for better readability */}
                {aboutDescription.split('.').filter(sentence => sentence.trim()).map((sentence, index) => (
                  <p key={index}>
                    {sentence.trim()}.
                  </p>
                ))}

                <div className="pt-4">
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    View More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutMarketplace