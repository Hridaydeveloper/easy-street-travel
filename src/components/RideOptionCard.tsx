
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Star, Zap } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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

interface RideOptionCardProps {
  option: RideOption;
  price: number | undefined;
  onBook: (optionId: string) => void;
}

const RideOptionCard: React.FC<RideOptionCardProps> = ({ option, price, onBook }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookNow = () => {
    const { pickup, destination } = location.state || {};
    const distance = pickup?.coordinates && destination?.coordinates ? 
      Math.sqrt(
        Math.pow(destination.coordinates.lat - pickup.coordinates.lat, 2) + 
        Math.pow(destination.coordinates.lng - pickup.coordinates.lng, 2)
      ) * 69 : 0; // Rough distance calculation

    navigate('/payment', {
      state: {
        pickup,
        destination,
        rideOption: option,
        price: price || 0,
        distance,
        duration: option.estimatedTime
      }
    });
  };

  return (
    <Card className="bg-white border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:shadow-xl group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="text-black group-hover:text-gray-700 transition-colors">
              {option.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-bold text-black">{option.name}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-medium">{option.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{option.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Users className="h-4 w-4 text-black" />
                  <span>{option.passengerCount} passengers</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span>{option.estimatedTime}</span>
                </div>
              </div>

              <div className="space-y-1">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-black mb-2">
              {price ? (
                <span className="text-black">
                  ${price}
                </span>
              ) : (
                <span className="text-gray-400">Calculating...</span>
              )}
            </div>
            <Button
              onClick={handleBookNow}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!price}
            >
              {!price ? (
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
  );
};

export default RideOptionCard;
