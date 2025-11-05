/**
 * useAIBackend Hook
 * 
 * Provides easy access to all backend AI endpoints with automatic fallback
 * to frontend AI when backend is unavailable.
 */

import { useState } from 'react'
import { toast } from 'sonner'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

interface ChatMessage {
  message: string
  threadId?: string
  role?: string
  familySize?: number
  budget?: number
}

interface ChatResponse {
  message: string
  threadId?: string
  products?: any[]
}

interface RecommendationRequest {
  budget: number
  familySize?: number
  role?: string
  preferences?: string[]
  categories?: string[]
}

interface BudgetAnalysisRequest {
  budget: number
  familySize: number
  duration?: 'day' | 'week' | 'month'
}

interface MealSuggestionRequest {
  ingredients: string[]
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  dietaryRestrictions?: string[]
  familySize?: number
}

export function useAIBackend() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  /**
   * Send a chat message to the AI assistant
   * Supports thread continuity
   */
  const sendChatMessage = async (params: ChatMessage): Promise<ChatResponse | null> => {
    setIsLoading(true)
    setError(null)

    try {
      // Try backend first
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return {
          message: data.data.message,
          threadId: data.data.threadId,
          products: data.data.products
        }
      }

      throw new Error(data.message || 'Failed to get response')
    } catch (err) {
      console.error('Backend AI error:', err)

      // Fallback to frontend AI
      try {
        const fallbackResponse = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: params.message })
        })

        const fallbackData = await fallbackResponse.json()
        setIsLoading(false)

        return {
          message: fallbackData.message || fallbackData.error || 'Failed to get response',
          threadId: undefined,
          products: fallbackData.cartData?.items
        }
      } catch (fallbackErr) {
        console.error('Fallback AI error:', fallbackErr)
        setError('AI service unavailable')
        setIsLoading(false)
        return null
      }
    }
  }

  /**
   * Get product recommendations based on budget and preferences
   */
  const getRecommendations = async (params: RecommendationRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/ai/recommendations`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return data.data
      }

      throw new Error(data.message || 'Failed to get recommendations')
    } catch (err) {
      console.error('Recommendations error:', err)
      setError('Failed to get recommendations')
      setIsLoading(false)
      return null
    }
  }

  /**
   * Search for products using AI-powered semantic search
   */
  const searchProducts = async (query: string, limit = 10) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_URL}/api/ai/search?query=${encodeURIComponent(query)}&limit=${limit}`,
        { headers: getAuthHeaders() }
      )

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return data.data
      }

      throw new Error(data.message || 'Search failed')
    } catch (err) {
      console.error('Search error:', err)
      setError('Search failed')
      setIsLoading(false)
      return []
    }
  }

  /**
   * Get budget analysis and allocation recommendations
   */
  const analyzeBudget = async (params: BudgetAnalysisRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/ai/budget-analysis`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return data.data
      }

      throw new Error(data.message || 'Analysis failed')
    } catch (err) {
      console.error('Budget analysis error:', err)
      setError('Failed to analyze budget')
      setIsLoading(false)
      return null
    }
  }

  /**
   * Get meal suggestions based on available ingredients
   */
  const getMealSuggestions = async (params: MealSuggestionRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/ai/meal-suggestions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return data.data
      }

      throw new Error(data.message || 'Failed to get meal suggestions')
    } catch (err) {
      console.error('Meal suggestions error:', err)
      setError('Failed to get meal suggestions')
      setIsLoading(false)
      return []
    }
  }

  /**
   * Get all conversation threads for the current user
   */
  const getThreads = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/ai/threads`, {
        headers: getAuthHeaders()
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return data.data
      }

      throw new Error(data.message || 'Failed to load threads')
    } catch (err) {
      console.error('Load threads error:', err)
      setError('Failed to load conversations')
      setIsLoading(false)
      return []
    }
  }

  /**
   * Get a specific conversation thread with message history
   */
  const getThread = async (threadId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/ai/threads/${threadId}`, {
        headers: getAuthHeaders()
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        return data.data
      }

      throw new Error(data.message || 'Thread not found')
    } catch (err) {
      console.error('Load thread error:', err)
      setError('Failed to load conversation')
      setIsLoading(false)
      return null
    }
  }

  /**
   * Delete a conversation thread
   */
  const deleteThread = async (threadId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/ai/threads/${threadId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })

      const data = await response.json()

      if (data.success) {
        setIsLoading(false)
        toast.success('Conversation deleted')
        return true
      }

      throw new Error(data.message || 'Failed to delete')
    } catch (err) {
      console.error('Delete thread error:', err)
      setError('Failed to delete conversation')
      setIsLoading(false)
      toast.error('Failed to delete conversation')
      return false
    }
  }

  return {
    isLoading,
    error,
    sendChatMessage,
    getRecommendations,
    searchProducts,
    analyzeBudget,
    getMealSuggestions,
    getThreads,
    getThread,
    deleteThread
  }
}

