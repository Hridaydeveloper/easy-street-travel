
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Ride = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Ride</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">Get a ride in minutes with the tap of a button.</p>
              <p className="text-gray-600 mb-6">
                Whether you're commuting to work, heading out for the night, or need a reliable way 
                to get around town, Drivio connects you with drivers in your area for safe, convenient, 
                and affordable transportation.
              </p>
              <p className="text-gray-600">
                Choose from a variety of ride options including Drivio Go, Drivio XL, Drivio Black, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ride;
