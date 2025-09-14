import { axiosPublic, axiosPrivate } from '@/lib/axios.config'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Get all testimonials/experiences with pagination
export const useGetTestimonials = (page = 1) => {
  return useQuery({
    queryKey: ['testimonials', page],
    queryFn: async () => {
      const response = await axiosPublic.get(`/share-experiance?page=${page}`)
      return formatTestimonialsData(response.data)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Submit new testimonial/experience (requires authentication)
export const useSubmitTestimonial = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (testimonialData) => {
      const response = await axiosPrivate.post('/share-experiance', testimonialData)
      return formatSingleTestimonialData(response.data)
    },
    onSuccess: () => {
      // Invalidate and refetch testimonials after successful submission
      queryClient.invalidateQueries(['testimonials'])
    },
  })
}

// Format paginated testimonials data
export const formatTestimonialsData = (data) => {
  if (!data || !Array.isArray(data.data)) {
    return {
      testimonials: [],
      pagination: {
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 15,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }
  }

  const testimonials = data.data.map(testimonial => formatSingleTestimonialData(testimonial))

  return {
    testimonials,
    pagination: {
      currentPage: data.current_page,
      lastPage: data.last_page,
      total: data.total,
      perPage: data.per_page,
      hasNextPage: !!data.next_page_url,
      hasPrevPage: !!data.prev_page_url,
      from: data.from,
      to: data.to,
    }
  }
}

// Format single testimonial data
export const formatSingleTestimonialData = (testimonial) => {
  return {
    id: testimonial.id,
    name: testimonial.name,
    description: testimonial.description,
    rating: testimonial.rating ? testimonial.rating.rating_point : 5,
    onlineCourseId: testimonial.online_course_id,
    ratingId: testimonial.rating_id,
    userId: testimonial.user_id,
    createdAt: testimonial.created_at,
    updatedAt: testimonial.updated_at,
    // Related data
    course: testimonial.online_course ? {
      id: testimonial.online_course.id,
      title: testimonial.online_course.title,
      description: testimonial.online_course.description,
      image: getTestimonialCourseImageUrl(testimonial.online_course.image),
      price: parseFloat(testimonial.online_course.price) || 0,
      level: testimonial.online_course.level,
      duration: testimonial.online_course.duration,
      language: testimonial.online_course.language,
      courseType: testimonial.online_course.course_type,
    } : null,
    user: testimonial.user ? {
      id: testimonial.user.id,
      name: testimonial.user.name,
      email: testimonial.user.email,
      isVerified: testimonial.user.is_verified,
      avatar: generateAvatarUrl(testimonial.user.name), // Generate avatar from name
    } : null,
  }
}

// Convert relative image path to full URL for course images
export const getTestimonialCourseImageUrl = (imagePath) => {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Convert relative path to full URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'
  return `${baseUrl.replace('/api', '')}/storage/${imagePath}`
}

// Generate avatar URL from user name (using UI Avatars service)
export const generateAvatarUrl = (name) => {
  if (!name) return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=150&background=006DFF&color=fff&bold=true`
}

// Raw API functions (if needed for other purposes)
export const testimonialsApi = {
  getTestimonials: (page = 1) => axiosPublic.get(`/share-experiance?page=${page}`),
  submitTestimonial: (data) => axiosPrivate.post('/share-experiance', data),
}
