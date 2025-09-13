import { axiosPublic } from './axios.config'

/**
 * Submit contact form data
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - User's name
 * @param {string} contactData.email - User's email
 * @param {string} contactData.description - User's message/description
 * @returns {Promise<Object>} API response with contact data
 */
export const submitContactForm = async (contactData) => {
  try {
    const response = await axiosPublic.post('/contact-us', {
      name: contactData.name,
      email: contactData.email,
      description: contactData.description
    })
    
    return {
      success: true,
      data: response.data,
      message: 'Message sent successfully! We\'ll get back to you soon.'
    }
  } catch (error) {
    console.error('Contact form error:', error)
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const errorData = error.response.data
      
      if (status === 422) {
        return {
          success: false,
          error: 'Validation error',
          message: errorData?.message || 'Please check your form data and try again'
        }
      } else if (status === 429) {
        return {
          success: false,
          error: 'Too many requests',
          message: 'Please wait a moment before sending another message'
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
        error: errorData?.message || 'Failed to send message',
        message: 'Unable to send your message. Please try again'
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
 * Get all contact messages (admin only)
 * @returns {Promise<Object>} API response with contact messages list
 */
export const getContactMessages = async () => {
  try {
    const response = await axiosPublic.get('/contact-us')
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    console.error('Get contact messages error:', error)
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch contact messages'
    }
  }
}
