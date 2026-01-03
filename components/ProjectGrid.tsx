import React, { useEffect } from 'react';
// import { PROJECTS, PANEL_IMAGES } from '../constants';

const ProjectGrid: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Map projects to their static images
  const projectImageKeys = ['vscode', 'discord', 'terminal', 'browser'];

  return (
    <section id="projects" className="py-32 px-8 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col mb-32 reveal">
           <h2 className="text-[#ff058d] font-black text-sm tracking-[0.4em] mb-4 uppercase">Selected Works</h2>
           <h3 className="text-6xl md:text-8xl font-serif font-black text-[#9200ff]">The Ecosystem</h3>
        </div>

        <div className="space-y-48">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.title} 
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center reveal`}
            >
              <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-[60px] shadow-2xl">
                <div 
                  className="absolute inset-0 z-20 opacity-40 transition-opacity group-hover:opacity-20 pointer-events-none"
                  style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }}
                ></div>
                
                {/* Static Project Visual */}
                <div className="aspect-[16/9] w-full relative bg-[#f9f7f2] flex items-center justify-center overflow-hidden">
                  <img 
                    src={PANEL_IMAGES[projectImageKeys[idx]]} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback to emoji if image not found
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="text-9xl">${project.icon}</div>`;
                    }}
                  />
                </div>

                <div className="absolute bottom-12 left-12 z-30">
                   <a 
                    href={project.url}
                    className="bg-white/90 backdrop-blur-md px-10 py-5 rounded-full font-bold text-[#4A148C] shadow-xl hover:bg-[#4A148C] hover:text-white transition-all inline-block"
                   >
                     View on GitHub
                   </a>
                </div>
              </div>

              <div className="w-full lg:w-2/5 px-4">
                <div className="text-[#FF85A2] text-6xl font-black mb-6 opacity-20 italic">0{idx + 1}</div>
                <h4 className="text-5xl font-serif font-black text-[#4A148C] mb-6">{project.title}</h4>
                <p className="text-xl text-[#6A4D8B] leading-relaxed mb-8 max-w-sm">
                  {project.description}
                </p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 rounded-full border border-pink-200 text-xs font-bold text-[#FF85A2] uppercase tracking-widest">Minimalist</span>
                  <span className="px-4 py-2 rounded-full border border-pink-200 text-xs font-bold text-[#FF85A2] uppercase tracking-widest">Accessibility</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;