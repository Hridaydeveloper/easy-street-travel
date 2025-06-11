
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";

interface SelectedLocation {
  address: string;
  placeId: string;
  coordinates: { lat: number; lng: number };
}

interface Prediction {
  description: string;
  place_id: string;
}

const MapSearch = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [currentMarker, setCurrentMarker] = useState<google.maps.Marker | null>(null);
  
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  // New Delhi coordinates
  const newDelhiCenter = { lat: 28.6139, lng: 77.2090 };

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    // Initialize Google Maps services when available
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      if (map) {
        const div = document.createElement('div');
        placesService.current = new window.google.maps.places.PlacesService(div);
      }
    }
  }, [map]);

  const initializeMap = () => {
    if (!window.google || !mapRef.current) {
      console.log('Google Maps not loaded yet');
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: newDelhiCenter,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [{"weight": "2.00"}]
        },
        {
          "featureType": "all",
          "elementType": "geometry.stroke",
          "stylers": [{"color": "#9c9c9c"}]
        },
        {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [{"visibility": "on"}]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true
    });

    setMap(mapInstance);

    // Add initial marker for New Delhi
    const initialMarker = new window.google.maps.Marker({
      position: newDelhiCenter,
      map: mapInstance,
      title: 'New Delhi, India',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="15" fill="#EF4444"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40)
      }
    });

    setCurrentMarker(initialMarker);
    setSelectedLocation({
      address: 'New Delhi, India',
      placeId: 'ChIJL_P_CXMEDTkRw0ZdG-0GVvw',
      coordinates: newDelhiCenter
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 2 && autocompleteService.current) {
      const request = {
        input: value,
        types: ['geocode', 'establishment']
        // No country restriction for worldwide search
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setPredictions(predictions);
          setShowPredictions(true);
        } else {
          setPredictions([]);
          setShowPredictions(false);
        }
      });
    } else {
      setPredictions([]);
      setShowPredictions(false);
    }
  };

  const handlePredictionClick = (prediction: Prediction) => {
    if (placesService.current && map) {
      const request = {
        placeId: prediction.place_id,
        fields: ['geometry', 'formatted_address', 'name']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry) {
          const coordinates = {
            lat: place.geometry.location?.lat() || 0,
            lng: place.geometry.location?.lng() || 0
          };

          // Remove previous marker
          if (currentMarker) {
            currentMarker.setMap(null);
          }

          // Add new marker
          const newMarker = new window.google.maps.Marker({
            position: coordinates,
            map: map,
            title: place.formatted_address || place.name,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="15" fill="#10B981"/>
                  <circle cx="20" cy="20" r="8" fill="white"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(40, 40)
            }
          });

          setCurrentMarker(newMarker);

          // Center map on new location
          map.setCenter(coordinates);
          map.setZoom(15);

          // Update selected location
          setSelectedLocation({
            address: place.formatted_address || prediction.description,
            placeId: prediction.place_id,
            coordinates
          });

          setSearchValue(place.formatted_address || prediction.description);
          setShowPredictions(false);
        }
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore Locations Worldwide</h2>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for any location worldwide..."
                value={searchValue}
                onChange={handleSearchChange}
                onFocus={() => predictions.length > 0 && setShowPredictions(true)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            {/* Autocomplete Predictions */}
            {showPredictions && predictions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto mt-1">
                {predictions.map((prediction) => (
                  <div
                    key={prediction.place_id}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handlePredictionClick(prediction)}
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-800 text-sm">{prediction.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Location Info */}
          {selectedLocation && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Selected Location:</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{selectedLocation.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Coordinates: {selectedLocation.coordinates.lat.toFixed(6)}, {selectedLocation.coordinates.lng.toFixed(6)}
              </p>
            </div>
          )}

          {/* Map Container */}
          <div className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden border border-gray-300">
            <div ref={mapRef} className="w-full h-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapSearch;
