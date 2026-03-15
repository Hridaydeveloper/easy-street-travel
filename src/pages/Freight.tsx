
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Freight = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Freight</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">Moving freight with the power of technology.</p>
              <p className="text-gray-600 mb-6">
                Drivio Freight connects shippers and carriers through our innovative platform, 
                making it easier to book, track, and manage freight transportation.
              </p>
              <p className="text-gray-600">
                Whether you're a shipper or carrier, Drivio Freight provides the tools you need to succeed.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Freight;
