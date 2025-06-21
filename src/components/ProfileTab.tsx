import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const ProfileTab: React.FC = () => {
  const {
    user
  } = useAuth();
  return <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Profile</h1>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-400">{user?.email}</p>
              <p className="text-gray-400">{user?.phone}</p>
            </div>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>;
};
export default ProfileTab;