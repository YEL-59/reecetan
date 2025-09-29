import { axiosPublic } from '@/lib/axios.config'
import { useQuery } from '@tanstack/react-query'

// 🏠 Simple Hero Sections API Hooks
export const useGetHeroSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["heroSection"],
    queryFn: async () => {
      const res = await axiosPublic.get('/hero-sections');
    
      const rawArray = res.data || [];
      
      if (!Array.isArray(rawArray) || rawArray.length === 0) {
        return null;
      }

      const rawData = rawArray[0];
      
      // Format data directly in the hook
      return {
        id: rawData.id,
        title: rawData.title,
        description: rawData.description,
        image: getHeroImageUrl(rawData.image),
        createdAt: rawData.created_at,
        updatedAt: rawData.updated_at
      };
    },
  });

  return { data, isLoading, isError };
};

export const useGetHeroSectionById = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["heroSection", id],
    keepPreviousData: true,
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/hero-sections/${id}`);
      const rawData = res.data || {};
      
      // Format data directly in the hook
      return {
        id: rawData.id,
        title: rawData.title,
        description: rawData.description,
        image: getHeroImageUrl(rawData.image),
        createdAt: rawData.created_at,
        updatedAt: rawData.updated_at
      };
    },
  });

  return { data, isLoading, isError };
};

// Helper function to get full image URL
export const getHeroImageUrl = (imagePath) => {
  if (!imagePath) return null
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'
  // Remove /api from the end if it exists for storage URL
  const storageBaseUrl = baseUrl.replace('/api', '')
  
  // If imagePath already includes full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // If imagePath starts with /, remove it to avoid double slash
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  
  return `${storageBaseUrl}/storage/${cleanPath}`
}




export const useGetTopCourse = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['topcourse'],
    queryFn: async () => {
      const response = await axiosPublic.get('/top-courses')
      return response.data?.data[0]
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
  return { data, isLoading, isError };
}

