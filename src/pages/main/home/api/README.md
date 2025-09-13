# 🏠 Home Page API Module

This directory contains all API-related functionality for the Home page, following a modular architecture pattern.

## 📁 Structure

```
src/pages/main/home/api/
├── index.js                 # Main export file for all home APIs
├── heroSections.api.js      # Hero sections API functions and hooks
├── README.md               # This documentation file
└── (future API files)      # Additional APIs as needed
```

## 🔧 Usage

### Import APIs
```javascript
// Import specific APIs
import { useHeroSection, heroSectionsApi } from '../api'

// Or import everything
import * as homeApis from '../api'
```

### Hero Sections API

#### Simple Hooks
- `useGetHeroSection()` - Fetch hero section data
- `useGetHeroSectionById(id)` - Fetch specific hero section by ID

#### Utilities
- `getHeroImageUrl(imagePath)` - Convert relative image path to full URL
- `formatHeroSectionData(data)` - Format raw API data

### Example Implementation

```javascript
import { useGetHeroSection, formatHeroSectionData } from '../api'

const MyComponent = () => {
  const { data, isLoading, isError } = useGetHeroSection()
  const formattedData = formatHeroSectionData(data)
  
  if (isLoading) return <LoadingSkeleton />
  if (isError) return <ErrorComponent />
  
  return (
    <div>
      <h1>{formattedData.title}</h1>
      <p>{formattedData.description}</p>
      <img src={formattedData.image} alt="Hero" />
    </div>
  )
}
```

## 🚀 Adding New APIs

To add a new API module:

1. **Create API file**: `src/pages/main/home/api/newFeature.api.js`
2. **Export from index**: Add exports to `index.js`
3. **Follow patterns**: Use same structure as `heroSections.api.js`

### Template for New API File

```javascript
import { axiosPublic } from '@/lib/axios.config'
import { useQuery } from '@tanstack/react-query'

// Simple and clean hook
export const useGetYourFeature = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["yourFeature"],
    queryFn: async () => {
      const res = await axiosPublic.get('/your-endpoint');
      return res.data || {};
    },
  });

  return { data, isLoading, isError };
};

// Hook with ID parameter
export const useGetYourFeatureById = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["yourFeature", id],
    keepPreviousData: true,
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/your-endpoint/${id}`);
      return res.data || {};
    },
  });

  return { data, isLoading, isError };
};
```

## 🎯 Benefits of This Structure

1. **Modularity**: Each feature has its own API logic
2. **Reusability**: APIs can be easily shared across components
3. **Maintainability**: Easy to find and update specific functionality
4. **Testing**: Each API module can be tested independently
5. **Type Safety**: Easy to add TypeScript types per module
6. **Caching**: React Query provides automatic caching and background updates

## 📋 API Response Format

### Hero Sections Response
```json
{
  "title": "Get Our Online Courses\nAnywhere Anytime",
  "description": "Take the next step in your learning & Caregiving journey...",
  "image": "hero_images/Np0L0828VTwUleSn6MkD3wwD2LR5ztYQnyhVZe4j.png",
  "updated_at": "2025-09-11T09:01:11.000000Z",
  "created_at": "2025-09-11T09:01:11.000000Z",
  "id": 2
}
```

### Formatted Data
```javascript
{
  id: 2,
  title: "Get Our Online Courses\nAnywhere Anytime",
  description: "Take the next step in your learning & Caregiving journey...",
  image: "https://reecetan.softvencefsd.xyz/storage/hero_images/...",
  createdAt: "2025-09-11T09:01:11.000000Z",
  updatedAt: "2025-09-11T09:01:11.000000Z"
}
```

## 🔄 Future Enhancements

- Add TypeScript interfaces
- Implement optimistic updates
- Add offline support
- Create API mocking for development
- Add request/response interceptors
- Implement error boundaries
