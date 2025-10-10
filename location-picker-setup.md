# Location Picker Setup

## Google Maps API Configuration

To enable the location picker functionality, you need to set up Google Maps API:

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - **Places API**
   - **Maps JavaScript API**
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Environment Variables
Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Features
- **Default Locations**: Shows 7 popular Accra locations initially
- **Search Functionality**: Real-time search with Google Places API
- **Ghana Restriction**: Only shows locations in Ghana
- **Debounced Search**: Optimized API calls with 300ms delay
- **Error Handling**: Graceful fallback when API fails

### 4. Usage
```tsx
<LocationPicker 
  selectedLocation={selectedLocation}
  onLocationSelect={setSelectedLocation}
/>
```

### 5. API Costs
- **Places API**: $0.017 per request (first 1,000 free per month)
- **Autocomplete**: $0.00283 per request (first 1,000 free per month)

The location picker is designed to be cost-effective with debounced search and default locations.
