import { z } from 'zod'

// Common validation patterns
const phoneRegex = /^[0-9]{9}$/ // Just the 9 digits without country code
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Signup validation schema
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .regex(emailRegex, 'Please enter a valid email address'),
  
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Phone number must be 9 digits'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Signin validation schema
export const signinSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  password: z
    .string()
    .min(1, 'Password is required'),
})

// Profile update validation schema
export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .optional(),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .optional(),
  
  phoneNumber: z
    .string()
    .regex(phoneRegex, 'Phone number must be 9 digits')
    .optional(),
  
  preferences: z.object({
    familySize: z
      .number()
      .min(1, 'Family size must be at least 1')
      .max(20, 'Family size must be less than 20')
      .optional(),
    
    language: z
      .string()
      .min(2, 'Language must be at least 2 characters')
      .optional(),
    
    currency: z
      .string()
      .min(1, 'Currency is required')
      .optional(),
    
    dietaryRestrictions: z
      .array(z.string())
      .optional(),
    
    preferredCategories: z
      .array(z.string())
      .optional(),
  }).optional(),
})

// Password change validation schema
export const passwordChangeSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// OTP validation schema
export const otpSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  token: z
    .string()
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits')
    .regex(/^\d{6}$/, 'OTP must be 6 digits'),
})

// Password reset validation schema
export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
})

// Account recovery validation schema
export const accountRecoverySchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  recoveryToken: z
    .string()
    .min(1, 'Recovery token is required'),
  
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
})

// Type exports
export type SignupFormData = z.infer<typeof signupSchema>
export type SigninFormData = z.infer<typeof signinSchema>
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>
export type OtpFormData = z.infer<typeof otpSchema>
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>
export type AccountRecoveryFormData = z.infer<typeof accountRecoverySchema>
