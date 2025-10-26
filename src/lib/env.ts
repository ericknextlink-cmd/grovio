// Environment configuration
export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
} as const
