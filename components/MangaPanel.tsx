import React, { useState, useEffect } from 'react';

interface MangaPanelProps {
  gridArea: string;
  mobileGridArea?: string;
  staticSrc: string;
  type?: 'scenery' | 'mascot' | 'abstract';
  children?: React.ReactNode;
  className?: string;
  isThick?: boolean;
  isSlanted?: boolean;
}

const MangaPanel: React.FC<MangaPanelProps> = ({ 
  gridArea, 
  mobileGridArea,
  staticSrc,
  children, 
  className = "", 
  isThick = false,
  isSlanted = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className={`manga-panel group/panel ${isThick ? 'manga-border-thick' : ''} ${className}`}
      style={{ 
        gridArea: isMobile && mobileGridArea ? mobileGridArea : gridArea,
        clipPath: isSlanted ? 'polygon(0 0, 100% 3%, 100% 100%, 0 97%)' : 'none'
      }}
    >
      <div className="screentone"></div>
      
      {/* Loading state */}
      {!loaded && !imageError && (
        <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center animate-pulse gap-3">
          <div className="w-8 h-8 border-4 border-[#ff058d] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#ff058d] text-[10px] font-black tracking-widest uppercase font-manga">Loading Panel...</span>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 text-center border-4 border-dashed border-[#9200ff]/20">
          <div className="font-manga text-[#9200ff] text-3xl mb-2 opacity-50">?!</div>
          <div className="bg-[#9200ff] text-white px-3 py-1 text-[8px] font-black tracking-widest mb-4">IMAGE NOT FOUND</div>
          <p className="text-[#9200ff] text-[10px] font-bold opacity-60 leading-tight">
            Check if image exists at:<br/>{staticSrc}
          </p>
        </div>
      )}

      {/* Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#9200ff]">
        <img 
          src={staticSrc} 
          alt="Manga panel background" 
          className="w-full h-full object-cover scale-[1.05] transition-all duration-1000 drift-bg" 
          onLoad={() => setLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      </div>

      <div className="speed-lines"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col pointer-events-none z-10">
        <div className="pointer-events-auto h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MangaPanel;