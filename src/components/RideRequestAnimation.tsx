
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface RideRequestAnimationProps {
  type: 'accept' | 'decline';
  onComplete: () => void;
}

const RideRequestAnimation: React.FC<RideRequestAnimationProps> = ({ type, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-full p-8 animate-scale-in ${type === 'accept' ? 'border-4 border-green-500' : 'border-4 border-red-500'}`}>
        {type === 'accept' ? (
          <Check className="h-16 w-16 text-green-500 animate-pulse" />
        ) : (
          <X className="h-16 w-16 text-red-500 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default RideRequestAnimation;
