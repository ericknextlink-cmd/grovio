/* eslint-disable @typescript-eslint/no-explicit-any */
// API configuration and base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  user?: T
  accessToken?: string
  refreshToken?: string
  errors?: string[]
}

// Auth request types
export interface SignupRequest {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryCode: string
  password: string
}

export interface SigninRequest {
  email: string
  password: string
}

export interface GoogleAuthRequest {
  idToken: string
  nonce?: string
}

// Auth response types
export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    countryCode: string
    profilePicture?: string
    isEmailVerified: boolean
    isPhoneVerified: boolean
    role: string
    preferences?: {
      language: string
      currency: string
    }
    createdAt: string
    updatedAt: string
  }
  accessToken?: string
  refreshToken?: string
  errors?: string[]
}

// API service class
export class ApiService {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if token exists
    const token = localStorage.getItem('accessToken')
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // IMPORTANT: Include credentials (cookies) for server-side auth flow
      credentials: 'include',
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        // Handle 401 Unauthorized - token might be expired
        if (response.status === 401) {
          // Try to refresh token
          const refreshToken = localStorage.getItem('refreshToken')
          if (refreshToken) {
            const refreshResponse = await this.refreshTokenDirect(refreshToken)
            if (refreshResponse.success && refreshResponse.accessToken) {
              // Update tokens and retry the original request
              localStorage.setItem('accessToken', refreshResponse.accessToken)
              if (refreshResponse.refreshToken) {
                localStorage.setItem('refreshToken', refreshResponse.refreshToken)
              }

              // Retry the original request with new token
              const newConfig = {
                ...config,
                headers: {
                  ...config.headers,
                  'Authorization': `Bearer ${refreshResponse.accessToken}`
                }
              }
              const retryResponse = await fetch(url, newConfig)
              const retryData = await retryResponse.json()
              return retryData
            }
          }

          // If refresh failed, clear tokens
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }

        return {
          success: false,
          message: data.message || 'Request failed',
          errors: data.errors || ['An error occurred'],
        }
      }

      return data
    } catch (error) {
      console.error('API request error:', error)
      return {
        success: false,
        message: 'Network error',
        errors: ['Unable to connect to server'],
      }
    }
  }

  // Auth methods
  async signup(data: SignupRequest): Promise<ApiResponse> {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async signin(data: SigninRequest): Promise<ApiResponse> {
    return this.request('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async googleAuth(data: GoogleAuthRequest): Promise<ApiResponse> {
    return this.request('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async signout(): Promise<ApiResponse> {
    return this.request('/api/auth/signout', {
      method: 'POST',
    })
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse> {
    return this.request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  // Helper method to refresh token without using the main request method
  private async refreshTokenDirect(refreshToken: string): Promise<ApiResponse> {
    const url = `${this.baseURL}/api/auth/refresh`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies here too
        body: JSON.stringify({ refreshToken }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Token refresh error:', error)
      return {
        success: false,
        message: 'Token refresh failed',
        errors: ['Unable to refresh token'],
      }
    }
  }

  async getProfile(): Promise<ApiResponse> {
    return this.request('/api/auth/me', {
      method: 'GET',
    })
  }

  async updateProfile(data: any): Promise<ApiResponse> {
    return this.request('/api/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
}

// Create a singleton instance
export const apiService = new ApiService()
