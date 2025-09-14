import { axiosPublic } from '@/lib/axios.config'
import { useQuery } from '@tanstack/react-query'

// Simple and clean hook for categories data
export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosPublic.get('/categories')
      return formatCategoriesData(response.data)
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Format raw API data to ensure consistency
export const formatCategoriesData = (data) => {
  // Handle both wrapper object format and direct array format
  const categoriesArray = data?.success && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : [])
  
  if (!Array.isArray(categoriesArray) || categoriesArray.length === 0) {
    return []
  }

  return categoriesArray.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    createdAt: category.created_at,
    updatedAt: category.updated_at,
  }))
}

// Raw API functions (if needed for other purposes)
export const categoriesApi = {
  getCategories: () => axiosPublic.get('/categories'),
}

