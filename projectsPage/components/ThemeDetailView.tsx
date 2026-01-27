
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL, MANGA_STYLES } from '../constants';
import { ThemeDetails } from '../types';
import { ArrowLeft, ExternalLink, Code, Terminal, Github, RefreshCw, AlertTriangle } from 'lucide-react';

const ThemeDetailView: React.FC = () => {
  const { software } = useParams<{ software: string }>();
  const [theme, setTheme] = useState<ThemeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{message: string, url: string} | null>(null);
  const [activeImg, setActiveImg] = useState<number>(0);

  const fetchThemeDetails = useCallback(async () => {
    if (!software) return;
    setLoading(true);
    setError(null);
    const targetUrl = `${API_BASE_URL}/themes/${software}`;
    try {
      // Clean fetch without custom headers to avoid CORS preflight complications
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error(`Server status: ${response.status}`);
      const data = await response.json();
      setTheme(data);
    } catch (err) {
      console.error('Detail Fetch error:', err);
      setError({
        message: err instanceof Error ? err.message : 'Failed to retrieve theme details.',
        url: targetUrl
      });
    } finally {
      setLoading(false);
    }
  }, [software]);

  useEffect(() => {
    fetchThemeDetails();
    window.scrollTo(0, 0);
  }, [fetchThemeDetails]);

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="animate-spin w-16 h-16 border-8 border-pink-600 border-t-transparent rounded-full"></div>
    </div>
  );

  if (error || !theme) return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <div className={MANGA_STYLES.errorPanel}>
        <div className="absolute inset-0 halftone"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="bg-black p-4 rounded-full text-red-500 border-4 border-white shadow-lg">
            <AlertTriangle size={48} />
          </div>
          <div>
            <h2 className="manga-font text-5xl text-white mb-2 uppercase tracking-tighter">CHAPTER NOT FOUND!</h2>
            <p className="text-black font-black bg-white/80 px-4 py-2 inline-block border-2 border-black mb-4 uppercase">
              {software?.replace('-', ' ')} DATA IS MISSING
            </p>
            <div className="text-[10px] font-mono text-red-100 opacity-60 break-all max-w-xs md:max-w-md mx-auto mb-4">
              Error: {error?.message || 'Unknown Error'}
            </div>
            <p className="text-white text-sm font-bold">Try checking your internet connection or reload the page.</p>
          </div>
          <div className="flex gap-4">
             <Link to="/" className="manga-font text-2xl bg-white text-black px-6 py-2 border-4 border-black hover:bg-pink-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">BACK</Link>
             <button onClick={fetchThemeDetails} className="manga-font text-2xl bg-black text-white px-6 py-2 border-4 border-white hover:bg-purple-600 transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2"><RefreshCw size={20} /> RETRY</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link to="/" className="flex items-center gap-2 text-pink-400 font-bold mb-4 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft size={20} /> BACK TO GALLERY
          </Link>
          <div className="relative inline-block">
             <h2 className="manga-font text-5xl md:text-7xl text-white relative z-10">{theme.name}</h2>
             <div className="absolute -bottom-2 -right-4 w-full h-8 bg-purple-600 -rotate-1 -z-10 border-2 border-black"></div>
          </div>
          <p className="japanese-font text-xl text-gray-400 mt-4 uppercase tracking-wider">{theme.software} Edition</p>
        </div>
        
        <div className="flex gap-4">
          <a 
            href={theme.repository_url} 
            target="_blank" 
            rel="noopener"
            className="flex items-center gap-2 bg-white text-black font-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Github size={20} /> VIEW SOURCE
          </a>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Gallery Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`${MANGA_STYLES.panel} p-2 bg-black`}>
            <img 
              src={theme.screenshots[activeImg] || theme.thumbnail} 
              alt="Preview" 
              className="w-full aspect-video object-cover border-4 border-black"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {theme.screenshots.map((shot, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`border-4 transition-all ${activeImg === i ? 'border-pink-500 scale-95' : 'border-black hover:border-purple-500'}`}
              >
                <img src={shot} alt={`Screenshot ${i}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>

          <div className="bg-white text-black border-4 border-black p-6 relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 halftone w-40 h-40"></div>
             <h3 className="manga-font text-3xl mb-3 flex items-center gap-2"><Code className="text-purple-600" /> DESCRIPTION</h3>
             <p className="text-lg leading-relaxed font-medium">{theme.description}</p>
          </div>
        </div>

        {/* Right: Installation & Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-purple-600 border-4 border-black p-6 text-white transform rotate-1">
             <h3 className="manga-font text-3xl mb-4 flex items-center gap-2"><Terminal /> INSTALLATION GUIDE</h3>
             <div className="prose prose-invert max-w-none prose-p:text-purple-100 prose-strong:text-white prose-code:bg-black/50 prose-code:px-1">
                {theme.installation_instructions.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 leading-snug">
                    {line.startsWith('**') ? <strong>{line.replace(/\*\*/g, '')}</strong> : line}
                  </p>
                ))}
             </div>
          </div>

          <div className="bg-pink-500 border-4 border-black p-6 text-white transform -rotate-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20"><Github size={64} /></div>
            <h3 className="manga-font text-3xl mb-2">QUICK LINKS</h3>
            <ul className="space-y-3 font-bold">
               <li>
                 <a href={theme.repository_url} className="flex items-center gap-2 hover:underline">
                    <ExternalLink size={18} /> GitHub Repository
                 </a>
               </li>
               <li>
                 <a href="#" className="flex items-center gap-2 hover:underline">
                    <ExternalLink size={18} /> Raw Theme File (.json)
                 </a>
               </li>
               <li>
                 <a href="#" className="flex items-center gap-2 hover:underline">
                    <ExternalLink size={18} /> Issue Tracker
                 </a>
               </li>
            </ul>
          </div>

          {/* Manga Bubble */}
          <div className="relative mt-8">
            <div className="bg-white border-4 border-black p-4 rounded-3xl relative z-10">
               <p className="text-black font-black italic text-center">
                 "BLOOM BRIGHTER WITH {theme.software.toUpperCase()}!"
               </p>
            </div>
            <div className="absolute -bottom-2 left-10 w-8 h-8 bg-white border-l-4 border-b-4 border-black rotate-[-45deg] z-0"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThemeDetailView;
