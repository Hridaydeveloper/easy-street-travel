
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Drive = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Drive</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Drive when you want, make what you need.
              </p>
              <p className="text-gray-600 mb-6">
                Join millions of drivers who choose Uber for the flexibility to earn on their own 
                schedule. Whether you're looking for a full-time opportunity or just want to make 
                some extra money on the side, driving with Uber gives you the freedom to work 
                when and where you want.
              </p>
              <p className="text-gray-600">
                Get started today - all you need is a car, a clean driving record, and a smartphone. 
                We'll handle the rest.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Drive;
