import React from 'react'
import aboutLearningProcessImg from '@/assets/aboutus/aboutlearningprocess.png'
import findCourse from '@/assets/aboutus/find-course.png'
import watchLesson from '@/assets/aboutus/watch.png'
import completeAssignment from '@/assets/aboutus/assement.png'
import getCertified from '@/assets/aboutus/certified.png'

const AboutLearningProcess = () => {
  // JSON data for learning process steps
  const learningProcessSteps = [
    {
      id: 1,
      title: "Find Your Course",
      description: "Discover expert-led courses tailored to your goals and interests. Browse our comprehensive catalog to find the perfect learning path for your career advancement.",
      icon: findCourse,
      alt: "Find course icon"
    },
    {
      id: 2,
      title: "Watch Engaging Lessons",
      description: "Learn at your own pace through high-quality video content from industry professionals. Our engaging lessons make complex topics easy to understand and retain.",
      icon: watchLesson,
      alt: "Watch lesson icon"
    },
    {
      id: 3,
      title: "Complete Online Assignments",
      description: "Apply your knowledge with interactive tasks and real-world exercises. Our practical assignments help you build hands-on experience and reinforce your learning.",
      icon: completeAssignment,
      alt: "Complete assignment icon"
    },
    {
      id: 4,
      title: "Get Certified",
      description: "Earn a recognized certificate to showcase your new skills and boost your career. Our certifications are industry-recognized and help you stand out in the job market.",
      icon: getCertified,
      alt: "Get certified icon"
    }
  ]

  return (
    <>
      {/* Title Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">
            Learning <span className="text-blue-600">Process</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how our step-by-step system empowers your learning journey from start to certification.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Learning Process Steps */}
            <div className="order-1 lg:order-1 flex items-center">
              <div className="space-y-8 w-full">
                {learningProcessSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img 
                        src={step.icon} 
                        alt={step.alt} 
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="order-2 lg:order-2">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={aboutLearningProcessImg} 
                  alt="Student with books and graduation cap" 
                  className="w-full h-auto object-fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutLearningProcess