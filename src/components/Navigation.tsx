import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Car, Menu, User, Shield, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };
  const navItems = [{
    label: "HOME",
    action: () => navigate('/')
  }, {
    label: "SERVICES",
    action: () => scrollToSection('services')
  }, {
    label: "ABOUT",
    action: () => scrollToSection('about')
  }, {
    label: "CONTACT",
    action: () => scrollToSection('contact')
  }];
  return <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 z-50 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
              <Car className="h-6 w-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-white">Uber</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => <button key={index} onClick={item.action} className="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </button>)}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/auth')} className="text-gray-300 hover:text-white hover:bg-gray-800">
              <User className="h-4 w-4 mr-2" />
              Log in
            </Button>
            <Button onClick={() => navigate('/auth')} className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
              Sign Up
            </Button>
            <Button variant="outline" onClick={() => navigate('/driver-portal')} className="border-white hover:bg-white transition-all duration-300 text-zinc-950">
              <Shield className="h-4 w-4 mr-2" />
              Driver
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:bg-gray-800">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => <button key={index} onClick={item.action} className="block w-full text-left text-gray-300 hover:text-white font-medium py-2">
                  {item.label}
                </button>)}
              <div className="border-t border-gray-800 pt-4 space-y-3">
                <Button variant="ghost" onClick={() => navigate('/auth')} className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                  <User className="h-4 w-4 mr-2" />
                  Log in
                </Button>
                <Button onClick={() => navigate('/auth')} className="w-full bg-white text-black hover:bg-gray-200">
                  Sign Up
                </Button>
                <Button variant="outline" onClick={() => navigate('/driver-portal')} className="w-full border-white text-white hover:bg-white hover:text-black">
                  <Shield className="h-4 w-4 mr-2" />
                  Driver Portal
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;