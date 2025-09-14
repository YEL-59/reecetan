import { axiosPublic } from '@/lib/axios.config'
import { useQuery } from '@tanstack/react-query'

// Simple and clean hook for courses data
export const useGetCourses = (categoryId = null) => {
  return useQuery({
    queryKey: ['courses', categoryId],
    queryFn: async () => {
      const response = await axiosPublic.get('/online-courses')
      return formatCoursesData(response.data, categoryId)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Format raw API data to ensure consistency
export const formatCoursesData = (data, categoryId = null) => {
  // Handle direct array response (no wrapper object)
  const coursesArray = Array.isArray(data) ? data : (data?.data || [])
  
  if (!Array.isArray(coursesArray) || coursesArray.length === 0) {
    return []
  }

  let courses = coursesArray.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    image: getCourseImageUrl(course.image),
    price: parseFloat(course.price) || 0,
    level: course.level,
    duration: course.duration,
    language: course.language,
    courseType: course.course_type,
    categoryId: course.category_id,
    category: course.category ? {
      id: course.category.id,
      name: course.category.name,
      description: course.category.description,
    } : null,
    instructor: course.user ? {
      id: course.user.id,
      name: course.user.name,
      email: course.user.email,
      isVerified: course.user.is_verified,
    } : null,
    rating: course.rating ? {
      id: course.rating.id,
      ratingPoint: course.rating.rating_point,
    } : null,
    creator: course.creator ? {
      id: course.creator.id,
      name: course.creator.name,
      email: course.creator.email,
      isVerified: course.creator.is_verified,
    } : null,
    updater: course.updater ? {
      id: course.updater.id,
      name: course.updater.name,
      email: course.updater.email,
      isVerified: course.updater.is_verified,
    } : null,
    createdAt: course.created_at,
    updatedAt: course.updated_at,
  }))

  // Filter by category if specified
  if (categoryId) {
    courses = courses.filter(course => course.categoryId === categoryId)
  }

  return courses
}

// Convert relative image path to full URL
export const getCourseImageUrl = (imagePath) => {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Convert relative path to full URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'
  return `${baseUrl.replace('/api', '')}/storage/${imagePath}`
}

// Search courses hook with debouncing
export const useSearchCourses = (query) => {
  return useQuery({
    queryKey: ['searchCourses', query],
    queryFn: async () => {
      if (!query || query.trim().length === 0) {
        return []
      }
      const response = await axiosPublic.get(`/hero-sections/search/courses?query=${encodeURIComponent(query)}`)
      return formatCoursesData(response.data)
    },
    enabled: !!query && query.trim().length > 0, // Only run query if there's a search term
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Raw API functions (if needed for other purposes)
export const coursesApi = {
  getCourses: () => axiosPublic.get('/online-courses'),
  searchCourses: (query) => axiosPublic.get(`/hero-sections/search/courses?query=${encodeURIComponent(query)}`),
}

