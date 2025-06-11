
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Car, Users, Crown, MapPin, Clock, DollarSign, Star, Shield, Zap } from "lucide-react";
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
  features: string[];
  rating: number;
  passengerCount: string;
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
      estimatedTime: '2-5 min',
      features: ['Clean vehicles', 'Professional drivers', 'Door-to-door service'],
      rating: 4.8,
      passengerCount: '1-4'
    },
    {
      id: 'uberxl',
      name: 'UberXL',
      description: 'Larger rides for up to 6',
      icon: <Users className="h-8 w-8" />,
      basePrice: 3.50,
      pricePerMile: 2.25,
      pricePerMinute: 0.45,
      estimatedTime: '3-8 min',
      features: ['Extra space', 'Group travel', 'Luggage friendly'],
      rating: 4.7,
      passengerCount: '1-6'
    },
    {
      id: 'uberblack',
      name: 'Uber Black',
      description: 'Premium rides in luxury cars',
      icon: <Crown className="h-8 w-8" />,
      basePrice: 7.00,
      pricePerMile: 3.75,
      pricePerMinute: 0.65,
      estimatedTime: '5-12 min',
      features: ['Luxury vehicles', 'Professional chauffeurs', 'Premium service'],
      rating: 4.9,
      passengerCount: '1-4'
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
          "elementType": "geometry",
          "stylers": [{"color": "#1a1a1a"}]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{"color": "#ffffff"}]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{"color": "#1a1a1a"}]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"color": "#2563eb"}]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{"color": "#374151"}]
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
        strokeColor: '#3B82F6',
        strokeWeight: 5
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
        
        setDistance(leg.distance?.value ? leg.distance.value / 1609.34 : 0);
        setDuration(leg.duration?.text || '');
        
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
    alert(`Ride booked! Estimated price: $${prices[optionId]}`);
  };

  if (!pickup || !destination) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="pt-16">
        {/* Enhanced Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="container mx-auto">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 truncate max-w-xs">{pickup.address}</span>
                  </div>
                  <span className="text-gray-500">→</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 truncate max-w-xs">{destination.address}</span>
                  </div>
                </div>
                {distance > 0 && (
                  <div className="text-xs text-gray-500 mt-1 flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{distance.toFixed(1)} miles</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{duration}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Map */}
            <div className="order-2 lg:order-1">
              <Card className="h-96 lg:h-full bg-gray-800/50 border-gray-700 overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div ref={mapRef} className="w-full h-full rounded-lg" />
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Ride Options */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  Choose Your Ride
                </h2>
                <p className="text-gray-400">Premium transportation options for every need</p>
              </div>
              
              {rideOptions.map((option) => (
                <Card key={option.id} className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-white">{option.name}</h3>
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm font-medium">{option.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 mb-3">{option.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                              <Users className="h-4 w-4 text-blue-400" />
                              <span>{option.passengerCount} passengers</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                              <Clock className="h-4 w-4 text-green-400" />
                              <span>{option.estimatedTime}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            {option.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-white mb-2">
                          {prices[option.id] ? (
                            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                              ${prices[option.id]}
                            </span>
                          ) : (
                            <span className="text-gray-400">Calculating...</span>
                          )}
                        </div>
                        <Button
                          onClick={() => handleBookRide(option.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!prices[option.id]}
                        >
                          {!prices[option.id] ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <>
                              <Zap className="h-4 w-4 mr-2" />
                              Book Now
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Additional Features */}
              <Card className="bg-gradient-to-r from-blue-800/20 to-purple-800/20 border-blue-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-400" />
                    Safety & Security
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Real-time tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>24/7 support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Insurance covered</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Driver background checks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePricing;
