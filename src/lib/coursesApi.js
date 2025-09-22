import { axiosPrivate } from './axios.config'

/**
 * Enroll in a course
 * @param {number} courseId - The ID of the course to enroll in
 * @returns {Promise<Object>} API response with enrollment data
 */
export const enrollInCourse = async (courseId) => {
  try {
    const response = await axiosPrivate.post(`/courses/${courseId}/enroll`)
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'You have successfully enrolled in this course!'
    }
  } catch (error) {
    console.error('Course enrollment error:', error)
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const errorData = error.response.data
      
      if (status === 400 || status === 422) {
        return {
          success: false,
          error: 'Enrollment failed',
          message: errorData?.message || 'This is a paid course. Please buy it.'
        }
      } else if (status === 401) {
        return {
          success: false,
          error: 'Authentication required',
          message: 'Please log in to enroll in this course'
        }
      } else if (status === 403) {
        return {
          success: false,
          error: 'Access denied',
          message: 'You are not authorized to enroll in this course'
        }
      } else if (status === 409) {
        return {
          success: false,
          error: 'Already enrolled',
          message: 'You are already enrolled in this course'
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
        error: errorData?.message || 'Enrollment failed',
        message: errorData?.message || 'Unable to enroll in this course. Please try again'
      }
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network error',
        message: 'Please check your internet connection and try again'
      }
    } else {
      // Other error
      return {
        success: false,
        error: 'Unexpected error',
        message: 'Something went wrong. Please try again'
      }
    }
  }
}

/**
 * Get enrolled courses for the current user
 * @returns {Promise<Object>} API response with enrolled courses
 */
export const getEnrolledCourses = async () => {
  try {
    const response = await axiosPrivate.get('/courses/enrolled')
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    console.error('Get enrolled courses error:', error)
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch enrolled courses'
    }
  }
}

/**
 * Check if user is enrolled in a specific course
 * @param {number} courseId - The ID of the course to check
 * @returns {Promise<Object>} API response with enrollment status
 */
export const checkEnrollmentStatus = async (courseId) => {
  try {
    const response = await axiosPrivate.get(`/courses/${courseId}/enrollment-status`)
    return {
      success: true,
      data: response.data,
      isEnrolled: response.data.is_enrolled || false
    }
  } catch (error) {
    console.error('Check enrollment status error:', error)
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to check enrollment status',
      isEnrolled: false
    }
  }
}

