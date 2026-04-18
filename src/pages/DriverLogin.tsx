import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ALLOWED_DRIVER_EMAIL = 'dashriday856@gmail.com';
const DRIVER_NAME = 'Hriday Das';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email.trim().toLowerCase() !== ALLOWED_DRIVER_EMAIL) {
      setError("You don't have a driver dashboard account. Create one first.");
      return;
    }

    localStorage.setItem('driverProfile', JSON.stringify({
      name: DRIVER_NAME,
      email: email.toLowerCase(),
      isLoggedIn: true,
    }));
    navigate('/driver-portal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-violet-950 flex items-center justify-center p-4 overflow-x-hidden">
      <div className="relative w-full max-w-md">
        <Card className="bg-gray-900/95 backdrop-blur-md border-gray-700">
          <CardHeader className="text-center px-4 sm:px-6">
            <div className="flex justify-center mb-4">
              <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full flex items-center justify-center">
                <Car className="h-7 sm:h-8 w-7 sm:w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">Drivio Driver Login</CardTitle>
            <p className="text-gray-400 text-sm">Enter your driver email to continue</p>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm break-words">{error}</p>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Driver Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your driver email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Login to Driver Portal
              </Button>
            </form>
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full justify-center text-white border-white hover:bg-white hover:text-black transition-all duration-300 bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverLogin;
