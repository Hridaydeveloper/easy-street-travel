
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Clock } from "lucide-react";

interface Ride {
  id: number;
  from: string;
  to: string;
  date: string;
  fare: string;
  status: string;
}

interface RecentRidesProps {
  rides: Ride[];
  showHeader?: boolean;
}

const RecentRides: React.FC<RecentRidesProps> = ({ rides, showHeader = true }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      {showHeader && (
        <CardHeader>
          <CardTitle className="text-white">Recent Rides</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          {rides.map(ride => (
            <div 
              key={ride.id} 
              className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{ride.from} → {ride.to}</p>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {ride.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">{ride.fare}</p>
                <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                  {ride.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRides;
