// 🏠 Home Page API Exports
// This file serves as the main entry point for all home-related API functions

// Hero Sections API
export {
  useGetHeroSection,
  useGetHeroSectionById,
  getHeroImageUrl
} from './heroSections.api'

// Hero Images API (for slider)
export {
  useGetHeroImages,
  useGetHeroImagesById
} from './heroImages.api'

// About Us API
export {
  useGetAboutUs,
  formatAboutUsData,
  getAboutUsImageUrl
} from './aboutUs.api'

// Future home APIs can be added here:
// export { coursesApi, usePopularCourses } from './courses.api'
// export { testimonialsApi, useTestimonials } from './testimonials.api'

// Example of how you can add more APIs:
// export * from './popularCourses.api'
// export * from './testimonials.api'
// export * from './statistics.api'
