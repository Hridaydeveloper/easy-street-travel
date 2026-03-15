
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const GiftCards = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Gift Cards</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">Give the gift of convenient transportation.</p>
              <p className="text-gray-600 mb-6">
                Drivio gift cards make perfect gifts for friends, family, or colleagues. They can 
                be used for rides and other Drivio services.
              </p>
              <p className="text-gray-600">
                Perfect for birthdays, holidays, graduations, or any occasion.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GiftCards;
