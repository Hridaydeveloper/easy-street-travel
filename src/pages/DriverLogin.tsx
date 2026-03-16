
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ALLOWED_DRIVER_EMAIL = 'dashriday856@gmail.com';

const DriverLogin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (email.toLowerCase() !== ALLOWED_DRIVER_EMAIL) {
      setError("You don't have a driver dashboard account. Create one first.");
      return;
    }

    if (name && email) {
      localStorage.setItem('driverProfile', JSON.stringify({
        name,
        email: email.toLowerCase(),
        isLoggedIn: true
      }));
      navigate('/driver-portal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-violet-950 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('/lovable-uploads/dc2b1809-4950-48b0-a818-76730bc701c8.png')`
        }}
      />
      
      <div className="relative w-full max-w-md">
        <Card className="bg-gray-900/95 backdrop-blur-md border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full flex items-center justify-center">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Drivio Driver Login</CardTitle>
            <p className="text-gray-400">Enter your details to access the driver portal</p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
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
