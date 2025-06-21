
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Car, Star } from "lucide-react";

const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-white border-gray-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Rides</p>
              <p className="text-2xl font-bold text-black">24</p>
            </div>
            <Car className="h-8 w-8 text-black" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-gray-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <div className="flex items-center space-x-1">
                <p className="text-2xl font-bold text-black">4.8</p>
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
            </div>
            <Star className="h-8 w-8 text-gray-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
