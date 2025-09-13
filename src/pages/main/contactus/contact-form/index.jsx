import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { submitContactForm } from '@/lib/contactApi'
import toast from 'react-hot-toast'

// Import contact image from assets
import contactImage from '@/assets/contactus/contactusbg.png'

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  description: z.string().min(10, 'Message must be at least 10 characters')
})

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data) => {
    try {
      const result = await submitContactForm(data)

      if (result.success) {
        toast.success('🎉 Message sent successfully! We\'ll get back to you soon.', {
          duration: 5000,
          style: {
            background: '#10B981',
            color: 'white',
          },
          iconTheme: {
            primary: 'white',
            secondary: '#10B981',
          },
        })
        reset()
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Image */}
          <div className="relative">
            <div className=" rounded-3xl p-8 h-[600px] flex items-center justify-center overflow-hidden">
              {/* Contact Image */}
              <img
                src={contactImage}
                alt="Contact Us"
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Decorative element */}
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-blue-400 rounded-full opacity-30"></div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send a Message
              </h2>
              <p className="text-gray-600 text-lg">
                We're here to help! Reach out with any questions, feedback, or support needs.
              </p>
            </div>

            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-700 font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter your message"
                      rows={5}
                      className={`w-full resize-none ${errors.description ? 'border-red-500' : ''}`}
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm