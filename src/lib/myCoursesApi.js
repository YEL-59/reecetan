import { axiosPrivate } from './axios.config'

/**
 * Get quiz data by quiz ID from course outline
 * @param {number} courseId - The ID of the course
 * @param {number} quizId - The ID of the quiz
 * @returns {Promise<Object>} API response with quiz data
 */
export const getQuizData = async (courseId, quizId) => {
  try {
    // First get the course outline to find the quiz
    const courseOutlineResult = await getCourseOutline(courseId)
    
    if (!courseOutlineResult.success) {
      return courseOutlineResult
    }
    
    const formattedCourse = formatCourseOutline(courseOutlineResult.data)
    
    // Find the quiz in the course lessons
    let foundQuiz = null
    let foundPart = null
    
    for (const lesson of formattedCourse.lessons) {
      for (const part of lesson.parts) {
        if (part.quiz && part.quiz.id == quizId) {
          foundQuiz = part.quiz
          foundPart = part
          break
        }
      }
      if (foundQuiz) break
    }
    
    if (!foundQuiz) {
      return {
        success: false,
        error: 'Quiz not found',
        message: 'The quiz you are looking for does not exist in this course'
      }
    }
    
    return {
      success: true,
      data: {
        quiz: foundQuiz,
        part: foundPart,
        course: {
          id: formattedCourse.id,
          title: formattedCourse.title
        }
      },
      message: 'Quiz data retrieved successfully'
    }
  } catch (error) {
    console.error('Get quiz data error:', error)
    return {
      success: false,
      error: 'Unexpected error',
      message: 'Failed to load quiz data. Please try again'
    }
  }
}

/**
 * Get course outline with lessons, parts, and quizzes
 * @param {number} courseId - The ID of the course to fetch
 * @returns {Promise<Object>} API response with course outline
 */
export const getCourseOutline = async (courseId) => {
  try {
    const response = await axiosPrivate.get(`/courses/${courseId}/quiz`)
    
    return {
      success: true,
      data: response.data.course,
      message: 'Course outline retrieved successfully'
    }
  } catch (error) {
    console.error('Get course outline error:', error)
    
    // Handle different error scenarios
    if (error.response) {
      const status = error.response.status
      const errorData = error.response.data
      
      if (status === 401) {
        return {
          success: false,
          error: 'Authentication required',
          message: 'Please log in to view this course'
        }
      } else if (status === 403) {
        return {
          success: false,
          error: 'Access denied',
          message: 'You are not enrolled in this course'
        }
      } else if (status === 404) {
        return {
          success: false,
          error: 'Course not found',
          message: 'The course you are looking for does not exist'
        }
      } else if (status >= 500) {
        return {
          success: false,
          error: 'Server error',
          message: 'Something went wrong on our end. Please try again later'
        }
      }
      
      return {
        success: false,
        error: errorData?.message || 'Failed to fetch course outline',
        message: errorData?.message || 'Unable to load course outline. Please try again'
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error',
        message: 'Please check your internet connection and try again'
      }
    } else {
      return {
        success: false,
        error: 'Unexpected error',
        message: 'Something went wrong. Please try again'
      }
    }
  }
}

/**
 * Format course outline data for display
 * @param {Object} courseOutlineData - Raw course outline data from API
 * @returns {Object} Formatted course outline
 */
export const formatCourseOutline = (courseOutlineData) => {
  return {
    id: courseOutlineData.id,
    title: courseOutlineData.title,
    completedParts: courseOutlineData.completed_parts || 0,
    totalParts: courseOutlineData.total_parts || 0,
    progressPercentage: courseOutlineData.total_parts > 0 
      ? Math.round((courseOutlineData.completed_parts / courseOutlineData.total_parts) * 100)
      : 0,
    
    lessons: courseOutlineData.lessons?.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      completed: false, // TODO: Calculate based on completed parts
      locked: false, // TODO: Implement lesson locking logic
      
      parts: lesson.parts?.map(part => ({
        id: part.id,
        title: part.title,
        duration: part.duration || 'No duration',
        video: part.video,
        completed: false, // TODO: Track individual part completion
        
        quiz: part.quiz ? {
          id: part.quiz.id,
          title: part.quiz.title,
          questions: part.quiz.questions?.map(question => ({
            id: question.id,
            questionText: question.question_text,
            options: question.options?.map(option => ({
              id: option.id,
              text: option.option_text.en || option.option_text,
              isCorrect: option.is_correct
            })) || []
          })) || [],
          totalQuestions: part.quiz.questions?.length || 0,
          completed: false, // TODO: Track quiz completion
          score: null // TODO: Track quiz scores
        } : null
      })) || []
    })) || []
  }
}

/**
 * Get course details with lessons and parts
 * @param {number} courseId - The ID of the course to fetch
 * @returns {Promise<Object>} API response with course details
 */
export const getCourseDetails = async (courseId) => {
  try {
    const response = await axiosPrivate.get(`/courses/${courseId}`)
    
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    }
  } catch (error) {
    console.error('Get course details error:', error)
    
    // Handle different error scenarios
    if (error.response) {
      const status = error.response.status
      const errorData = error.response.data
      
      if (status === 401) {
        return {
          success: false,
          error: 'Authentication required',
          message: 'Please log in to view this course'
        }
      } else if (status === 403) {
        return {
          success: false,
          error: 'Access denied',
          message: 'You are not enrolled in this course'
        }
      } else if (status === 404) {
        return {
          success: false,
          error: 'Course not found',
          message: 'The course you are looking for does not exist'
        }
      } else if (status >= 500) {
        return {
          success: false,
          error: 'Server error',
          message: 'Something went wrong on our end. Please try again later'
        }
      }
      
      return {
        success: false,
        error: errorData?.message || 'Failed to fetch course',
        message: errorData?.message || 'Unable to load course details. Please try again'
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error',
        message: 'Please check your internet connection and try again'
      }
    } else {
      return {
        success: false,
        error: 'Unexpected error',
        message: 'Something went wrong. Please try again'
      }
    }
  }
}

/**
 * Get user's enrolled courses
 * @returns {Promise<Object>} API response with enrolled courses data
 */
export const getMyEnrolledCourses = async () => {
  try {
    const response = await axiosPrivate.get('/my-courses')
    
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    }
  } catch (error) {
    console.error('Get enrolled courses error:', error)
    
    // Handle different error scenarios
    if (error.response) {
      const status = error.response.status
      const errorData = error.response.data
      
      if (status === 401) {
        return {
          success: false,
          error: 'Authentication required',
          message: 'Please log in to view your courses'
        }
      } else if (status === 403) {
        return {
          success: false,
          error: 'Access denied',
          message: 'You are not authorized to view this content'
        }
      } else if (status >= 500) {
        return {
          success: false,
          error: 'Server error',
          message: 'Something went wrong on our end. Please try again later'
        }
      }
      
      return {
        success: false,
        error: errorData?.message || 'Failed to fetch courses',
        message: errorData?.message || 'Unable to load your courses. Please try again'
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Network error',
        message: 'Please check your internet connection and try again'
      }
    } else {
      return {
        success: false,
        error: 'Unexpected error',
        message: 'Something went wrong. Please try again'
      }
    }
  }
}

/**
 * Format course details data for display
 * @param {Object} courseDetailsData - Raw course details data from API
 * @returns {Object} Formatted course details
 */
export const formatCourseDetails = (courseDetailsData) => {
  const course = courseDetailsData.course
  const lessons = courseDetailsData.lessons || []
  
  return {
    // Course basic info
    id: course.id,
    title: course.title,
    description: course.description,
    image: getCourseImageUrl(course.image),
    price: parseFloat(course.price) || 0,
    level: course.level,
    duration: course.duration,
    language: course.language,
    courseType: course.course_type,
    
    // Instructor/Creator info
    instructor: course.creator ? {
      id: course.creator.id,
      name: course.creator.name,
      email: course.creator.email,
      isVerified: course.creator.is_verified
    } : null,
    
    // Lesson and progress info
    lessons: lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      parts: lesson.parts?.map(part => ({
        id: part.id,
        title: part.title,
        video: part.video,
        content: part.content,
        createdAt: part.created_at,
        updatedAt: part.updated_at
      })) || []
    })),
    
    // Progress tracking
    totalParts: courseDetailsData.totalParts || 0,
    completedParts: courseDetailsData.completedParts || 0,
    currentPart: courseDetailsData.currentPart || null,
    previousPart: courseDetailsData.previousPart || null,
    nextPart: courseDetailsData.nextPart || null,
    
    // Calculated values
    totalLessons: lessons.length,
    progressPercentage: courseDetailsData.totalParts > 0 
      ? Math.round((courseDetailsData.completedParts / courseDetailsData.totalParts) * 100)
      : 0,
    
    // Additional metadata
    createdAt: course.created_at,
    updatedAt: course.updated_at,
  }
}

/**
 * Format enrolled course data for display
 * @param {Object} enrolledCourse - Raw enrolled course data from API
 * @returns {Object} Formatted course data
 */
export const formatEnrolledCourse = (enrolledCourse) => {
  const course = enrolledCourse.course
  
  return {
    // Enrollment info
    enrollmentId: enrolledCourse.id,
    enrolledAt: enrolledCourse.enrolled_at,
    status: enrolledCourse.status,
    progress: 0, // TODO: Calculate based on lessons completed
    
    // Course info
    id: course.id,
    title: course.title,
    description: course.description,
    image: getCourseImageUrl(course.image),
    price: parseFloat(course.price) || 0,
    level: course.level,
    duration: course.duration,
    language: course.language,
    courseType: course.course_type,
    
    // Instructor info (using creator as instructor)
    instructor: course.user_id ? `Course ID: ${course.user_id}` : 'Unknown Instructor',
    
    // Additional info
    lessons: course.lessons || [],
    rating: 4.5, // Default rating - could be calculated from actual ratings
    lastAccessed: formatLastAccessed(enrolledCourse.updated_at),
  }
}

/**
 * Convert relative image path to full URL
 * @param {string} imagePath - Relative image path
 * @returns {string} Full image URL
 */
const getCourseImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop'
  
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'
  return `${baseUrl.replace('/api', '')}/storage/courses/${imagePath}`
}

/**
 * Format the last accessed time
 * @param {string} updatedAt - ISO date string
 * @returns {string} Formatted time string
 */
const formatLastAccessed = (updatedAt) => {
  const now = new Date()
  const updated = new Date(updatedAt)
  const diffInHours = Math.floor((now - updated) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
}
