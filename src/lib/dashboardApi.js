import { axiosPrivate } from './axios.config'

export const getDashboard = async () => {
  try {
    const res = await axiosPrivate.get('/dashboard')
    return res.data
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to load dashboard'
    return {
      message,
      user: null,
      stats: { totalCourses: 0, inProgress: 0, inComplete: 0, certificates: 0 },
      enrollments: [],
    }
  }
}


