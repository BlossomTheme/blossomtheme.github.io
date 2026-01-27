import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2400); // Show for 2.4 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      {/* Gradient background - orangish tones matching the site */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f9f7f2] to-[#FF92DF]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Rotating logo */}
        <div className="w-24 h-24 md:w-32 md:h-32 animate-spin">
          <img
            src="./public/images/logo.png"
            alt="Loading"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="font-manga text-2xl md:text-4xl text-[#9200ff] font-black mb-2">
            BLOSSOM
          </h2>
          <p className="text-sm md:text-base text-[#6AB0FF] font-semibold tracking-widest">
            Loading...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#ff058d] animate-pulse"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
