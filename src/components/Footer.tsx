
import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", action: () => navigate('/about') },
        { name: "Our Team", action: () => navigate('/about') },
        { name: "Careers", action: () => navigate('/about') },
        { name: "Press", action: () => navigate('/about') }
      ]
    },
    {
      title: "Products",
      links: [
        { name: "Ride", action: () => navigate('/') },
        { name: "Drive", action: () => navigate('/driver-portal') },
        { name: "Business", action: () => navigate('/') },
        { name: "Freight", action: () => navigate('/') }
      ]
    },
    {
      title: "Global citizenship",
      links: [
        { name: "Safety", action: () => navigate('/') },
        { name: "Diversity", action: () => navigate('/') },
        { name: "Transparency", action: () => navigate('/') },
        { name: "Sustainability", action: () => navigate('/') }
      ]
    },
    {
      title: "Travel",
      links: [
        { name: "Airports", action: () => navigate('/') },
        { name: "Cities", action: () => navigate('/') },
        { name: "Estimates", action: () => navigate('/') },
        { name: "Gift cards", action: () => navigate('/') }
      ]
    }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Car className="h-6 w-6 text-black" />
              </div>
              <span className="text-2xl font-bold">Uber</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Move the way you want. Uber is evolving the way the world moves. By seamlessly connecting riders to drivers through our apps, we make cities more accessible, opening up more possibilities for riders and more business for drivers.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button 
                      onClick={link.action}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Email us</p>
                <p className="text-white">support@uber.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Call us</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Visit us</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <button className="text-gray-300 hover:text-white transition-colors text-sm">
              Privacy Policy
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm">
              Terms of Service
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm">
              Cookie Policy
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm">
              Accessibility
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Uber Technologies Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
