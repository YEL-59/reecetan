import { axiosPublic } from '@/lib/axios.config'
import { useQuery } from '@tanstack/react-query'

// Simple and clean hook for about us data
export const useGetAboutUs = () => {
  return useQuery({
    queryKey: ['aboutUs'],
    queryFn: async () => {
      const response = await axiosPublic.get('/about-us')
      return formatAboutUsData(response.data)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Format raw API data to ensure consistency
export const formatAboutUsData = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null
  }

  // Get the first about us entry (assuming there's only one main about us section)
  const aboutUs = data[0]
  
  return {
    id: aboutUs.id,
    title: aboutUs.title || 'About Us',
    description: aboutUs.description || '',
    image: getAboutUsImageUrl(aboutUs.image),
    createdAt: aboutUs.created_at,
    updatedAt: aboutUs.updated_at,
  }
}

// Convert relative image path to full URL
export const getAboutUsImageUrl = (imagePath) => {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Convert relative path to full URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'
  return `${baseUrl.replace('/api', '')}/storage/${imagePath}`
}

// Raw API functions (if needed for other purposes)
export const aboutUsApi = {
  getAboutUs: () => axiosPublic.get('/about-us'),
}
