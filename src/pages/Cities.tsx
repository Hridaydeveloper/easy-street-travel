
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Cities = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cities</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">Drivio is available in over 10,000 cities worldwide.</p>
              <p className="text-gray-600 mb-6">
                From major metropolitan areas to smaller cities and towns, Drivio provides 
                transportation solutions that help people move around their communities.
              </p>
              <p className="text-gray-600">
                Find out if Drivio is available in your city and discover the ride options we offer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cities;
