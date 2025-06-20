
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Sustainability = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Sustainability</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Moving towards a more sustainable future.
              </p>
              <p className="text-gray-600 mb-6">
                We're committed to reducing our environmental impact and helping cities become 
                more sustainable. This includes promoting electric vehicles, optimizing routes 
                to reduce emissions, and partnering with cities to improve urban mobility.
              </p>
              <p className="text-gray-600">
                Our goal is to become a fully electric, zero-emission platform by 2040, and 
                we're investing in the technology and partnerships needed to make this vision a reality.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sustainability;
