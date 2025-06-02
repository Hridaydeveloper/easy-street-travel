
import React from 'react';
import { Button } from "@/components/ui/button";
import { Car, Menu, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Uber</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              HOME
            </button>
            <button 
              onClick={() => navigate('/services')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              SERVICES
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              ABOUT
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              CONTACT
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => navigate('/auth')}
              className="text-gray-600 hover:text-gray-800"
            >
              <User className="h-4 w-4 mr-2" />
              Log in
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/driver-portal')}
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300"
            >
              <Shield className="h-4 w-4 mr-2" />
              Driver
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
