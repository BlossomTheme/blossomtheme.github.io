
import React, { useState, useEffect, useMemo } from 'react';
import { generateMangaPanel, getCachedImage, downloadBase64Image } from '../lib/gemini';

interface MangaPanelProps {
  gridArea: string;
  mobileGridArea?: string;
  subject: string;
  staticSrc?: string;
  type?: 'scenery' | 'mascot' | 'abstract';
  children?: React.ReactNode;
  className?: string;
  isThick?: boolean;
  isSlanted?: boolean;
}

type PanelStatus = 'loading' | 'error' | 'success';

const MangaPanel: React.FC<MangaPanelProps> = ({ 
  gridArea, 
  mobileGridArea,
  subject, 
  staticSrc,
  type = 'scenery', 
  children, 
  className = "", 
  isThick = false,
  isSlanted = false
}) => {
  const cacheKey = useMemo(() => btoa(type + subject).substring(0, 32), [type, subject]);
  const initialImg = useMemo(() => staticSrc || getCachedImage(cacheKey), [cacheKey, staticSrc]);
  
  const [imgUrl, setImgUrl] = useState<string | null>(initialImg);
  const [status, setStatus] = useState<PanelStatus>(initialImg ? 'success' : 'loading');
  const [isMobile, setIsMobile] = useState(false);

  const fetchImage = async () => {
    if (imgUrl || staticSrc) return;
    setStatus('loading');

    try {
      const url = await generateMangaPanel(subject, type as 'scenery' | 'mascot' | 'abstract');
      if (url) {
        setImgUrl(url);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Panel failed to load:", error);
      setStatus('error');
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetchImage();
    return () => window.removeEventListener('resize', checkMobile);
  }, [subject, type, staticSrc]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imgUrl) {
      downloadBase64Image(imgUrl, subject);
    }
  };

  return (
    <div 
      className={`manga-panel group/panel ${isThick ? 'manga-border-thick' : ''} ${className}`}
      style={{ 
        gridArea: isMobile && mobileGridArea ? mobileGridArea : gridArea,
        clipPath: isSlanted ? 'polygon(0 0, 100% 3%, 100% 100%, 0 97%)' : 'none'
      }}
    >
      <div className="screentone"></div>
      
      {status === 'loading' && (
        <div className="w-full h-full bg-pink-50 flex flex-col items-center justify-center animate-pulse gap-3">
          <div className="w-8 h-8 border-4 border-[#FF85A2] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[#FF85A2] text-[10px] font-black tracking-widest uppercase font-manga">Drawing Panel...</span>
        </div>
      )}

      {status === 'error' && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center p-6 text-center border-4 border-dashed border-[#4A148C]/20">
          <div className="font-manga text-[#4A148C] text-3xl mb-2 opacity-50">?!</div>
          <div className="bg-[#4A148C] text-white px-3 py-1 text-[8px] font-black tracking-widest mb-4">QUOTA EXHAUSTED</div>
          <p className="text-[#4A148C] text-[10px] font-bold opacity-60 leading-tight mb-4">
            THE ARTIST IS TIRED.<br/>PLEASE TRY AGAIN LATER.
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); fetchImage(); }}
            className="pointer-events-auto bg-[#FF85A2] text-white px-4 py-2 font-manga text-sm hover:scale-110 transition-transform shadow-md"
          >
            REDRAW
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#4A148C]">
          {imgUrl && (
            <img 
              src={imgUrl} 
              alt={subject} 
              className="w-full h-full object-cover scale-[1.05] transition-all duration-1000 drift-bg" 
            />
          )}
        </div>
      )}

      <div className="speed-lines"></div>

      {status === 'success' && imgUrl && !staticSrc && (
        <button 
          onClick={handleDownload}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 border-2 border-[#4A148C] text-[#4A148C] opacity-0 group-hover/panel:opacity-100 transition-opacity hover:bg-[#FF85A2] hover:text-white shadow-md rounded-sm flex items-center gap-2 pointer-events-auto"
          title="Download asset"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        </button>
      )}

      <div className="absolute inset-0 p-4 md:p-6 flex flex-col pointer-events-none z-10">
        <div className="pointer-events-auto h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MangaPanel;
