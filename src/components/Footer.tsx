import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    // First navigate to home page if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };
  const handleSocialClick = () => {
    window.open('https://www.linkedin.com/in/hriday-das-390a61286/', '_blank');
  };
  const footerSections = [{
    title: "Company",
    links: [{
      name: "About Us",
      action: () => scrollToSection('about')
    }, {
      name: "Our Team",
      action: () => navigate('/our-team')
    }, {
      name: "Careers",
      action: () => navigate('/careers')
    }, {
      name: "Press",
      action: () => navigate('/press')
    }]
  }, {
    title: "Products",
    links: [{
      name: "Ride",
      action: () => navigate('/ride')
    }, {
      name: "Drive",
      action: () => navigate('/drive')
    }, {
      name: "Business",
      action: () => navigate('/business')
    }, {
      name: "Freight",
      action: () => navigate('/freight')
    }]
  }, {
    title: "Global citizenship",
    links: [{
      name: "Safety",
      action: () => navigate('/safety')
    }, {
      name: "Diversity",
      action: () => navigate('/diversity')
    }, {
      name: "Transparency",
      action: () => navigate('/transparency')
    }, {
      name: "Sustainability",
      action: () => navigate('/sustainability')
    }]
  }, {
    title: "Travel",
    links: [{
      name: "Airports",
      action: () => navigate('/airports')
    }, {
      name: "Cities",
      action: () => navigate('/cities')
    }, {
      name: "Estimates",
      action: () => navigate('/estimates')
    }, {
      name: "Gift cards",
      action: () => navigate('/gift-cards')
    }]
  }];
  return <footer className="bg-black text-white">
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
              
              
              
              <div onClick={handleSocialClick} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => <li key={linkIndex}>
                    <button onClick={link.action} className="text-gray-300 hover:text-white transition-colors duration-200 text-left">
                      {link.name}
                    </button>
                  </li>)}
              </ul>
            </div>)}
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
                <p className="text-white">dashriday@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Call us</p>
                <p className="text-white">+91 9615262753</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-gray-300" />
              </div>
              <div>
                <p className="text-gray-300 text-sm">Visit us</p>
                <p className="text-white">Agartala, Tripura</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <button onClick={() => navigate('/privacy')} className="text-gray-300 hover:text-white transition-colors text-sm">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/terms')} className="text-gray-300 hover:text-white transition-colors text-sm">
              Terms of Service
            </button>
            <button onClick={() => navigate('/cookies')} className="text-gray-300 hover:text-white transition-colors text-sm">
              Cookie Policy
            </button>
            <button onClick={() => navigate('/accessibility')} className="text-gray-300 hover:text-white transition-colors text-sm">
              Accessibility
            </button>
          </div>
          <p className="text-gray-400 text-sm">© 2025 Uber Clone Hriday. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;