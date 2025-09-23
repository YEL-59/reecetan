import { axiosPrivate } from './axios.config'

export const getQuizPerformance = async () => {
  try {
    const res = await axiosPrivate.get('/quiz-performance')
    return res.data
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to load quiz performance'
    return {
      status: false,
      message,
      data: {
        total_quizzes_taken: 0,
        pass_rate: 0,
        average_score: 0,
        quiz_performance_history: [],
        performance_by_course: [],
      },
    }
  }
}


