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

// Categories API
export {
  useGetCategories,
  formatCategoriesData,
  categoriesApi
} from './categories.api'

// Courses API
export {
  useGetCourses,
  useSearchCourses,
  formatCoursesData,
  getCourseImageUrl,
  coursesApi
} from './courses.api'

// Testimonials API
export {
  useGetTestimonials,
  useSubmitTestimonial,
  formatTestimonialsData,
  formatSingleTestimonialData,
  getTestimonialCourseImageUrl,
  generateAvatarUrl,
  testimonialsApi
} from './testimonials.api'

// Future home APIs can be added here:
// export * from './statistics.api'
