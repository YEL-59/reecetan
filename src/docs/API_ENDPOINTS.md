# Authentication API Endpoints

Based on your Postman collection, here are the authentication endpoints implemented:

## 🔐 Authentication Endpoints

### 1. User Registration
**Endpoint:** `POST /register`
**Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "password_confirmation": "password123"
}
```

### 2. User Login
**Endpoint:** `POST /login`
**Payload:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Forgot Password
**Endpoint:** `POST /forgot-password`
**Payload:**
```json
{
  "email": "john@example.com"
}
```

### 4. Reset Password
**Endpoint:** `POST /reset-password`
**Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

### 5. Verify OTP
**Endpoint:** `POST /verify-otp`
**Payload:**
```json
{
  "email": "john@example.com",
  "otp": "622848"
}
```

## 🔧 Implementation

### Auth Hooks Available:
- `useSignUp()` - User registration
- `useSignIn()` - User login
- `useForgotPassword()` - Send password reset email
- `useResetPassword()` - Reset user password
- `useVerifyOTP()` - Verify OTP code
- `useSignout()` - User logout (local)
- `useAuthStatus()` - Check authentication status
- `useRequireAuth()` - Protected route guard
- `useRequireGuest()` - Guest route guard

### Features:
✅ **Exact API Match** - Endpoints match your Postman collection  
✅ **Form Validation** - Zod schema validation  
✅ **Error Handling** - Comprehensive error management  
✅ **Token Management** - Automatic token storage/retrieval  
✅ **Console Logging** - Detailed API call logging  
✅ **React Hook Form** - Form state management  
✅ **Toast Notifications** - User feedback  
✅ **Navigation** - Automatic redirects  

### Usage Example:
```jsx
import { useSignIn } from '@/hooks/auth-api.hook'

function LoginForm() {
  const { form, mutate, isPending } = useSignIn()
  
  const handleSubmit = form.handleSubmit((data) => {
    mutate(data) // Calls POST /login
  })
  
  return (
    <form onSubmit={handleSubmit}>
      <input {...form.register('email')} />
      <input {...form.register('password')} type="password" />
      <button disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

## 🌐 Base URL
```
https://reecetan.softvencefsd.xyz/api
```

## 📝 Notes
- All endpoints expect JSON payloads
- Token-based authentication (stored in localStorage)
- Automatic error handling with toast notifications
- Console logging for debugging
- Form validation with Zod schemas
