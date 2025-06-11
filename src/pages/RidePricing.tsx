
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Car, Users, Crown, MapPin, Clock, DollarSign } from "lucide-react";
import Navigation from "@/components/Navigation";

interface LocationData {
  address: string;
  placeId?: string;
  coordinates?: { lat: number; lng: number };
}

interface RideOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  basePrice: number;
  pricePerMile: number;
  pricePerMinute: number;
  estimatedTime: string;
}

const RidePricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<string>('');
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  const { pickup, destination, rideType } = location.state || {};

  const rideOptions: RideOption[] = [
    {
      id: 'uberx',
      name: 'UberX',
      description: 'Affordable, everyday rides',
      icon: <Car className="h-8 w-8" />,
      basePrice: 2.50,
      pricePerMile: 1.75,
      pricePerMinute: 0.30,
      estimatedTime: '2-5 min'
    },
    {
      id: 'uberxl',
      name: 'UberXL',
      description: 'Larger rides for up to 6',
      icon: <Users className="h-8 w-8" />,
      basePrice: 3.50,
      pricePerMile: 2.25,
      pricePerMinute: 0.45,
      estimatedTime: '3-8 min'
    },
    {
      id: 'uberblack',
      name: 'Uber Black',
      description: 'Premium rides in luxury cars',
      icon: <Crown className="h-8 w-8" />,
      basePrice: 7.00,
      pricePerMile: 3.75,
      pricePerMinute: 0.65,
      estimatedTime: '5-12 min'
    }
  ];

  useEffect(() => {
    if (!pickup || !destination) {
      navigate('/');
      return;
    }

    initializeMap();
  }, [pickup, destination]);

  const initializeMap = () => {
    if (!window.google || !mapRef.current || !pickup.coordinates || !destination.coordinates) {
      console.log('Google Maps not loaded or coordinates missing');
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: pickup.coordinates,
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
        }
      ]
    });

    setMap(mapInstance);

    // Add markers
    new window.google.maps.Marker({
      position: pickup.coordinates,
      map: mapInstance,
      title: 'Pickup Location',
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

    new window.google.maps.Marker({
      position: destination.coordinates,
      map: mapInstance,
      title: 'Destination',
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

    // Calculate route
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#000000',
        strokeWeight: 4
      }
    });

    directionsRenderer.setMap(mapInstance);

    directionsService.route({
      origin: pickup.coordinates,
      destination: destination.coordinates,
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === 'OK' && result) {
        directionsRenderer.setDirections(result);
        
        const route = result.routes[0];
        const leg = route.legs[0];
        
        setDistance(leg.distance?.value ? leg.distance.value / 1609.34 : 0); // Convert meters to miles
        setDuration(leg.duration?.text || '');
        
        // Calculate prices for each ride option
        const calculatedPrices: { [key: string]: number } = {};
        const distanceInMiles = leg.distance?.value ? leg.distance.value / 1609.34 : 0;
        const durationInMinutes = leg.duration?.value ? leg.duration.value / 60 : 0;
        
        rideOptions.forEach(option => {
          const price = option.basePrice + 
                       (distanceInMiles * option.pricePerMile) + 
                       (durationInMinutes * option.pricePerMinute);
          calculatedPrices[option.id] = Math.round(price * 100) / 100;
        });
        
        setPrices(calculatedPrices);
      }
    });
  };

  const handleBookRide = (optionId: string) => {
    console.log('Booking ride:', optionId, prices[optionId]);
    // Here you would typically integrate with your booking system
    alert(`Ride booked! Estimated price: $${prices[optionId]}`);
  };

  if (!pickup || !destination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="container mx-auto">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 truncate max-w-xs">{pickup.address}</span>
                  </div>
                  <span className="text-gray-400">→</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600 truncate max-w-xs">{destination.address}</span>
                  </div>
                </div>
                {distance > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {distance.toFixed(1)} miles • {duration}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="order-2 lg:order-1">
              <Card className="h-96 lg:h-full">
                <CardContent className="p-0 h-full">
                  <div ref={mapRef} className="w-full h-full rounded-lg" />
                </CardContent>
              </Card>
            </div>

            {/* Ride Options */}
            <div className="order-1 lg:order-2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Choose a ride</h2>
              
              {rideOptions.map((option) => (
                <Card key={option.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-gray-700">
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{option.name}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{option.estimatedTime}</span>
                            </div>
                            {distance > 0 && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{distance.toFixed(1)} miles</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {prices[option.id] ? `$${prices[option.id]}` : 'Calculating...'}
                        </div>
                        <Button
                          onClick={() => handleBookRide(option.id)}
                          className="mt-2 bg-black text-white hover:bg-gray-800"
                          disabled={!prices[option.id]}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePricing;
