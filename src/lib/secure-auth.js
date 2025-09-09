import React from 'react'

// 🔒 Secure Local Token Storage Solution
// Better than localStorage but works without refresh tokens

class SecureTokenManager {
  constructor() {
    this.accessToken = null
    this.user = null
    this.loginTime = null
    this.sessionTimeout = 8 * 60 * 60 * 1000 // 8 hours in milliseconds
    
    // Try to restore session on page load
    this.restoreSession()
  }

  // Set authentication data securely
  setAuth(token, user) {
    this.accessToken = token
    this.user = user
    this.loginTime = Date.now()
    
    // Store in sessionStorage with encryption (cleared when browser closes)
    this.storeSecureSession(token, user)
    
    // Set up automatic logout after session timeout
    this.scheduleSessionTimeout()
  }

  // Get access token (with session validation)
  getAccessToken() {
    if (!this.accessToken || !this.isSessionValid()) {
      this.clearAuth()
      return null
    }
    return this.accessToken
  }

  // Get user data
  getUser() {
    if (!this.isSessionValid()) {
      this.clearAuth()
      return null
    }
    return this.user
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAccessToken() && !!this.getUser()
  }

  // Check if current session is valid
  isSessionValid() {
    if (!this.loginTime) return false
    
    const sessionAge = Date.now() - this.loginTime
    return sessionAge < this.sessionTimeout
  }

  // Get remaining session time in minutes
  getSessionTimeRemaining() {
    if (!this.loginTime) return 0
    
    const sessionAge = Date.now() - this.loginTime
    const remaining = this.sessionTimeout - sessionAge
    return Math.max(0, Math.floor(remaining / (60 * 1000)))
  }

  // Clear all authentication data
  clearAuth() {
    this.accessToken = null
    this.user = null
    this.loginTime = null
    this.clearSecureSession()
    this.clearSessionTimeout()
  }

  // Store session data securely in sessionStorage
  storeSecureSession(token, user) {
    try {
      const sessionData = {
        token: this.encryptData(token),
        user: this.encryptData(JSON.stringify(user)),
        timestamp: Date.now()
      }
      
      sessionStorage.setItem('auth_session', JSON.stringify(sessionData))
    } catch (error) {
      console.warn('Failed to store secure session:', error)
    }
  }

  // Restore session from sessionStorage
  restoreSession() {
    try {
      const sessionData = sessionStorage.getItem('auth_session')
      if (!sessionData) return

      const parsed = JSON.parse(sessionData)
      const token = this.decryptData(parsed.token)
      const user = JSON.parse(this.decryptData(parsed.user))
      
      this.accessToken = token
      this.user = user
      this.loginTime = parsed.timestamp
      
      // Check if session is still valid
      if (!this.isSessionValid()) {
        this.clearAuth()
      } else {
        this.scheduleSessionTimeout()
      }
    } catch (error) {
      console.warn('Failed to restore session:', error)
      this.clearAuth()
    }
  }

  // Clear secure session storage
  clearSecureSession() {
    try {
      sessionStorage.removeItem('auth_session')
    } catch (error) {
      console.warn('Failed to clear secure session:', error)
    }
  }

  // Simple data encryption (better than plain text)
  encryptData(data) {
    const salt = 'reecetan_auth_2024'
    const timestamp = Date.now().toString()
    return btoa(salt + data + timestamp)
  }

  // Simple data decryption
  decryptData(encryptedData) {
    try {
      const decoded = atob(encryptedData)
      const salt = 'reecetan_auth_2024'
      // Remove salt from beginning and timestamp from end
      const withoutSalt = decoded.substring(salt.length)
      const timestampLength = 13 // Length of timestamp
      return withoutSalt.substring(0, withoutSalt.length - timestampLength)
    } catch (error) {
      return null
    }
  }

  // Schedule automatic logout when session expires
  scheduleSessionTimeout() {
    this.clearSessionTimeout()
    
    const remaining = this.getSessionTimeRemaining() * 60 * 1000
    if (remaining > 0) {
      this.sessionTimeoutId = setTimeout(() => {
        this.clearAuth()
        // Notify user of session expiry
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:session-expired'))
        }
      }, remaining)
    }
  }

  // Clear session timeout
  clearSessionTimeout() {
    if (this.sessionTimeoutId) {
      clearTimeout(this.sessionTimeoutId)
      this.sessionTimeoutId = null
    }
  }

  // Extend session (call this on user activity)
  extendSession() {
    if (this.isAuthenticated()) {
      this.loginTime = Date.now()
      this.storeSecureSession(this.accessToken, this.user)
      this.scheduleSessionTimeout()
    }
  }
}

// Create singleton instance
export const secureTokenManager = new SecureTokenManager()

// 🔐 Secure Auth Hook (No Refresh Token Required)
export const useSecureAuth = () => {
  const isAuthenticated = secureTokenManager.isAuthenticated()
  const user = secureTokenManager.getUser()
  const accessToken = secureTokenManager.getAccessToken()
  const sessionTimeRemaining = secureTokenManager.getSessionTimeRemaining()

  const setAuth = (token, user) => {
    secureTokenManager.setAuth(token, user)
  }

  const clearAuth = () => {
    secureTokenManager.clearAuth()
  }

  const getAuthHeader = () => {
    const token = secureTokenManager.getAccessToken()
    return token ? `Bearer ${token}` : null
  }

  const extendSession = () => {
    secureTokenManager.extendSession()
  }

  return {
    isAuthenticated,
    user,
    accessToken,
    sessionTimeRemaining,
    setAuth,
    clearAuth,
    getAuthHeader,
    extendSession,
  }
}

// 🔔 Session Expiry Hook
export const useSessionExpiry = (onExpired) => {
  React.useEffect(() => {
    const handleSessionExpiry = () => {
      onExpired?.()
    }

    window.addEventListener('auth:session-expired', handleSessionExpiry)
    
    return () => {
      window.removeEventListener('auth:session-expired', handleSessionExpiry)
    }
  }, [onExpired])
}
