
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Settings, MapPin, Car } from "lucide-react";

const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black">Settings</h1>
      <Card className="bg-white border-gray-300">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">Account Settings</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100">
                  <User className="h-5 w-5 mr-3" />
                  Edit Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100">
                  <Settings className="h-5 w-5 mr-3" />
                  Privacy Settings
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">Preferences</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100">
                  <MapPin className="h-5 w-5 mr-3" />
                  Saved Places
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100">
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
