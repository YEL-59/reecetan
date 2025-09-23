import { axiosPrivate } from './axios.config'

/**
 * Fetch user certificates summary and list
 * @returns {Promise<{success:boolean,data:Array,total_enrollments:number,total_completed:number,total_in_progress:number,total_training_hours:number}>}
 */
export const getCertificates = async () => {
  try {
    const res = await axiosPrivate.get('/certificates')
    return res.data
  } catch (error) {
    // Normalize error shape similar to other API helpers
    const message = error?.response?.data?.message || 'Failed to load certificates'
    return {
      success: false,
      message,
      error: message,
      data: [],
      total_enrollments: 0,
      total_completed: 0,
      total_in_progress: 0,
      total_training_hours: 0,
    }
  }
}



