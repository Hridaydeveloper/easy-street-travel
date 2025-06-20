
import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Press = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Press</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg mb-6">
                Stay updated with the latest news and announcements from Uber.
              </p>
              <p className="text-gray-600 mb-6">
                For media inquiries, press releases, and company updates, this is your go-to resource 
                for all things Uber. We're committed to transparency and keeping the public informed 
                about our progress, initiatives, and impact on communities worldwide.
              </p>
              <p className="text-gray-600">
                Contact our press team for interviews, statements, and exclusive access to company 
                executives and thought leaders.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Press;
