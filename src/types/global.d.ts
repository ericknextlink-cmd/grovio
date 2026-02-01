/**
 * Global type augmentations for window.google.
 * Merges Google Identity Services (GSI) and Google Maps types so both can be used.
 */

// Google Identity Services (GSI) - sign-in / One Tap
interface GoogleAccountsId {
  initialize: (config: unknown) => void
  renderButton: (parent: HTMLElement, options: unknown) => void
  prompt: (callback?: (notification: unknown) => void) => void
}

// Google Maps API types (Places, etc.) - global namespace for type references (google.maps.places.X)
declare namespace google {
  namespace maps {
    namespace places {
      class AutocompleteService {
        getPlacePredictions(request: unknown, callback: (predictions: any, status: any) => void): void
      }
      class PlacesService {
        constructor(attrContainer: HTMLDivElement)
        getDetails(request: unknown, callback: (place: any, placeStatus: any) => void): void
      }
      enum PlacesServiceStatus {
        OK = 'OK'
      }
    }
  }
}

// Merged type so window.google has both GSI (accounts) and Maps (maps) – do not use typeof google for Window
interface WindowGoogle {
  accounts?: {
    id: GoogleAccountsId
  }
  maps?: typeof google.maps
}

declare global {
  interface Window {
    google?: WindowGoogle
  }
}
