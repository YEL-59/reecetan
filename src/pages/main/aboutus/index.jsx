import React from 'react'
import AboutHero from './about-hero'
import AboutMarketplace from './about-marketplace'
import AboutLearningProcess from './about-learning-process'
import AboutBanner from './about-banner'
import AboutChooseUs from './about-choose-us'
import HomeFeedback from '../home/home-feedback'
import Subscribcard from '@/components/main/shared/Subscribcard'

const AboutUs = () => {
  return (
    <>
    <div>
        <AboutHero />
        <AboutMarketplace />
        <AboutLearningProcess />
        <AboutBanner />
        <AboutChooseUs />
        <HomeFeedback />
    
        <Subscribcard />
    </div>
    
    </>
  )
}

export default AboutUs