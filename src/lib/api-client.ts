/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { env } from './env'

// Token management with localStorage sync
class TokenManager {
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor() {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken')
      this.refreshToken = localStorage.getItem('refreshToken')
    }
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    
    // Sync to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    }
  }

  getAccessToken(): string | null {
    // Always check localStorage as source of truth
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('accessToken')
      if (stored !== this.accessToken) {
        this.accessToken = stored
      }
    }
    return this.accessToken
  }

  getRefreshToken(): string | null {
    // Always check localStorage as source of truth
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('refreshToken')
      if (stored !== this.refreshToken) {
        this.refreshToken = stored
      }
    }
    return this.refreshToken
  }

  clearTokens() {
    this.accessToken = null
    this.refreshToken = null
    
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

export const tokenManager = new TokenManager()

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // Log if token is missing for authenticated endpoints
      if (config.url?.includes('/auth/') || config.url?.includes('/preferences/') || config.url?.includes('/orders/')) {
        console.warn('API request without token:', config.url)
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor: treat proxy-normalized 200 with _statusCode 401/404 as error so refresh/flow still works
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const statusCode = (response.data as { _statusCode?: number })?._statusCode
    if (statusCode === 401 || statusCode === 404) {
      const err = new Error(response.data?.message || 'Request failed') as any
      err.response = { ...response, status: statusCode, data: response.data }
      err.isAxiosError = true
      return Promise.reject(err)
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = tokenManager.getRefreshToken()
        if (refreshToken) {
          const response = await axios.post(`${env.API_URL}/api/auth/refresh`, {
            refreshToken,
          })

          // Handle response format: { success: true, accessToken: "...", refreshToken: "..." }
          const accessToken = response.data.accessToken || response.data.data?.accessToken
          const newRefreshToken = response.data.refreshToken || response.data.data?.refreshToken
          
          if (accessToken) {
            tokenManager.setTokens(accessToken, newRefreshToken || refreshToken)
          }

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        tokenManager.clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// API response type
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  user?: any
  accessToken?: string
  refreshToken?: string
  errors?: string[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API methods
export const api = {
  // Health check
  health: () => apiClient.get<ApiResponse>('/api/health'),

  // Authentication
  auth: {
    signup: (data: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      password: string
    }) => apiClient.post<ApiResponse>('/api/auth/signup', data),

    signin: (data: { email: string; password: string }) =>
      apiClient.post<ApiResponse>('/api/auth/signin', data),

    google: (data: { idToken: string; nonce?: string }) =>
      apiClient.post<ApiResponse>('/api/auth/google', data),

    signout: () => apiClient.post<ApiResponse>('/api/auth/signout'),

    me: () => apiClient.get<ApiResponse>('/api/auth/me'),

    refresh: (data: { refreshToken: string }) =>
      apiClient.post<ApiResponse>('/api/auth/refresh', data),
  },

  // Account management
  account: {
    checkEmail: (data: { email: string }) =>
      apiClient.post<ApiResponse>('/api/account/check-email', data),

    delete: (data: { reason: string }) =>
      apiClient.delete<ApiResponse>('/api/account/delete', { data }),

    recovery: {
      initiate: (data: { email: string }) =>
        apiClient.post<ApiResponse>('/api/account/recovery/initiate', data),

      complete: (data: {
        email: string
        recoveryToken: string
        newPassword: string
      }) =>
        apiClient.post<ApiResponse>('/api/account/recovery/complete', data),
    },
  },

  // OTP & Email verification
  otp: {
    send: (data: { email: string; type: string }) =>
      apiClient.post<ApiResponse>('/api/otp/send', data),

    verify: (data: { email: string; token: string }) =>
      apiClient.post<ApiResponse>('/api/otp/verify', data),

    verifyHash: (params: { token_hash: string; type: string }) =>
      apiClient.get<ApiResponse>('/api/otp/verify-hash', { params }),

    resetPassword: (data: { email: string }) =>
      apiClient.post<ApiResponse>('/api/otp/reset-password', data),
  },

  // Profile management
  profile: {
    get: () => apiClient.get<ApiResponse>('/api/profile'),

    update: (data: any) => apiClient.put<ApiResponse>('/api/profile', data),

    uploadPicture: (formData: FormData) =>
      apiClient.post<ApiResponse>('/api/profile/picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),

    deletePicture: () => apiClient.delete<ApiResponse>('/api/profile/picture'),
  },

  // User preferences & onboarding
  preferences: {
    get: () => apiClient.get<ApiResponse>('/api/users/preferences'),

    save: (data: {
      familySize: number
      role: string
      dietaryRestrictions: string[]
      cuisinePreferences: string[]
      budgetRange: string
      shoppingFrequency: string
      cookingFrequency: string
      cookingSkill: string
      mealPlanning: boolean
      favoriteIngredients: string[]
      allergies: string[]
    }) => apiClient.post<ApiResponse>('/api/users/preferences', data),

    update: (data: any) => apiClient.put<ApiResponse>('/api/users/preferences', data),

    onboardingStatus: () => apiClient.get<ApiResponse>('/api/users/onboarding-status'),
  },

  // Orders & Payment
  orders: {
    create: (data: {
      cartItems: Array<{ productId: string; quantity: number }>
      deliveryAddress: {
        street: string
        city: string
        region: string
        phone: string
        additionalInfo?: string
      }
      discount?: number
      credits?: number
      deliveryNotes?: string
    }) => apiClient.post<ApiResponse>('/api/orders', data),

    verifyPayment: (data: { reference: string }) =>
      apiClient.post<ApiResponse>('/api/orders/verify-payment', data),

    paymentStatus: (reference: string) =>
      apiClient.get<ApiResponse>(`/api/orders/payment-status?reference=${reference}`),

    list: (params?: { page?: number; limit?: number; status?: string }) =>
      apiClient.get<ApiResponse>('/api/orders', { params }),

    getById: (id: string) => apiClient.get<ApiResponse>(`/api/orders/${id}`),

    cancel: (id: string, reason: string) =>
      apiClient.post<ApiResponse>(`/api/orders/${id}/cancel`, { reason }),

    getPending: (pendingOrderId: string) =>
      apiClient.get<ApiResponse>(`/api/orders/pending/${pendingOrderId}`),

    cancelPending: (pendingOrderId: string) =>
      apiClient.post<ApiResponse>(`/api/orders/pending/${pendingOrderId}/cancel`),
  },

  // Bundles
  bundles: {
    list: (params?: { category?: string; limit?: number; offset?: number }) =>
      apiClient.get<ApiResponse>('/api/bundles', { params }),

    personalized: () => apiClient.get<ApiResponse>('/api/bundles/personalized'),

    getById: (bundleId: string) => apiClient.get<ApiResponse>(`/api/bundles/${bundleId}`),
  },

  // Cart
  cart: {
    get: () => apiClient.get<ApiResponse>('/api/cart'),

    addOrRemove: (data: {
      product_id: string
      action: 'add' | 'remove'
      quantity?: number
    }) => apiClient.post<ApiResponse>('/api/cart', data),

    clear: () => apiClient.delete<ApiResponse>('/api/cart'),
  },

  // Favorites
  favorites: {
    get: () => apiClient.get<ApiResponse>('/api/favorites'),

    addOrRemove: (data: {
      product_id: string
      action: 'add' | 'remove'
    }) => apiClient.post<ApiResponse>('/api/favorites', data),
  },
}

export default apiClient
