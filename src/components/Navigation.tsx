import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  return <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => handleNavigation('/')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              
              <span className="text-xl font-bold text-black">Uber</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('/services')} className="text-gray-700 hover:text-black transition-colors">
              Services
            </button>
            <button onClick={() => handleNavigation('/about')} className="text-gray-700 hover:text-black transition-colors">
              About
            </button>
            <button onClick={() => handleNavigation('/contact')} className="text-gray-700 hover:text-black transition-colors">
              Contact
            </button>
            <button onClick={() => handleNavigation('/map-explorer')} className="text-gray-700 hover:text-black transition-colors">
              Map Explorer
            </button>
            <button onClick={() => handleNavigation('/careers')} className="text-gray-700 hover:text-black transition-colors">
              Careers
            </button>
            <button onClick={() => handleNavigation('/business')} className="text-gray-700 hover:text-black transition-colors">
              Business
            </button>
            
            <Button onClick={() => handleNavigation('/driver-portal')} className="bg-white text-black border border-gray-300 hover:bg-gray-100">
              Driver
            </Button>
            
            {/* User Profile Component */}
            <UserProfile />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-black transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => handleNavigation('/services')} className="block px-3 py-2 text-gray-700 hover:text-black transition-colors w-full text-left">
                Services
              </button>
              <button onClick={() => handleNavigation('/about')} className="block px-3 py-2 text-gray-700 hover:text-black transition-colors w-full text-left">
                About
              </button>
              <button onClick={() => handleNavigation('/contact')} className="block px-3 py-2 text-gray-700 hover:text-black transition-colors w-full text-left">
                Contact
              </button>
              <button onClick={() => handleNavigation('/map-explorer')} className="block px-3 py-2 text-gray-700 hover:text-black transition-colors w-full text-left">
                Map Explorer
              </button>
              <button onClick={() => handleNavigation('/careers')} className="block px-3 py-2 text-gray-700 hover:text-black transition-colors w-full text-left">
                Careers
              </button>
              <button onClick={() => handleNavigation('/business')} className="block px-3 py-2 text-gray-700 hover:text-black transition-colors w-full text-left">
                Business
              </button>
              <div className="px-3 py-2 space-y-2">
                <Button onClick={() => handleNavigation('/driver-portal')} className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100">
                  Driver
                </Button>
                <div className="w-full">
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;