import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import homeSubs from '@/assets/home/home-subs.png'

const Subscribcard = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log('Subscribing email:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative rounded-2xl p-8 sm:p-12 overflow-hidden"
            style={{
              backgroundImage: `url(${homeSubs})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Dark overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-[#0A0F1E]/80"></div> */}

            {/* Content */}
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Subscribe Now
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Keep up with our latest courses and events by subscribing to our newsletter.
              </p>

              {/* Subscription Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-gray-900 placeholder-gray-500 border-0 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0A0F1E]"
                  required
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribcard