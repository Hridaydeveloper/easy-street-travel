
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";

interface LocationSearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string, placeId?: string, coordinates?: { lat: number; lng: number }) => void;
  icon: 'pickup' | 'destination';
  className?: string;
}

interface Prediction {
  description: string;
  place_id: string;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
  className = ""
}) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    // Initialize Google Maps services when available
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      // Create a div element for PlacesService (required)
      const div = document.createElement('div');
      placesService.current = new window.google.maps.places.PlacesService(div);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    if (inputValue.length > 2 && autocompleteService.current) {
      const request = {
        input: inputValue,
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'us' } // You can change this or remove for global search
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
    if (placesService.current) {
      const request = {
        placeId: prediction.place_id,
        fields: ['geometry', 'formatted_address']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const coordinates = {
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0
          };
          onChange(prediction.description, prediction.place_id, coordinates);
          setShowPredictions(false);
        }
      });
    } else {
      onChange(prediction.description, prediction.place_id);
      setShowPredictions(false);
    }
  };

  const IconComponent = icon === 'pickup' ? MapPin : Navigation;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => predictions.length > 0 && setShowPredictions(true)}
          className="pl-10 bg-white/10 border-white/20 placeholder-white text-white focus:border-white"
        />
      </div>

      {showPredictions && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
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
  );
};

export default LocationSearchInput;
