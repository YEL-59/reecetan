import { axiosPublic } from '@/lib/axios.config'
import { useQuery } from '@tanstack/react-query'

// 🖼️ Simple Hero Images API Hook
export const useGetHeroImages = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["heroImages"],
    queryFn: async () => {
      const res = await axiosPublic.get('/hero-images');
      const rawData = res.data || [];
      
      // Handle array response - take the first item or empty object
      const heroImageData = Array.isArray(rawData) && rawData.length > 0 ? rawData[0] : {};
      
      // Format data directly in the hook
      return {
        id: heroImageData.id,
        images: heroImageData.images?.map(imagePath => getHeroImageUrl(imagePath)) || [],
        createdAt: heroImageData.created_at,
        updatedAt: heroImageData.updated_at
      };
    },
  });

  return { data, isLoading, isError };
};

export const useGetHeroImagesById = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["heroImages", id],
    keepPreviousData: true,
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/hero-images/${id}`);
      const rawData = res.data || {};
      
      // Format data directly in the hook
      return {
        id: rawData.id,
        images: rawData.images?.map(imagePath => getHeroImageUrl(imagePath)) || [],
        createdAt: rawData.created_at,
        updatedAt: rawData.updated_at
      };
    },
  });

  return { data, isLoading, isError };
};

// Helper function to get full image URL (reuse from heroSections)
const getHeroImageUrl = (imagePath) => {
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
