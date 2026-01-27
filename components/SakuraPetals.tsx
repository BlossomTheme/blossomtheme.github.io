
import React, { useMemo } from 'react';

type Petal = {
  id: number;
  left: number; // percent
  size: number; // px
  duration: number; // s
  delay: number; // s
  sway: number; // s
  opacity: number;
};

const NUM_PETALS = 28;

const SakuraPetals: React.FC = () => {
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: NUM_PETALS }).map((_, i) => {
      const left = Math.random() * 120 - 10; // allow slightly off-screen start
      const size = Math.round(12 + Math.random() * 32);
      const duration = Number((8 + Math.random() * 16).toFixed(2));
      // negative delays to stagger initial positions
      const delay = Number((-Math.random() * duration).toFixed(2));
      const sway = Number((3 + Math.random() * 5).toFixed(2));
      const opacity = Number((0.6 + Math.random() * 0.4).toFixed(2));
      return { id: i, left, size, duration, delay, sway, opacity };
    });
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`
        .sakura-petal-container{position:absolute;top:-15vh;will-change:transform,opacity;}
        .sakura-petal-inner{display:block;}

        @keyframes fall-down {
          0%{transform:translateY(-15vh);opacity:0}
          10%{opacity:1}
          100%{transform:translateY(120vh);opacity:0.95}
        }

        @keyframes sway {
          0%{transform:translateX(-18px) rotate(0deg)}
          50%{transform:translateX(18px) rotate(90deg)}
          100%{transform:translateX(-18px) rotate(180deg)}
        }

        .sakura-petal-svg{display:block;width:100%;height:auto}
      `}</style>

      {petals.map(p => (
        <div
          key={p.id}
          className="sakura-petal-container"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            // CSS variables used in animations
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ['--duration' as any]: `${p.duration}s`,
            // @ts-ignore
            ['--delay' as any]: `${p.delay}s`,
            // @ts-ignore
            ['--sway' as any]: `${p.sway}s`,
            opacity: p.opacity,
            animation: `fall-down ${p.duration}s linear ${p.delay}s infinite`,
            transformOrigin: 'center',
          } as React.CSSProperties}
        >
          <div
            className="sakura-petal-inner"
            style={{
              animation: `sway ${p.sway}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          >
            <svg viewBox="0 0 32 32" className="sakura-petal-svg" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
              <path d="M16 2 C20 2 26 6 26 10 C26 14 20 20 16 26 C12 20 6 14 6 10 C6 6 12 2 16 2 Z" fill="#FF92DF" stroke="#ff058d" strokeOpacity="0.6" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SakuraPetals;
