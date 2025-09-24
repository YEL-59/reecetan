import { useMutation } from '@tanstack/react-query'
import { createStripePayment } from '@/lib/subscriptionApi'

export const useStripePayment = () => {
  return useMutation({
    mutationFn: async ({ courseId, paymentData }) => {
      return createStripePayment(courseId, paymentData)
    },
  })
}
