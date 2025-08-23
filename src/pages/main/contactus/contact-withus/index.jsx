import React from 'react'
// Import contact images from assets
import contactIcon from '@/assets/contactus/contact.png'
import mailIcon from '@/assets/contactus/mail.png'
import locationIcon from '@/assets/contactus/location.png'

const ContactWithUs = () => {
  // Contact information data
  const contactInfo = [
    {
      id: 1,
      title: "Contact info",
      icon: contactIcon,
      content: "+63 995 771 7202"
    },
    {
      id: 2,
      title: "Email Address",
      icon: mailIcon,
      content: "rank1_one@yahoo.com"
    },
    {
      id: 3,
      title: "Location",
      icon: locationIcon,
      content: "Rank One Review Center, MDY Commercial Centre, bldg. 1 unit 1:G#47 Dahlia Avenue, Cor. Fairlane st. Brgy. Fairview, Quezon City 1118, Philippines."
    }
  ]

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            CONTACT US
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Keep In Touch <span className="text-blue-600">With Us.</span>
          </h2>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <img src={item.icon} alt={item.title} className="w-12 h-12" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactWithUs