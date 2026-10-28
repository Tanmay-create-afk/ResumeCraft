import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedHeroBackground
 * Premium, non-intrusive SaaS background animation:
 * - Fluid organic Aurora light orbs drifting and breathing smoothly
 * - Interactive cursor-following ambient spotlight
 * - Architectural precision dot matrix with radial fade
 * - Glowing horizon beam
 * - 100% crystal-clear text readability with zero wireframe clutter
 */
export default function AnimatedHeroBackground({ className = '' }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Check if cursor is roughly within or near the hero
      if (
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100 &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* 1. Subtle Architectural Dot-Matrix Grid with Radial Vignette */}
      <div 
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)',
        }}
      />

      {/* 2. Interactive Cursor Spotlight (Illuminates softly where mouse hovers) */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.12) 0%, rgba(129, 140, 248, 0.05) 40%, transparent 75%)`,
        }}
      />

      {/* 3. Fluid Organic Aurora Light Waves (Continuous soft ambient drift) */}
      {/* Aurora Orb 1: Primary Indigo (Top-Left to Center) */}
      <div 
        className="absolute -top-10 left-1/4 w-[520px] h-[400px] rounded-full bg-gradient-to-tr from-indigo-300/40 via-indigo-200/30 to-blue-200/20 blur-[110px] animate-aurora-1 pointer-events-none"
      />

      {/* Aurora Orb 2: Soft Cyan / Sky Glow (Top-Right) */}
      <div 
        className="absolute top-20 right-1/4 w-[460px] h-[360px] rounded-full bg-gradient-to-bl from-sky-200/35 via-indigo-100/30 to-purple-100/20 blur-[100px] animate-aurora-2 pointer-events-none"
      />

      {/* Aurora Orb 3: Deep Royal Ambient Glow (Center behind stage) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[340px] rounded-full bg-gradient-to-r from-indigo-200/30 via-violet-200/20 to-teal-100/20 blur-[120px] animate-aurora-3 pointer-events-none"
      />

      {/* 4. Shimmering Horizon Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-shimmer-beam" />

      {/* 5. Soft Bottom Horizon Falloff */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(248, 250, 252, 1) 0%, rgba(248, 250, 252, 0) 100%)',
        }}
      />
    </div>
  );
}
