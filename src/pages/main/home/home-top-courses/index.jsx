import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import topCourse from '@/assets/home/top-cource.png'

const HomeTopCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Nursing Licensure Exam (NLE)",
      description: "Master the board exam with comprehensive, clinically focused training, expert mentorship, and AI-powered practice tests.",
      link: "Click Here"
    },
    {
      id: 2,
      title: "CLEX-RN & NCLEX-PN",
      description: "Conquer the gold standard in nursing licensure with our internationally recognized, adaptive learning system.",
      link: "Click Here"
    },
    {
      id: 3,
      title: "Criminology Board Exam",
      description: "Gain an unmatched advantage with forensic case analysis, legal mastery, and top-tier criminal justice education.",
      link: "Click Here"
    },
    {
      id: 4,
      title: "Licensure Examination for Teachers (LET)",
      description: "Excel in the classroom and in the exam with evidence-based teaching strategies, pedagogy workshops, and exam-focused drills.",
      link: "Click Here"
    }
  ]

  return (
    <section className="py-16 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Our Top <span className="text-primary">Courses</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-5xl mx-auto leading-relaxed">
            Your success isn't optional! It's inevitable with Rank One Review. We don't just help you pass, we train you to dominate your licensure exam with elite-level precision, expert guidance, and cutting-edge technology.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Students Image */}
          <div className="relative" data-aos="zoom-in">
            <img 
              src={topCourse} 
              alt="Students in lab coats"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Side - Course List */}
          <div className="space-y-0">
            {courses.map((course, index) => (
              <div key={course.id} data-aos="fade-left" data-aos-delay={index * 80}>
                <div className="py-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500  leading-relaxed">
                    {course.description}{' '}
                    <a 
                      href="#" 
                      className="text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      {course.link}
                    </a>
                  </p>
                </div>
               
              </div>
            ))}

            {/* Call to Action Button */}
            <div className="pt-8" data-aos="fade-up" data-aos-delay="200">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Explore All Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeTopCourses