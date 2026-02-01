"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, X } from "lucide-react"

interface LocationPickerProps {
  selectedLocation: string
  onLocationSelect: (location: string) => void
}

/** Prediction from server autocomplete (no client-side Maps) */
interface AutocompletePrediction {
  place_id: string
  description: string
}

/** Display item: either default (no place_id) or autocomplete prediction; on select we fetch details */
type ListItem = { place_id: string; description: string; isDefault?: boolean }

export default function LocationPicker({ selectedLocation, onLocationSelect }: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ListItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const defaultAccraLocations = useMemo(
    () => [
      "Accra Central, Accra, Ghana",
      "East Legon, Accra, Ghana",
      "Osu, Accra, Ghana",
      "Labone, Accra, Ghana",
      "Cantonments, Accra, Ghana",
      "Airport Residential, Accra, Ghana",
      "Tema, Greater Accra, Ghana",
    ],
    []
  )

  const defaultResults: ListItem[] = useMemo(
    () =>
      defaultAccraLocations.map((location, index) => ({
        place_id: `default_${index}`,
        description: location,
        isDefault: true,
      })),
    [defaultAccraLocations]
  )

  useEffect(() => {
    if (isOpen && !searchQuery.trim() && searchResults.length === 0) {
      setSearchResults(defaultResults)
    }
  }, [isOpen, searchQuery, searchResults.length, defaultResults])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setError("")

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!query.trim()) {
      setSearchResults(defaultResults)
      return
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query)
    }, 300)
  }

  /** Server-side autocomplete only; details fetched on select (efficient) */
  const performSearch = async (query: string) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(query)}`
      )
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Search failed")
        setSearchResults([])
        return
      }

      const predictions: AutocompletePrediction[] = data.predictions || []
      setSearchResults(
        predictions.map((p) => ({ place_id: p.place_id, description: p.description }))
      )
    } catch (err) {
      setError("Search failed. Please try again.")
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  /** On select: default item uses description as address; Google place fetches details once */
  const handleLocationSelect = async (item: ListItem) => {
    if (item.isDefault || item.place_id.startsWith("default_")) {
      onLocationSelect(item.description)
      setIsOpen(false)
      setSearchQuery("")
      return
    }

    setIsLoading(true)
    setError("")
    try {
      const res = await fetch(
        `/api/places/details?place_id=${encodeURIComponent(item.place_id)}`
      )
      const data = await res.json()
      if (!res.ok || !data.formatted_address) {
        setError(data.error || "Could not get address")
        return
      }
      onLocationSelect(data.formatted_address)
      setIsOpen(false)
      setSearchQuery("")
    } catch (err) {
      setError("Could not load address")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchQuery("")
    setError("")
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full justify-between text-left font-normal"
      >
        <span className="truncate">
          {selectedLocation || "Select Location"}
        </span>
        <MapPin className="h-4 w-4 text-[#D35F0E]" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Select Location</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4 border-b-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for locations in Accra, Ghana..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>

              <div className="max-h-60 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D35F0E] mx-auto mb-2" />
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((item) => (
                      <button
                        key={item.place_id}
                        onClick={() => handleLocationSelect(item)}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-[#D35F0E] mt-0.5 shrink-0" />
                          <p className="text-sm text-gray-900">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No locations found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
