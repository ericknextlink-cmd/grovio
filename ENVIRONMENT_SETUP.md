# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google Maps API (for location picker)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Backend API Setup

1. **Start the backend server** on `http://localhost:5000`
2. **Ensure all API endpoints** are working according to the API documentation
3. **Test the health endpoint**: `GET http://localhost:5000/api/health`

## Google OAuth Setup

**Note**: Google OAuth is configured on the backend. The frontend only needs to:
1. **Load Google Identity Services** script
2. **Get the Google ID token** from the user
3. **Send the token** to the backend API endpoint

No frontend Google OAuth configuration is needed.

## Google Maps Setup

1. **Go to Google Cloud Console**
2. **Enable the following APIs**:
   - Maps JavaScript API
   - Places API
3. **Create an API key**
4. **Restrict the key** to your domains
5. **Copy the API key** to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## Testing the Integration

1. **Start the development server**: `npm run dev`
2. **Test signup** with a new account
3. **Test login** with existing credentials
4. **Test Google OAuth** (backend handles the OAuth flow)
5. **Test token refresh** by refreshing the page
6. **Test logout** functionality

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure backend has proper CORS configuration
2. **Token refresh fails**: Check if refresh token is being stored correctly
3. **Google OAuth not working**: Verify backend Google OAuth configuration
4. **API calls failing**: Check if backend server is running and accessible

### Debug Mode

Enable debug logging by adding to `.env.local`:
```bash
NEXT_PUBLIC_DEBUG=true
```

This will log API requests and responses to the console.
