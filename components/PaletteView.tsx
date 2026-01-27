
import React, { useState } from 'react';
import { MANGA_STYLES } from '../constants';
import { Copy, Check, Palette, Sparkles, Droplets } from 'lucide-react';

interface ColorEntry {
  name: string;
  hex: string;
}

interface ColorGroup {
  title: string;
  jpTitle: string;
  colors: ColorEntry[];
  accent: string;
}

const colorGroups: ColorGroup[] = [
  {
    title: "Base Essentials",
    jpTitle: "基本の色",
    accent: "bg-purple-600",
    colors: [
      { name: "Background", hex: "#10111B" },
      { name: "Background 2", hex: "#090A0F" },
      { name: "Background 3", hex: "#403A72" },
      { name: "Black", hex: "#1F1F27" },
      { name: "White", hex: "#F9F7F2" },
      { name: "Foreground 1", hex: "#FF058D" },
      { name: "Foreground 2", hex: "#9200FF" },
    ]
  },
  {
    title: "The Tones",
    jpTitle: "モノトーン",
    accent: "bg-gray-800",
    colors: [
      { name: "Black 01", hex: "#090A0F" },
      { name: "Black 02", hex: "#191A21" },
      { name: "Black 03", hex: "#1F1F27" },
      { name: "Black 04", hex: "#10111B" },
      { name: "Black 05", hex: "#21222C" },
      { name: "Black 06", hex: "#343746" },
      { name: "Black 07", hex: "#424450" },
      { name: "White 01", hex: "#E1EFFF" },
      { name: "White 02", hex: "#E9E9E9" },
      { name: "White 03", hex: "#F9F7F2" },
      { name: "White 04", hex: "#F9F9F2" },
      { name: "White 05", hex: "#FFFFFF" },
    ]
  },
  {
    title: "Neon Purples",
    jpTitle: "紫のネオン",
    accent: "bg-purple-500",
    colors: [
      { name: "Purple 01", hex: "#8700D9" },
      { name: "Purple 02", hex: "#9200FF" },
      { name: "Purple 03", hex: "#983DFF" },
      { name: "Purple 04", hex: "#973DFD" },
      { name: "Purple 05", hex: "#A83DFF" },
      { name: "Purple 06", hex: "#C832FF" },
    ]
  },
  {
    title: "Vibrant Pinks",
    jpTitle: "鮮やかなピンク",
    accent: "bg-pink-500",
    colors: [
      { name: "Pink 01", hex: "#FF92DF" },
      { name: "Pink 02", hex: "#E700D8" },
      { name: "Pink 03", hex: "#EA00D9" },
      { name: "Pink 04", hex: "#FF15EF" },
      { name: "Pink 05", hex: "#FD21EF" },
      { name: "Pink 06", hex: "#FF22F0" },
      { name: "Pink 07", hex: "#FF25F0" },
      { name: "Pink 08", hex: "#FF2CF1" },
    ]
  },
  {
    title: "Strike Reds",
    jpTitle: "赤のストライク",
    accent: "bg-red-500",
    colors: [
      { name: "Red 01", hex: "#9E0A52" },
      { name: "Red 02", hex: "#F70047" },
      { name: "Red 03", hex: "#E92778" },
      { name: "Red 04", hex: "#EC107B" },
      { name: "Red 05", hex: "#FF058D" },
      { name: "Red 06", hex: "#FF0081" },
      { name: "Red 07", hex: "#EA748F" },
      { name: "Red 08", hex: "#FF69B4" },
    ]
  },
  {
    title: "Deep Blues",
    jpTitle: "深い青",
    accent: "bg-blue-600",
    colors: [
      { name: "Blue 01", hex: "#0685FC" },
      { name: "Blue 03", hex: "#8BE9FE" },
      { name: "Blue 04", hex: "#009AF3" },
      { name: "Blue 11", hex: "#26B3D2" },
      { name: "Blue 15", hex: "#01C8FF" },
      { name: "Blue 19", hex: "#0EF3FF" },
      { name: "Blue 20", hex: "#403A72" },
    ]
  },
  {
    title: "Electric Yellows",
    jpTitle: "電気の黄色",
    accent: "bg-yellow-400",
    colors: [
      { name: "Yellow 03", hex: "#F46E00" },
      { name: "Yellow 04", hex: "#FFD400" },
      { name: "Yellow 08", hex: "#FCDD42" },
      { name: "Yellow 09", hex: "#FFFF55" },
      { name: "Yellow 10", hex: "#FFDF52" },
    ]
  }
];

const PaletteView: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full space-y-16 pb-24">
      {/* Dynamic Header */}
      <div className="relative border-[6px] border-black bg-purple-600 p-8 md:p-16 overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] -rotate-1">
        <div className="absolute inset-0 halftone opacity-30"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="manga-font text-6xl md:text-9xl text-white leading-tight uppercase italic tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              PALETTE <span className="text-pink-300">HUB</span>
            </h2>
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
               <span className="bg-black text-white px-4 py-1 text-sm font-black italic uppercase skew-x-[-10deg] border-2 border-white">Chapter 03</span>
               <span className="bg-white text-black px-4 py-1 text-sm font-black italic uppercase skew-x-[-10deg] border-2 border-black">The Spectrum</span>
            </div>
          </div>
          
          <div className="bg-white p-6 border-4 border-black rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xs">
            <div className="flex items-center gap-2 mb-2 text-purple-600">
               <Sparkles size={20} />
               <span className="font-black text-xs uppercase tracking-widest">SENSEI'S NOTE</span>
            </div>
            <p className="text-black font-bold text-sm leading-tight italic">
              "Every color here is selected to bloom perfectly in any environment! Click to harvest the hex code!"
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      {colorGroups.map((group, groupIdx) => (
        <div key={groupIdx} className="space-y-6 w-full">
          <div className="flex items-end gap-4 border-b-8 border-black pb-2 mb-8">
             <div className={`${group.accent} w-10 h-10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-shrink-0`}></div>
             <h3 className="manga-font text-3xl sm:text-4xl md:text-5xl text-white uppercase">{group.title}</h3>
             <span className="japanese-font text-sm sm:text-lg md:text-xl text-gray-500 font-black mb-1 opacity-50 ml-auto">{group.jpTitle}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
            {group.colors.map((color, colorIdx) => (
              <button 
                key={colorIdx}
                onClick={() => copyToClipboard(color.hex)}
                className="group relative flex flex-col items-stretch text-left outline-none"
              >
                <div 
                  className="h-24 sm:h-28 md:h-32 lg:h-36 border-[3px] sm:border-[4px] border-black transition-all group-hover:-translate-y-2 group-hover:translate-x-1 group-active:translate-y-0 group-active:translate-x-0 relative overflow-hidden"
                  style={{ backgroundColor: color.hex, boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)' }}
                >
                  <div className="absolute inset-0 halftone opacity-10"></div>
                  
                  {/* Copy Overlay */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200 ${copied === color.hex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="bg-white text-black px-2 sm:px-3 py-1 border-2 border-black font-black text-[8px] sm:text-[10px] uppercase rotate-[-5deg]">
                       {copied === color.hex ? <span className="text-green-600">COPIED!</span> : 'COPY HEX'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-4 space-y-1">
                   <div className="text-[7px] sm:text-[10px] font-black uppercase text-purple-400 tracking-tighter opacity-70 break-all">
                     {color.hex}
                   </div>
                   <div className="text-[10px] sm:text-xs md:text-sm font-black text-white leading-none truncate pr-1">
                     {color.name}
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Style Guide Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 w-full">
         <div className="bg-white text-black border-4 border-black p-6 sm:p-8 relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(168,85,247,1)]">
            <div className="absolute -bottom-10 -right-10 halftone w-40 h-40"></div>
            <h4 className="manga-font text-2xl sm:text-4xl mb-4 flex items-center gap-2"><Palette className="text-purple-600" /> USAGE GUIDELINES</h4>
            <div className="space-y-4 font-bold text-sm md:text-base">
               <p className="border-l-4 border-pink-500 pl-4">Use <span className="text-purple-600 uppercase">Base Essentials</span> for core branding and high-level UI elements.</p>
               <p className="border-l-4 border-purple-500 pl-4">The <span className="text-gray-400 uppercase">Tones</span> category provides depth and professional contrast in light/dark modes.</p>
               <p className="border-l-4 border-blue-500 pl-4">Mix and match the <span className="text-pink-500 uppercase">Vibrant Series</span> for alerts, actions, and decorative highlights.</p>
            </div>
         </div>

         <div className="bg-black border-4 border-white p-6 sm:p-8 flex flex-col justify-center items-center text-center group">
            <div className="text-5xl sm:text-6xl mb-4 transition-transform group-hover:scale-110">🎨</div>
            <h4 className="manga-font text-2xl sm:text-3xl text-white mb-2 italic">MISSING A COLOR?</h4>
            <p className="text-gray-400 font-bold text-xs sm:text-sm max-w-xs mb-6 uppercase tracking-widest">Contribute to the spectrum on our official GitHub</p>
            <a 
               href="https://github.com/BlossomTheme" 
               target="_blank" 
               className="bg-purple-600 text-white border-4 border-white px-6 sm:px-8 py-2 sm:py-3 manga-font text-lg sm:text-2xl hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
            >
               PROPOSE NEW INK
            </a>
         </div>
      </div>
    </div>
  );
};

export default PaletteView;
