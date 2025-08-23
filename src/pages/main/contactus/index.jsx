import React from 'react'
import ContactHero from './contact-hero'
import ContactWithUs from './contact-withus'
import ContactForm from './contact-form'
import Subscribcard from '@/components/main/shared/Subscribcard'
import ContactMap from './contact-map'

const ContactUs = () => {
  return (
   <>
   
   <div>
    <ContactHero />
    <ContactWithUs />
    <ContactForm />
    <ContactMap />
    <Subscribcard />
   </div>
   </>
  )
}

export default ContactUs