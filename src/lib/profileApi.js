import { axiosPrivate } from './axios.config'

export const getProfileInfo = async () => {
  try {
    const res = await axiosPrivate.get('/get-profile-info')
    return res.data
  } catch (error) {
    const message = error?.response?.data?.message || 'Failed to load profile'
    return { status: false, message, user: null }
  }
}

export const updateProfile = async ({ name, phone, file }) => {
  const formData = new FormData()
  if (name != null) formData.append('name', name)
  if (phone != null) formData.append('phone', phone)
  if (file) formData.append('profile_image', file)

  const res = await axiosPrivate.post('/profile-update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}



