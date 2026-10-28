import React from 'react';

/**
 * ThreeDPerspectiveGrid
 * Linear/Cyberpunk inspired 3D infinite floor grid plane.
 * Casts a futuristic spatial horizon underneath the hero and workstation.
 */
export default function ThreeDPerspectiveGrid({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 3D Perspective Plane */}
      <div 
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[240%] h-[750px] opacity-45"
        style={{
          transform: 'perspective(500px) rotateX(68deg) translateZ(0)',
          transformOrigin: 'bottom center',
          background: `
            linear-gradient(to right, rgba(99, 102, 241, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 100%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 100%, black 20%, transparent 80%)',
        }}
      />

      {/* Horizon Fog Glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(248, 250, 252, 0.95) 0%, rgba(248, 250, 252, 0) 100%)',
        }}
      />
    </div>
  );
}
