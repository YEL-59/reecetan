import { axiosPublic } from './axios.config'

/**
 * Subscribe to newsletter with email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} API response with subscription data
 */
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axiosPublic.post('/subscriptions', {
      email: email
    })
    
    return {
      success: true,
      data: response.data,
      message: 'Successfully subscribed to newsletter!'
    }
  } catch (error) {
    console.error('Subscription error:', error)
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const errorData = error.response.data
      
      if (status === 422) {
        return {
          success: false,
          error: 'Invalid email address or email already subscribed',
          message: errorData?.message || 'Please check your email address'
        }
      } else if (status === 429) {
        return {
          success: false,
          error: 'Too many requests',
          message: 'Please try again later'
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
        error: errorData?.message || 'Subscription failed',
        message: 'Unable to subscribe. Please try again'
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
 * Get all subscriptions (admin only)
 * @returns {Promise<Object>} API response with subscriptions list
 */
export const getSubscriptions = async () => {
  try {
    const response = await axiosPublic.get('/subscriptions')
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    console.error('Get subscriptions error:', error)
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch subscriptions'
    }
  }
}


