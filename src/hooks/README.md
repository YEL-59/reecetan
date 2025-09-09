# Authentication Hook System

This comprehensive authentication hook system provides a complete solution for handling user authentication with TanStack Query and Redux integration.

## Features

- **Login/Register**: User authentication with email/password
- **Email Verification**: Email verification system
- **OTP Authentication**: Phone-based OTP verification
- **Password Management**: Forgot password, reset password, change password
- **Profile Management**: Update user profile information
- **2FA Support**: Two-factor authentication enable/disable
- **Token Management**: Automatic token refresh
- **Redux Integration**: Seamless integration with Redux store
- **TanStack Query**: Optimistic updates and caching

## Setup

The auth hook system is already integrated into your app. TanStack Query is configured in `src/main.jsx` with the QueryClient provider.

### Environment Variables

Make sure to set your API base URL:

```env
VITE_API_BASE_URL=https://reecetan.softvencefsd.xyz/api
```

## Usage

### Basic Authentication

```jsx
import { useAuth } from '@/hooks/auth.hook'

function LoginForm() {
  const { 
    login, 
    isLoggingIn, 
    loginError, 
    loginSuccess 
  } = useAuth()

  const handleLogin = (credentials) => {
    login({
      email: 'user@example.com',
      password: 'password123'
    })
  }

  return (
    <form onSubmit={handleLogin}>
      {/* Your form fields */}
      {loginError && <div>Error: {loginError.message}</div>}
      <button disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

### Registration

```jsx
function RegisterForm() {
  const { 
    register, 
    isRegistering, 
    registerError 
  } = useAuth()

  const handleRegister = (userData) => {
    register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+1234567890'
    })
  }

  // Component JSX
}
```

### Email Verification

```jsx
function EmailVerification() {
  const { 
    verifyEmail, 
    resendVerification,
    isVerifyingEmail,
    isResendingVerification 
  } = useAuth()

  const handleVerify = (token) => {
    verifyEmail(token)
  }

  const handleResend = (email) => {
    resendVerification(email)
  }

  // Component JSX
}
```

### OTP Authentication

```jsx
function OTPForm() {
  const { 
    sendOTP, 
    verifyOTP,
    isSendingOTP,
    isVerifyingOTP 
  } = useAuth()

  const handleSendOTP = (phone) => {
    sendOTP(phone)
  }

  const handleVerifyOTP = (phone, otp) => {
    verifyOTP(phone, otp)
  }

  // Component JSX
}
```

### Password Management

```jsx
function PasswordManagement() {
  const { 
    forgotPassword,
    resetPassword,
    changePassword,
    isForgotPassword,
    isResetPassword,
    isChangingPassword 
  } = useAuth()

  const handleForgotPassword = (email) => {
    forgotPassword(email)
  }

  const handleResetPassword = (token, newPassword) => {
    resetPassword(token, newPassword)
  }

  const handleChangePassword = (current, newPass) => {
    changePassword(current, newPass)
  }

  // Component JSX
}
```

### Profile Management

```jsx
function ProfileForm() {
  const { 
    user,
    profile,
    profileLoading,
    updateProfile,
    isUpdatingProfile 
  } = useAuth()

  const handleUpdateProfile = (profileData) => {
    updateProfile({
      name: 'Updated Name',
      phone: '+1234567890'
    })
  }

  if (profileLoading) return <div>Loading...</div>

  // Component JSX
}
```

### Auth Status Checking

```jsx
import { useAuthStatus } from '@/hooks/auth.hook'

function Header() {
  const { isAuthenticated, user, isGuest } = useAuthStatus()

  return (
    <header>
      {isAuthenticated ? (
        <div>Welcome, {user.name}!</div>
      ) : (
        <div>Please log in</div>
      )}
    </header>
  )
}
```

### Protected Routes

```jsx
import { useRequireAuth } from '@/hooks/auth.hook'

function ProtectedPage() {
  const isAuthenticated = useRequireAuth() // Redirects to login if not authenticated

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>
  }

  return <div>Protected content</div>
}
```

### Guest Routes (Redirect if authenticated)

```jsx
import { useRequireGuest } from '@/hooks/auth.hook'

function LoginPage() {
  const isGuest = useRequireGuest() // Redirects to dashboard if authenticated

  if (!isGuest) {
    return <div>Redirecting...</div>
  }

  return <LoginForm />
}
```

## Available Hooks

### `useAuth()`

Main authentication hook providing all auth functionality.

**Returns:**
- **State**: `user`, `accessToken`, `refreshToken`, `isAuthenticated`, `profile`, `profileLoading`
- **Actions**: `login`, `register`, `logout`, `updateProfile`, etc.
- **Loading States**: `isLoggingIn`, `isRegistering`, `isUpdatingProfile`, etc.
- **Error States**: `loginError`, `registerError`, `updateProfileError`, etc.
- **Success States**: `loginSuccess`, `registerSuccess`, etc.

### `useAuthStatus()`

Lightweight hook for checking authentication status.

**Returns:**
- `isAuthenticated`: Boolean indicating if user is logged in
- `user`: Current user object
- `accessToken`: Current access token
- `isGuest`: Boolean indicating if user is not logged in

### `useRequireAuth()`

Hook for protected routes that require authentication.

**Returns:**
- `isAuthenticated`: Boolean, redirects to login if false

### `useRequireGuest()`

Hook for guest-only routes (login, register pages).

**Returns:**
- `isGuest`: Boolean, redirects to dashboard if authenticated

## API Endpoints

The hook expects the following API endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/verify-email` - Email verification
- `POST /auth/resend-verification` - Resend verification email
- `POST /auth/forgot-password` - Forgot password
- `POST /auth/reset-password` - Reset password
- `POST /auth/send-otp` - Send OTP
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/refresh` - Refresh token
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password
- `POST /auth/logout` - Logout
- `POST /auth/2fa/enable` - Enable 2FA
- `POST /auth/2fa/verify` - Verify 2FA setup
- `POST /auth/2fa/disable` - Disable 2FA

## Redux Integration

The hook integrates with your existing Redux auth slice:

```javascript
// Actions used:
import { setCredentials, clearCredentials } from '@/store/slices/authSlice'

// State accessed:
const { user, accessToken, refreshToken } = useSelector(state => state.auth)
```

## Error Handling

All mutations include error handling. Errors are available through the hook:

```jsx
const { loginError, registerError } = useAuth()

if (loginError) {
  console.error('Login failed:', loginError.message)
  // Display error to user
}
```

## Demo Components

Check `src/hooks/auth-demo.jsx` for complete working examples of all authentication features.

## Customization

You can customize the hook by:

1. **Modifying API endpoints** in the `authAPI` object
2. **Changing navigation behavior** in mutation callbacks
3. **Adding custom error handling** in mutation callbacks
4. **Extending the Redux integration** for additional state management

## Notes

- The hook automatically handles token refresh
- All mutations invalidate relevant queries for cache consistency
- Loading states are provided for all operations
- The system supports both email and phone-based authentication
- 2FA functionality is included but optional
- The hook integrates seamlessly with React Router for navigation


