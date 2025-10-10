import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { env } from './env'

// Token management
class TokenManager {
  private accessToken: string | null = null
  private refreshToken: string | null = null

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  getRefreshToken(): string | null {
    return this.refreshToken
  }

  clearTokens() {
    this.accessToken = null
    this.refreshToken = null
  }

  isAuthenticated(): boolean {
    return !!this.accessToken
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
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
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

          const { accessToken, refreshToken: newRefreshToken } = response.data
          tokenManager.setTokens(accessToken, newRefreshToken)

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
}

export default apiClient
