import axios from 'axios'
import { secureTokenManager } from './secure-auth'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'

// Create public axios instance (for non-authenticated requests)
export const axiosPublic = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Create private axios instance (for authenticated requests)
export const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor for private instance to add token
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = secureTokenManager.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling token expiration
axiosPrivate.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      secureTokenManager.clearTokens()
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

// Response interceptor for public instance
axiosPublic.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

