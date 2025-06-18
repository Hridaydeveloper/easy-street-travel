
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Star, Zap } from "lucide-react";

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
  return (
    <Card className="bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 group">
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
              {price ? (
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  ${price}
                </span>
              ) : (
                <span className="text-gray-400">Calculating...</span>
              )}
            </div>
            <Button
              onClick={() => onBook(option.id)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
