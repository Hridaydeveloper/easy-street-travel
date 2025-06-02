
import React from 'react';
import { Car } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <Car className="h-12 w-12 text-black" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-white border-t-transparent rounded-2xl animate-spin mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Uber</h2>
        <p className="text-gray-300">Loading your ride...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
