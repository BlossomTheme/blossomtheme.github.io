
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="relative py-48 bg-white overflow-hidden">
      {/* Background Japanese Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[40vw] font-black text-[#FFF5F7] select-none pointer-events-none -z-0">精神</div>

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="reveal">
            <h2 className="text-[#FF85A2] font-black text-sm tracking-[0.4em] mb-8 uppercase">The Philosophy</h2>
            <h3 className="text-6xl font-serif font-black text-[#4A148C] leading-tight mb-12">
              Quietly <br /> Reimagining <br /> the Workspace
            </h3>
            <div className="w-24 h-1 bg-[#FF85A2] mb-12"></div>
            <p className="text-2xl text-[#6A4D8B] font-light leading-relaxed">
              We believe that the aesthetics of your environment are directly linked to the quality of your output. 
              Blossom isn't just about color; it's about creating a mental space where focus is natural and stress is minimized.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal">
            <div className="aspect-[3/4] rounded-[40px] bg-[#FFF5F7] p-10 flex flex-col justify-end gap-4 shadow-inner border border-pink-50 hover:-translate-y-4 transition-transform duration-500">
               <div className="text-4xl">🧘</div>
               <h5 className="font-black text-[#4A148C]">Zen Driven</h5>
               <p className="text-sm text-[#6A4D8B]">Eliminating visual noise for ultimate clarity.</p>
            </div>
            <div className="aspect-[3/4] rounded-[40px] bg-[#FFF5F7] p-10 flex flex-col justify-end gap-4 shadow-inner border border-pink-50 hover:-translate-y-4 transition-transform duration-500 mt-12">
               <div className="text-4xl">🎨</div>
               <h5 className="font-black text-[#4A148C]">Chromatic</h5>
               <p className="text-sm text-[#6A4D8B]">Scientifically picked palettes for long-term comfort.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Lantern Placeholder */}
      <div className="absolute -bottom-10 right-20 w-32 h-64 opacity-10 pointer-events-none hidden lg:block">
         <svg viewBox="0 0 100 200" className="w-full h-full fill-[#FF85A2]">
           <rect x="30" y="0" width="40" height="20" />
           <rect x="10" y="20" width="80" height="150" rx="10" />
           <rect x="30" y="170" width="40" height="30" />
         </svg>
      </div>
    </section>
  );
};

export default AboutSection;
