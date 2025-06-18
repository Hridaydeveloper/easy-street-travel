
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const SafetyFeatures: React.FC = () => {
  const features = [
    "Real-time tracking",
    "24/7 support",
    "Insurance covered",
    "Driver background checks"
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-800/20 to-purple-800/20 border-blue-500/30">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          Safety & Security
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyFeatures;
