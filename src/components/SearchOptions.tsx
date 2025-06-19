
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plane, Building2 } from "lucide-react";

const SearchOptions: React.FC = () => {
  const searchOptions = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Search Rides",
      description: "Find rides to any location",
      action: () => console.log("Search rides clicked")
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Search Airports",
      description: "Airport transfers and rides",
      action: () => console.log("Search airports clicked")
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Search Cities",
      description: "Explore different cities",
      action: () => console.log("Search cities clicked")
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {searchOptions.map((option, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3 text-orange-500">
              {option.icon}
            </div>
            <h3 className="text-white font-semibold mb-2">{option.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{option.description}</p>
            <Button 
              onClick={option.action}
              variant="outline" 
              className="w-full border-gray-600 text-white hover:bg-gray-600"
            >
              Explore
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchOptions;
