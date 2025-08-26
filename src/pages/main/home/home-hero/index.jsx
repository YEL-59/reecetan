import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import homeBg from "@/assets/home/home-bg.png";
import homeRight from "@/assets/home/home-right.png";
import { useAOS } from "@/hooks/useAOS";

const HomeHero = () => {
  useAOS(); // Initialize AOS for this component

  return (
    <section
      className="relative min-h-[550px] sm:min-h-[600px] md:min-h-[650px] overflow-hidden"
      style={{
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/60"></div> */}

      {/* Background decorative elements */}
      {/* <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
      <div className="absolute top-32 left-20 w-24 h-24 bg-blue-300/10 rounded-full blur-lg"></div>
      <div className="absolute bottom-20 left-16 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl"></div> */}

      {/* Right side image fixed at bottom */}
      <div
        className="absolute bottom-0 right-40 w-full lg:w-1/2 h-full flex items-end justify-end"
        data-aos="fade-left"
      >
        <div className="relative w-full max-w-lg h-full flex items-end">
          <img
            src={homeRight}
            alt="Education and learning illustration"
            className="w-full h-auto max-h-full object-contain object-bottom"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[450px] sm:min-h-[500px]">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:space-y-8 text-white" data-aos="fade-up">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Get Our Online Courses
            </h1>

            {/* Sub-headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#14D27B' }}>
              Anywhere Anytime
            </h2>

            {/* Body Text */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
              Take the next step in your learning & Caregiving journey with
              courses designed by top professionals. Enjoy flexible online
              learning, engaging video content, interactive assessments, and a
              supportive community.
            </p>

            {/* Search Bar */}
            <div
              className="bg-white rounded-full p-1 flex items-center w-full max-w-md shadow-lg"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="flex items-center flex-1 px-4">
                <Search className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="flex-1 text-gray-900 placeholder-gray-500 outline-none text-sm bg-transparent"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 md:px-6 md:py-2.5 rounded-full font-medium text-sm">
                Search
              </Button>
            </div>
          </div>

          {/* Right Side - Empty space for image overlay */}
          <div className="hidden lg:block">
            {/* This space is intentionally left empty as the image is positioned absolutely */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
