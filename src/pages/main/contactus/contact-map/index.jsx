import React, { useEffect, useRef } from 'react'

const ContactMap = () => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current) return

      // Location coordinates (you can update these with actual coordinates)
      const location = {
        lat: 14.6760, // Manila coordinates (approximate)
        lng: 121.0437
      }

      // Create map with Google Maps default styling
      const map = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 12,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true
      })

      // Create marker
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: 'Rank One Review Center',
        animation: window.google.maps.Animation.DROP
      })

      // Store references
      mapInstanceRef.current = map
      markerRef.current = marker
    }

    loadGoogleMapsScript()

    // Cleanup
    return () => {
      if (markerRef.current) {
        window.google.maps.event.clearInstanceListeners(markerRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            FIND US
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our <span className="text-blue-600">Location</span>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Visit us at our center in Quezon City. We're conveniently located and easy to find.
          </p>
        </div>

        {/* Map Container with Google Maps Style */}
        <div className="relative">
          <div 
            ref={mapRef}
            className="w-full h-[600px] rounded-lg shadow-lg border border-gray-300"
            style={{ minHeight: '600px' }}
          >
            {/* Loading placeholder */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading Google Maps...</p>
              </div>
            </div>
          </div>

          {/* Google Maps Style Information Card Overlay */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm">
            <div className="p-4">
              {/* Business Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Rank One Review Center
              </h3>
              
              {/* Address */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                MDY Commercial Centre, bldg. 1 unit 1:G#47 Dahlia Avenue, Cor. Fairlane st. Brgy. Fairview, Quezon City 1118, Philippines
              </p>
              
              {/* Directions Link */}
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <a 
                  href="https://maps.google.com/maps?q=Rank+One+Review+Center+Quezon+City" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Directions
                </a>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-2">
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                </div>
                <span className="text-sm text-gray-600">4.5</span>
                <span className="text-sm text-gray-500 ml-1">(190,093 reviews)</span>
              </div>
              
              {/* View Larger Map Link */}
              <a 
                href="https://maps.google.com/maps?q=Rank+One+Review+Center+Quezon+City" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View larger map
              </a>
            </div>
          </div>

          {/* Google Maps Style Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200">
            {/* Zoom Controls */}
            <div className="p-1">
              <button 
                onClick={() => mapInstanceRef.current?.setZoom((mapInstanceRef.current.getZoom() || 12) + 1)}
                className="w-8 h-8 bg-white border border-gray-300 rounded-t flex items-center justify-center hover:bg-gray-50 text-gray-600"
              >
                +
              </button>
              <button 
                onClick={() => mapInstanceRef.current?.setZoom((mapInstanceRef.current.getZoom() || 12) - 1)}
                className="w-8 h-8 bg-white border border-gray-300 border-t-0 rounded-b flex items-center justify-center hover:bg-gray-50 text-gray-600"
              >
                −
              </button>
            </div>
          </div>

          {/* Satellite View Toggle (Bottom Left) */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <button className="w-10 h-10 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Google Maps Footer (Bottom Right) */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2">
            <div className="text-xs text-gray-500">
              <div>Keyboard shortcuts</div>
              <div>Map data ©2025 Google</div>
              <div className="flex space-x-2">
                <a href="#" className="text-blue-600 hover:underline">Terms</a>
                <a href="#" className="text-blue-600 hover:underline">Report a map error</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactMap