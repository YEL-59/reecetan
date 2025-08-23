import React from 'react'
import aboutHeroBg from '@/assets/aboutus/abouthero.png'

const ContactHero = () => {
  return (
   <>
   
     {/* Hero Section */}
     <div 
        className="relative h-64 md:h-80 lg:h-96 w-full flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.8) 60%, rgba(30, 58, 138, 0.6) 100%), url(${aboutHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
            Contact Us
          </h1>
        </div>
      </div>

    
   
   </>
  )
}

export default ContactHero