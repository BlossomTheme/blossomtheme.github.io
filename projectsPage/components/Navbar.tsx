
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black border-b-[6px] border-purple-600 sticky top-0 z-50 py-4 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link to="/" className="group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 border-2 border-white rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
               <span className="text-white font-bold text-2xl">B</span>
            </div>
            <div>
              <h1 className="manga-font text-3xl text-white leading-none">BLOSSOM</h1>
              <p className="text-[10px] tracking-[0.2em] text-pink-400 font-bold uppercase">Open Source Creative</p>
            </div>
          </div>
        </Link>

        <div className="flex gap-6 manga-font text-xl">
          <Link 
            to="/" 
            className={`transition-colors border-b-2 ${isActive('/') ? 'text-purple-400 border-purple-400' : 'hover:text-purple-400 border-transparent hover:border-purple-400 text-white'}`}
          >
            GALLERY
          </Link>
          <Link 
            to="/palette" 
            className={`transition-colors border-b-2 ${isActive('/palette') ? 'text-pink-400 border-pink-400' : 'hover:text-pink-400 border-transparent hover:border-pink-400 text-white'}`}
          >
            PALETTE
          </Link>
          <a 
            href="https://github.com/BlossomTheme" 
            target="_blank" 
            rel="noopener" 
            className="text-white hover:text-purple-400 transition-colors border-b-2 border-transparent hover:border-purple-400"
          >
            GITHUB
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
