
import React from 'react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="max-w-[1800px] mx-auto flex justify-between items-start p-8 md:p-12">
        <div className="pointer-events-auto flex flex-col gap-1">
          <div className="text-2xl font-black tracking-tighter text-[#4A148C] flex items-center gap-3">
            <img src="logo.png" alt="Blossom Logo" className="w-8 h-8 object-contain" />
            <span>BLOSSOM</span>
          </div>
          <div className="text-[10px] tracking-[0.3em] font-bold text-[#FF85A2] uppercase ml-11">Open Source Creative</div>
        </div>

        <div className="pointer-events-auto flex flex-col items-end gap-6">
          <div className="hidden md:flex flex-col items-end gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.url}
                className="text-xs font-bold tracking-widest text-[#4A148C] hover:text-[#FF85A2] transition-colors group relative py-1 overflow-hidden"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF85A2] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </a>
            ))}
          </div>
          <a 
            href="https://github.com/BlossomTheme"
            className="bg-[#4A148C] text-white w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl group"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
