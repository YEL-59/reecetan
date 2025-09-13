import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStatus } from '@/hooks/auth.hook'
import { secureTokenManager } from '@/lib/secure-auth'

// 🛡️ Protected Route Component
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStatus()
    const location = useLocation()

    if (!isAuthenticated) {
        // Redirect to signin with return URL
        return (
            <Navigate
                to={`/signin?redirect=${encodeURIComponent(location.pathname)}`}
                replace
            />
        )
    }

    return children
}

// 👻 Guest Only Route Component (redirect authenticated users)
export const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStatus()

    if (isAuthenticated) {
        // Redirect authenticated users to dashboard
        return <Navigate to="/dashboard" replace />
    }

    return children
}

// 🔔 Session Monitor Component
export const SessionMonitor = ({ children }) => {
    useEffect(() => {
        const handleSessionExpired = () => {
            // Show notification or modal about session expiry
            alert('Your session has expired. Please sign in again.')
            window.location.href = '/signin'
        }

        // Listen for session expiry events
        window.addEventListener('auth:session-expired', handleSessionExpired)

        return () => {
            window.removeEventListener('auth:session-expired', handleSessionExpired)
        }
    }, [])

    return children
}

// 🕒 Auto Session Extension Hook (extend session on user activity)
export const useAutoSessionExtension = () => {
    useEffect(() => {
        const extendSession = () => {
            if (secureTokenManager.isAuthenticated()) {
                secureTokenManager.extendSession()
            }
        }

        // Extend session on user activity
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

        events.forEach(event => {
            document.addEventListener(event, extendSession, true)
        })

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, extendSession, true)
            })
        }
    }, [])
}

// 📊 Auth Status Display Component (for debugging)
export const AuthDebugPanel = () => {
    const { isAuthenticated, user, token } = useAuthStatus()
    const sessionTime = secureTokenManager.getSessionTimeRemaining()

    if (process.env.NODE_ENV !== 'development') {
        return null
    }

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
            <div className="font-bold mb-2">🔐 Auth Debug</div>
            <div>Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}</div>
            {user && <div>User: {user.name || user.email}</div>}
            <div>Token: {token ? '✅ Present' : '❌ Missing'}</div>
            <div>Session: {sessionTime}min remaining</div>
        </div>
    )
}
