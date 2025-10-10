"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, X } from "lucide-react"

interface LocationPickerProps {
  selectedLocation: string
  onLocationSelect: (location: string) => void
}

interface PlaceResult {
  place_id: string
  formatted_address: string
  name: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export default function LocationPicker({ selectedLocation, onLocationSelect }: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const searchTimeoutRef = useRef<NodeJS.Timeout>()
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService>()
  const placesServiceRef = useRef<google.maps.places.PlacesService>()

  // Initialize Google Places API
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService()
      const mapDiv = document.createElement('div')
      placesServiceRef.current = new google.maps.places.PlacesService(mapDiv)
    }
  }, [])

  // Default Accra locations
  const defaultAccraLocations = [
    "Accra Central, Accra, Ghana",
    "East Legon, Accra, Ghana", 
    "Osu, Accra, Ghana",
    "Labone, Accra, Ghana",
    "Cantonments, Accra, Ghana",
    "Airport Residential, Accra, Ghana",
    "Tema, Greater Accra, Ghana"
  ]

  // Load default locations on mount
  useEffect(() => {
    if (!searchQuery && searchResults.length === 0) {
      setSearchResults(defaultAccraLocations.map((location, index) => ({
        place_id: `default_${index}`,
        formatted_address: location,
        name: location.split(',')[0],
        geometry: {
          location: {
            lat: 5.6037,
            lng: -0.1870
          }
        }
      })))
    }
  }, [searchQuery, searchResults.length])

  // Handle search with debouncing
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setError("")

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!query.trim()) {
      // Show default locations when search is empty
      setSearchResults(defaultAccraLocations.map((location, index) => ({
        place_id: `default_${index}`,
        formatted_address: location,
        name: location.split(',')[0],
        geometry: {
          location: {
            lat: 5.6037,
            lng: -0.1870
          }
        }
      })))
      return
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(query)
    }, 300)
  }

  const performSearch = async (query: string) => {
    if (!autocompleteServiceRef.current) {
      setError("Google Places API not loaded")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const request = {
        input: query,
        componentRestrictions: { country: 'gh' }, // Restrict to Ghana
        types: ['establishment', 'geocode']
      }

      autocompleteServiceRef.current.getPlacePredictions(request, (predictions, status) => {
        setIsLoading(false)
        
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          // Get detailed place information
          const detailedResults: PlaceResult[] = []
          let processedCount = 0

          predictions.slice(0, 7).forEach((prediction) => {
            if (placesServiceRef.current) {
              placesServiceRef.current.getDetails(
                {
                  placeId: prediction.place_id,
                  fields: ['place_id', 'formatted_address', 'name', 'geometry']
                },
                (place, placeStatus) => {
                  processedCount++
                  
                  if (placeStatus === google.maps.places.PlacesServiceStatus.OK && place) {
                    detailedResults.push({
                      place_id: place.place_id || '',
                      formatted_address: place.formatted_address || '',
                      name: place.name || '',
                      geometry: {
                        location: {
                          lat: place.geometry?.location?.lat() || 0,
                          lng: place.geometry?.location?.lng() || 0
                        }
                      }
                    })
                  }

                  // Update results when all requests are processed
                  if (processedCount === Math.min(predictions.length, 7)) {
                    setSearchResults(detailedResults)
                  }
                }
              )
            }
          })
        } else {
          setError("No locations found. Try a different search term.")
          setSearchResults([])
        }
      })
    } catch (err) {
      setIsLoading(false)
      setError("Search failed. Please try again.")
      console.error("Location search error:", err)
    }
  }

  const handleLocationSelect = (location: PlaceResult) => {
    onLocationSelect(location.formatted_address)
    setIsOpen(false)
    setSearchQuery("")
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchQuery("")
    setError("")
  }

  return (
    <>
      {/* Location Button */}
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

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
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

              {/* Search Bar */}
              <div className="p-4 border-b">
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

              {/* Results */}
              <div className="max-h-60 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#D35F0E] mx-auto mb-2"></div>
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((location) => (
                      <button
                        key={location.place_id}
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-[#D35F0E] mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900">{location.name}</p>
                            <p className="text-sm text-gray-600">{location.formatted_address}</p>
                          </div>
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
