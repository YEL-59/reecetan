

import React from 'react'
import aboutHeroBg from '@/assets/aboutus/abouthero.png'

const TestimonialHero = () => {
  return (
   <>
   
     {/* Hero Section */}
     <div 
        className="relative h-64 md:h-80 lg:h-96 w-full flex items-center justify-center"
        style={{
          backgroundImage: ` url(${aboutHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
          Student Testimonial
          </h1>
        </div>
      </div>

    
   
   </>
  )
}

export default TestimonialHero