
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Settings, MapPin, Car } from "lucide-react";

const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Account Settings</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                  <User className="h-5 w-5 mr-3" />
                  Edit Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                  <Settings className="h-5 w-5 mr-3" />
                  Privacy Settings
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Preferences</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                  <MapPin className="h-5 w-5 mr-3" />
                  Saved Places
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700">
                  <Car className="h-5 w-5 mr-3" />
                  Ride Preferences
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
