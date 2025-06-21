
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
    <Card className="bg-white border-gray-300">
      {showHeader && (
        <CardHeader>
          <CardTitle className="text-black">Recent Rides</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          {rides.map(ride => (
            <div 
              key={ride.id} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-black">{ride.from} → {ride.to}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {ride.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-black">{ride.fare}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
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
