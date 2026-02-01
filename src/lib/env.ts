// Environment configuration
const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const useProxy = process.env.NEXT_PUBLIC_USE_API_PROXY === 'true'

export const env = {
  /** Backend base URL. When using proxy, this is the path prefix for the Next.js API proxy. */
  API_URL: useProxy ? '/api/backend' : backendUrl,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY!,
  /** Google OAuth client ID for Sign-In (required for "Sign in with Google") */
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const
