import { useMutation } from '@tanstack/react-query'
import { axiosPrivate } from '@/lib/axios.config'

export const useUpdatePassword = (options = {}) => {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword, confirmPassword }) => {
      if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error('All password fields are required')
      }
      if (newPassword !== confirmPassword) {
        throw new Error('New password and confirmation do not match')
      }
      const body = {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      }
      console.log('[useUpdatePassword] Sending request to /user/password/update', body)
      const res = await axiosPrivate.post('/user/password/update', body)
      return res.data
    },
    ...options,
  })
}


