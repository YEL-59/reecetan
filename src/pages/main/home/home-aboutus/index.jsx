import { Button } from '@/components/ui/button'
import aboutus from "@/assets/home/aboutus.png"
import aboutus2 from "@/assets/home/aboutus2.png"
import aboutus3 from "@/assets/home/aboutus3.png"

const HomeAboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <img
              src={aboutus}
              alt="About Us"
              className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              About Us
            </h2>

            <div className="space-y-4 text-gray-700">
              <p className="text-md leading-relaxed">
                Welcome to Rank One Review & Training Center, where dreams are nurtured and achievements are celebrated. We believe that every individual has the potential to excel and reach great heights. Our center is not just a place of learning but a sanctuary of inspiration and growth.
              </p>

              <p className="text-md leading-relaxed">
                At Rank One, we strive to create an environment where passion meets purpose. We understand that the journey towards success is not always easy, but with the right guidance and support, it becomes an exhilarating adventure. Our dedicated team of experienced professionals is committed to helping you unlock your true potential and surpass your own expectations.
              </p>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
              More About Us
            </Button>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-1 lg:order-2">
            <img
              src={aboutus2}
              alt="About Us"
              className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="order-2 lg:order-1 space-y-6">


            <div className="space-y-4 text-gray-700">
              <p className="text-md font-semibold leading-relaxed">
                Rank One Review Center is dedicated to providing exceptional courses and training programs to help you achieve your goals and excel in your chosen field.               </p>

              <p className="text-md leading-relaxed">
                At Rank One, we strive to create an environment where passion meets purpose. We understand that the journey towards success is not always easy, but with the right guidance and support, it becomes an exhilarating adventure. Our dedicated team of experienced professionals is committed to helping you unlock your true potential and surpass your own expectations.
              </p>
            </div>


          </div>
        </div>
      </div>







      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Upgrade Your Skills With
            <span className="text-primary"> Online Course</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <img
              src={aboutus3}
              alt="About Us"
              className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="order-1 lg:order-2 space-y-6">


            <div className="space-y-4 text-gray-700">
              <p className="text-md leading-relaxed">
                <span className='text-primary'>1)</span>Discover our Top Courses at RankOne Review Center, where excellence meets accomplishment. As a highly regarded institution, we offer an exceptional selection of meticulously designed courses that empower individuals to excel in their respective fields. Our unwavering commitment to quality training and unwavering support ensures your learning potential is maximized.
              </p>

              <p className="text-md leading-relaxed">
                <span className='text-primary'>2)</span>Immerse yourself in our vibrant learning community, where we provide the necessary knowledge, skills, and confidence to help you reach new heights. Choose RankOne Review Center as your trusted learning partner and together we will unlock your potential, paving the way for a brighter future.
              </p>
              <p className="text-md leading-relaxed">
                <span className='text-primary'>3)</span>For those aspiring to pass professional licensure exams, our comprehensive review courses are tailored to your specific needs. Led by experienced instructors, we navigate you through the complexities of these exams, equipping you with in-depth subject knowledge, effective strategies, and essential practice materials for success. At RankOne Review Center, your triumph is our primary focus.
              </p>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAboutUs