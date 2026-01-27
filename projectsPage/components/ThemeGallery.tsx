
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, MANGA_STYLES } from '../constants';
import { ThemeSummary } from '../types';
import { RefreshCw, AlertTriangle } from 'lucide-react';

const ThemeGallery: React.FC = () => {
  const [themes, setThemes] = useState<ThemeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{message: string, url: string} | null>(null);

  const fetchThemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    // Explicitly joining without trailing slash issues
    const targetUrl = `${API_BASE_URL}/themes`;
    
    try {
      // Basic GET fetch without custom headers to avoid CORS preflight complications
      const response = await fetch(targetUrl, {
        method: 'GET',
        // Note: No 'Accept' or other headers to keep the request "simple" for CORS
      });
      
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      
      const data = await response.json();
      setThemes(data);
    } catch (err) {
      console.error('Gallery Fetch Error:', err);
      setError({
        message: err instanceof Error ? err.message : 'The Blossom API is currently out of reach.',
        url: targetUrl
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="relative">
          <div className="animate-spin w-20 h-20 border-8 border-purple-600 border-t-transparent rounded-full mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
          <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-white">INK</div>
        </div>
        <p className="manga-font text-3xl animate-pulse tracking-widest mt-4">LOADING PROJECTS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-4">
        <div className={MANGA_STYLES.errorPanel}>
          <div className="absolute inset-0 halftone opacity-20"></div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="bg-black p-4 rounded-full text-red-500 border-4 border-white shadow-lg animate-bounce">
              <AlertTriangle size={48} />
            </div>
            <div>
              <h2 className="manga-font text-5xl text-white mb-2 uppercase tracking-tighter">DATA FETCH FAILURE!</h2>
              <div className="bg-white/90 text-black font-black px-6 py-2 border-2 border-black inline-block mb-4">
                ERROR: {error.message}
              </div>
              <p className="text-[10px] font-mono text-red-100 opacity-80 break-all max-w-sm mx-auto mb-2">
                ENDPOINT: {error.url}
              </p>
              <p className="text-white text-xs font-bold uppercase tracking-widest">
                Check your network or the Blossom server status.
              </p>
            </div>
            <button 
              onClick={fetchThemes}
              className="flex items-center gap-2 bg-black text-white px-10 py-3 border-4 border-white manga-font text-2xl hover:scale-110 active:scale-95 transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
            >
              <RefreshCw size={24} /> RETRY CONNECTION
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section Banner */}
      <div className="relative border-4 border-black bg-purple-600 p-8 md:p-12 overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute inset-0 halftone"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h2 className={`${MANGA_STYLES.heading} text-white text-5xl md:text-7xl mb-2 italic`}>OUR WORK</h2>
            <p className="japanese-font font-bold text-pink-200 text-lg italic bg-black/30 inline-block px-3 py-1 uppercase tracking-widest">"EVERY LINE OF CODE IS A STROKE OF INK"</p>
          </div>
          <div className="bg-white text-black p-4 border-4 border-black -rotate-2 hidden md:block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <p className="font-bold uppercase tracking-tighter text-xs">Exploration Phase</p>
             <p className="manga-font text-3xl leading-none">ACT 02</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {themes.map((theme, idx) => (
          <Link 
            key={theme.software} 
            to={`/theme/${theme.software}`}
            className={`group relative ${MANGA_STYLES.panel} border-4 border-black h-80 flex flex-col hover:-translate-y-2 hover:translate-x-1 transition-transform shadow-[6px_6px_0px_0px_rgba(168,85,247,1)] hover:shadow-[10px_10px_0px_0px_rgba(236,72,153,1)]`}
          >
            {/* Thumbnail */}
            <div className="h-48 overflow-hidden border-b-4 border-black relative">
              <img 
                src={theme.thumbnail || `https://picsum.photos/seed/${theme.software}/400/300`} 
                alt={theme.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-pink-500 border-2 border-black px-2 py-0.5 text-xs font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {theme.software.toUpperCase()}
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-grow flex flex-col justify-between bg-white group-hover:bg-purple-50 transition-colors">
              <h3 className="manga-font text-2xl text-black leading-tight group-hover:text-purple-600 transition-colors">{theme.name}</h3>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">VOL. {idx + 1}</span>
                <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase transform -skew-x-12">View Details</span>
              </div>
            </div>

            {/* Manga Style Overlay Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-600 pointer-events-none transition-all"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ThemeGallery;
