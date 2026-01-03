
import React, { useEffect, useState } from 'react';
import GeneratedImage from './GeneratedImage';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-8 md:px-24 overflow-hidden pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full max-w-[1800px] mx-auto gap-12 relative z-10">
        
        <div className={`hidden lg:flex flex-col justify-end lg:col-span-1 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-30 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="vertical-text text-xs font-black tracking-[0.8em] text-[#9200ff] mb-4">
            PRECISION • BEAUTY • OPEN SOURCE
          </div>
          <div className="w-px h-32 bg-[#FF85A2] mx-auto"></div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="text-[#ff058d] font-black text-sm tracking-[0.4em] mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#ff058d]"></span>
              EST. 2023
            </h2>
            <h1 className="text-7xl md:text-[10vw] font-serif font-black leading-[0.9] text-[#9200ff] mb-12">
              The Art of <br />
              <span className="italic font-normal text-[#ff058d] relative">
                Clarity
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#FFB7C5] opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q50 20 100 10" stroke="currentColor" fill="none" strokeWidth="4" />
                </svg>
              </span>
            </h1>
          </div>
          
          <div className={`max-w-md transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <p className="text-xl text-[#6AB0FF] font-light leading-relaxed mb-10">
              Blossom is a design-first collective crafting visual tranquility for your development environment.
            </p>
            <div className="flex gap-8 items-center">
              <button className="group relative px-8 py-4 bg-[#9200ff] text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                <span className="relative z-10 font-bold">Discover Collections</span>
                <div className="absolute inset-0 bg-[#ff058d] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <a href="#projects" className="font-bold text-[#9200ff] flex items-center gap-2 group">
                Portfolio 
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-4 relative flex items-center justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
           <div className="relative w-full aspect-square max-w-sm">
             <div className="absolute inset-0 bg-[#FF92DF] rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
             
             {/* AI Generated Centerpiece */}
             <GeneratedImage 
               subject="A stylized Japanese shrine gate surrounded by floating sakura petals in a modern digital art style"
               className="w-full h-full rounded-full shadow-2xl animate-float relative z-10"
               placeholderIcon="🦊"
             />

             <div className="absolute -bottom-10 -right-10 text-[200px] opacity-5 pointer-events-none select-none">花</div>
           </div>
        </div>
      </div>

      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-[#FF92DF] rounded-full blur-[180px] opacity-10 -z-10"></div>
    </section>
  );
};

export default Hero;
