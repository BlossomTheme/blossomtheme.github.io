
import React from 'react';
// import { NAV_ITEMS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f9f7f2] pt-48 pb-12 px-8 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-xl">
            <h2 className="text-7xl md:text-[8vw] font-serif font-black text-[#9200ff] leading-none mb-12">
              Stay in <br /><span className="text-[#ff058d]">Blossom.</span>
            </h2>
            <div className="flex gap-12 text-sm font-black tracking-widest text-[#9200ff]">
               <a href="#" className="hover:text-[#ff058d] transition-colors">TWITTER</a>
               <a href="#" className="hover:text-[#ff058d] transition-colors">DISCORD</a>
               <a href="#" className="hover:text-[#ff058d] transition-colors">GITHUB</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-6">
               <span className="text-xs font-black text-[#ff058d] tracking-widest uppercase\">Company</span>
               <a href=\"#\" className=\"text-xl font-serif hover:text-[#ff058d] transition-colors\">Home</a>
               <a href=\"https://blossomtheme.github.io/pages/projects.html\" className=\"text-xl font-serif hover:text-[#ff058d] transition-colors\">Projects</a>
            </div>
            <div className=\"flex flex-col gap-6\">
               <span className=\"text-xs font-black text-[#ff058d] tracking-widest uppercase\">Resources</span>
               <a href=\"https://blossomtheme.github.io/Docs/\" className=\"text-xl font-serif hover:text-[#ff058d] transition-colors\">Docs</a>
               <a href=\"https://github.com/BlossomTheme/BlossomTheme/tree/master/Palette\" className=\"text-xl font-serif hover:text-[#ff058d] transition-colors\">Palette</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-pink-100 gap-8">
          <div className="text-xs font-bold text-[#6AB0FF] tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} BLOSSOM THEME • MADE WITH PURPOSE
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-[#6AB0FF]">
            <span className="w-12 h-px bg-pink-200"></span>
            BACK TO TOP
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
