
import React from 'react';
import MangaPanel from './components/MangaPanel';
import { getAllCachedImages, downloadBase64Image } from './lib/gemini';

const App: React.FC = () => {
  const downloadAll = () => {
    const images = getAllCachedImages();
    if (images.length === 0) {
      alert("No generated images found in cache yet!");
      return;
    }
    if (confirm(`Download all ${images.length} generated panels?`)) {
      images.forEach((img, i) => {
        setTimeout(() => {
          downloadBase64Image(img.data, `panel_${img.key}`);
        }, i * 200);
      });
    }
  };

  return (
    <div className="manga-grid">
      {/* Panel 1: The Title & Official Branding */}
      <MangaPanel 
        gridArea="1 / 1 / 5 / 4" 
        mobileGridArea="1 / 1 / 4 / 3"
        subject="Dramatic close-up of a blossoming cherry tree branch with glowing petals, thick ink style"
        isThick
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="bg-[#4A148C] text-white px-4 py-2 flex items-center gap-2 font-black text-xl tracking-tighter self-start shadow-lg">
              <img src="logo.png" alt="Logo" className="w-6 h-6 object-contain invert" />
              BLOSSOM
            </div>
            <div className="text-[10px] tracking-[0.3em] font-black text-[#4A148C] uppercase ml-1">Open Source Creative</div>
          </div>
          
          <div className="bg-white border-4 border-[#4A148C] p-4 rotate-[-4deg] shadow-xl relative mt-4">
             <div className="absolute -top-6 -right-6 w-12 h-12 md:w-16 md:h-16">
               <img src="logo.png" alt="Stamp" className="w-full h-full object-contain rotate-12 opacity-80" />
             </div>
             <h1 className="font-manga text-3xl md:text-5xl leading-none text-[#4A148C]">
               CODE IN <br/><span className="text-[#FF85A2] text-5xl md:text-7xl">BLOOM!</span>
             </h1>
          </div>
        </div>
      </MangaPanel>

      {/* Panel 2: The Mascot & Atmosphere */}
      <MangaPanel 
        gridArea="1 / 4 / 9 / 10" 
        mobileGridArea="1 / 3 / 8 / 5"
        subject="The official mascot girl: artistic character portrait, purple eyes, pink kimono, masterpiece manga illustration"
        type="mascot"
        isThick
        className="bg-[#FFF5F7]"
      >
        <div className="h-full flex flex-col items-end justify-between p-4">
          <div className="vertical-text font-black text-[#4A148C] text-[10px] md:text-xs tracking-[1em] bg-white/50 backdrop-blur-sm p-2 border-2 border-[#4A148C]">
            CREATIVE • OPEN SOURCE • SERENE
          </div>
          <div className="w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none self-start">
             <img src="logo.png" alt="Watermark" className="w-full h-full object-contain grayscale brightness-0" />
          </div>
        </div>
      </MangaPanel>

      {/* Panel 3: Navigation - Documentation */}
      <MangaPanel 
        gridArea="1 / 10 / 5 / 13" 
        mobileGridArea="4 / 1 / 8 / 3"
        subject="Abstract digital data patterns, glowing purple and pink nodes, tech-manga style"
      >
        <div className="h-full flex items-center justify-center">
          <a 
            href="https://blossomtheme.github.io/Docs/"
            className="group relative"
          >
            <div className="speech-bubble font-manga text-xl md:text-3xl text-[#4A148C] group-hover:scale-110 group-hover:bg-[#FF85A2] group-hover:text-white transition-all text-center">
              READ THE <br/> DOCS!
            </div>
          </a>
        </div>
      </MangaPanel>

      {/* Panel 4: Navigation - Projects Hub */}
      <MangaPanel 
        gridArea="5 / 1 / 13 / 4" 
        mobileGridArea="8 / 1 / 13 / 3"
        subject="Interior of a modern creative studio with a window view of a cherry orchard, cinematic wide shot"
        isSlanted
      >
        <div className="bg-white/95 p-4 md:p-6 border-l-8 border-[#FF85A2] h-full flex flex-col shadow-inner justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="action-tag">PORTFOLIO</span>
              <h2 className="font-manga text-2xl md:text-4xl text-[#4A148C]">OUR WORKS</h2>
            </div>
            <p className="text-sm md:text-base font-bold text-[#6A4D8B] leading-relaxed italic">
              "Every line of code is a stroke of ink on the canvas of the digital world."
            </p>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
             <a 
              href="https://blossomtheme.github.io/pages/projects.html" 
              className="group relative inline-block scale-90 md:scale-100"
             >
                <div className="absolute -inset-4 bg-[#FF85A2] rotate-3 scale-95 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 -z-10"></div>
                <div className="bg-[#4A148C] text-white px-6 py-8 font-manga text-4xl lg:text-5xl text-center shadow-2xl border-4 border-white group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform">
                  EXPLORE<br/>PROJECTS
                </div>
                <div className="absolute -bottom-4 -right-4 font-manga text-[#4A148C] text-2xl bg-[#FFB7C5] px-2 py-1 transform -rotate-12 group-hover:rotate-0 transition-transform flex items-center gap-1 shadow-sm">
                  <img src="logo.png" className="w-4 h-4" /> CLICK!
                </div>
             </a>
          </div>

          <div className="mt-4 pt-4 border-t-2 border-[#4A148C] flex justify-between items-center">
             <span className="font-manga text-xl text-[#FF85A2]">ACT 01</span>
             <div className="flex gap-1">
                {[1,2,3].map(d => <div key={d} className="w-2 h-2 rounded-full bg-[#4A148C]"></div>)}
             </div>
          </div>
        </div>
      </MangaPanel>

      {/* Panel 5: Navigation - Palette */}
      <MangaPanel 
        gridArea="9 / 4 / 13 / 7" 
        mobileGridArea="8 / 3 / 11 / 5"
        subject="High-contrast close up of ink jars and pink flower petals falling into paint"
      >
        <div className="h-full flex flex-col justify-end p-2 md:p-4">
          <a 
            href="https://github.com/BlossomTheme/BlossomTheme/tree/master/Palette"
            className="group relative"
          >
            <div className="bg-[#4A148C] text-white p-2 md:p-4 font-manga text-lg md:text-2xl text-center transform skew-x-[-10deg] shadow-lg group-hover:bg-[#FF85A2] transition-colors">
              THE COLORS
            </div>
            <div className="absolute -top-6 -right-2 font-manga text-[#FF85A2] text-3xl opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-2">
              BAM!
            </div>
          </a>
        </div>
      </MangaPanel>

      {/* Panel 6: Navigation - Socials/GitHub */}
      <MangaPanel 
        gridArea="9 / 7 / 13 / 10" 
        mobileGridArea="11 / 3 / 13 / 5"
        subject="A mystical kitsune fox curled around a glowing purple orb, manga illustration"
      >
        <div className="h-full flex items-center justify-center">
          <a 
            href="https://github.com/BlossomTheme"
            className="w-16 h-16 md:w-20 md:h-20 bg-white border-4 border-[#4A148C] rounded-full flex items-center justify-center hover:scale-125 hover:rotate-[360deg] transition-all duration-700 shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#FF85A2] rounded-full scale-0 group-hover:scale-110 transition-transform -z-10"></div>
            <div className="group-hover:hidden">
               <svg className="w-8 h-8 md:w-10 md:h-10 fill-[#4A148C]" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </div>
            <div className="hidden group-hover:block w-10 h-10 md:w-12 md:h-12 animate-pulse">
               <img src="logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
          </a>
        </div>
      </MangaPanel>

      {/* Panel 7: Footer Detail & Bulk Export */}
      <MangaPanel 
        gridArea="5 / 10 / 13 / 13" 
        mobileGridArea="13 / 1 / 13 / 5"
        subject="Wide cinematic shot of a mountain shrine peak at sunset, purple skies and pink clouds"
        isThick
      >
        <div className="h-full flex flex-col justify-end">
          <div className="bg-[#4A148C] text-white p-4 shadow-2xl relative">
             <div className="absolute top-4 right-4 w-12 h-12 opacity-40">
                <img src="logo.png" alt="Stamp" className="w-full h-full object-contain invert" />
             </div>
             <div className="action-tag mb-2 !bg-[#FF85A2]">EPILOGUE</div>
             <p className="text-[10px] md:text-xs font-black tracking-[0.2em] leading-tight uppercase mb-4">
               BLOSSOM ORG • EST. 2023<br/>
               REIMAGINING WORKSPACES<br/>
               THROUGH THE LENS OF ART
             </p>
             <button 
              onClick={downloadAll}
              className="text-[9px] font-black border border-white/30 px-2 py-1 hover:bg-white hover:text-[#4A148C] transition-colors pointer-events-auto"
             >
               EXPORT ALL GENERATED PANELS
             </button>
          </div>
        </div>
      </MangaPanel>

      {/* Dynamic Background Effect */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFB7C5] opacity-30"></div>
        <div className="absolute top-0 right-0 p-20 font-serif text-[30vw] opacity-5 select-none leading-none flex flex-col items-center">
          <span>夢</span>
          <img src="logo.png" className="w-[10vw] opacity-20 grayscale" alt="Logo background" />
        </div>
      </div>
    </div>
  );
};

export default App;
