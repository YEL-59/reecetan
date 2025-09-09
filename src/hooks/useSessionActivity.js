import { useEffect } from 'react'
import { secureTokenManager } from '@/lib/secure-auth'

// 🔄 Session Activity Tracker Hook
// Extends session when user is active and warns before expiry
export const useSessionActivity = () => {
  useEffect(() => {
    let activityTimer = null
    let warningTimer = null
    
    // Activity events to track
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    // Handle user activity
    const handleActivity = () => {
      if (secureTokenManager.isAuthenticated()) {
        // Clear existing timer
        if (activityTimer) {
          clearTimeout(activityTimer)
        }
        
        // Set new timer to extend session after 30 seconds of activity
        activityTimer = setTimeout(() => {
          secureTokenManager.extendSession()
          console.log('🔄 Session extended due to user activity')
        }, 30000)
      }
    }
    
    // Session expiry warning (15 minutes before expiry)
    const checkSessionExpiry = () => {
      const remaining = secureTokenManager.getSessionTimeRemaining()
      
      if (remaining <= 15 && remaining > 0) {
        // Show warning
        const event = new CustomEvent('auth:session-warning', { 
          detail: { minutesRemaining: remaining } 
        })
        window.dispatchEvent(event)
      }
    }
    
    // Add activity listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })
    
    // Check session expiry every minute
    const expiryChecker = setInterval(checkSessionExpiry, 60000)
    
    // Cleanup
    return () => {
      if (activityTimer) clearTimeout(activityTimer)
      if (warningTimer) clearTimeout(warningTimer)
      clearInterval(expiryChecker)
      
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
    }
  }, [])
}

// 🔔 Session Warning Hook
export const useSessionWarning = () => {
  useEffect(() => {
    const handleSessionWarning = (event) => {
      const { minutesRemaining } = event.detail
      
      // You can customize this to show a toast or modal
      console.warn(`⚠️ Session expires in ${minutesRemaining} minutes`)
      
      // Optional: Show toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.warning(`Session expires in ${minutesRemaining} minutes`)
      }
    }
    
    const handleSessionExpired = () => {
      console.warn('🚪 Session expired - user logged out')
      
      // Optional: Show toast notification
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error('Session expired. Please log in again.')
      }
      
      // Redirect to login
      window.location.href = '/signin'
    }
    
    window.addEventListener('auth:session-warning', handleSessionWarning)
    window.addEventListener('auth:session-expired', handleSessionExpired)
    
    return () => {
      window.removeEventListener('auth:session-warning', handleSessionWarning)
      window.removeEventListener('auth:session-expired', handleSessionExpired)
    }
  }, [])
}

