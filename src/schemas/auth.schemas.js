import { z } from 'zod'

// Sign Up Schema
export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string().min(6, 'Password confirmation is required'),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  terms_and_conditions: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
})

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Send OTP Schema
export const sendOtpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Match OTP Schema
export const matchOtpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  otp0: z.string().min(1, 'Required').max(1, 'Only 1 character allowed'),
  otp1: z.string().min(1, 'Required').max(1, 'Only 1 character allowed'),
  otp2: z.string().min(1, 'Required').max(1, 'Only 1 character allowed'),
  otp3: z.string().min(1, 'Required').max(1, 'Only 1 character allowed'),
})

// Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string().min(6, 'Password confirmation is required'),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
})

// Update Password Schema
export const updatePasswordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(6, 'New password must be at least 6 characters'),
  new_password_confirmation: z.string().min(6, 'Password confirmation is required'),
}).refine((data) => data.new_password === data.new_password_confirmation, {
  message: "New passwords don't match",
  path: ["new_password_confirmation"],
})

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  avatar: z.any().optional(), // File upload
})

