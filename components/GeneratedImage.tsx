
import React, { useState, useEffect } from 'react';
// Corrected import to use the available generateMangaPanel function
import { generateMangaPanel } from '../lib/gemini';

interface GeneratedImageProps {
  subject: string;
  className?: string;
  placeholderIcon?: string;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ subject, className, placeholderIcon }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setLoading(true);
      // Changed generateBlossomImage call to generateMangaPanel
      const url = await generateMangaPanel(subject);
      if (isMounted) {
        setImageUrl(url);
        setLoading(false);
      }
    };

    fetchImage();
    return () => { isMounted = false; };
  }, [subject]);

  if (loading) {
    return (
      <div className={`${className} bg-pink-50 animate-pulse flex items-center justify-center`}>
        <div className="text-4xl opacity-20">{placeholderIcon || '🌸'}</div>
      </div>
    );
  }

  return (
    <div className={`${className} overflow-hidden bg-white`}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={subject} 
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-100"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#FF85A2]">
          {placeholderIcon || '🌸'}
        </div>
      )}
    </div>
  );
};

export default GeneratedImage;
