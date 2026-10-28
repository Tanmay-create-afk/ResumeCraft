import React, { useRef, useCallback, useEffect, useLayoutEffect } from 'react';

/**
 * ThreeDTiltCard: Executive-grade, Apple/Stripe-level physical document presentation.
 * Supports realistic desk angles, distinct 3D camera modes, high-impact cursor tracking,
 * stacked physical paper depth, and seamless transitions between camera modes.
 */
export default function ThreeDTiltCard({
  children,
  className = '',
  contentClassName = '',
  cameraMode = 'isometric', // 'isometric' | 'dynamic' | 'flat'
  maxTilt = 28,
  scale = 1.01,
  glare = true,
  stackedPaper = false,
  isometricRest = false,
  trackParent = true,
  restAngles = null,
  atsScanBeam = false,
  floatingBadges = null,
  onClick,
}) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const transitionFramesRef = useRef(0);

  // Determine effective camera mode
  const effectiveMode = cameraMode || (isometricRest ? 'isometric' : 'dynamic');

  // Compute camera angles for each mode (distinct, engaging physical perspectives)
  let defaultRotateX = 0;
  let defaultRotateY = 0;
  let defaultRotateZ = 0;
  let defaultScale = 1;

  if (restAngles) {
    defaultRotateX = restAngles.x;
    defaultRotateY = restAngles.y;
    defaultRotateZ = restAngles.z;
    defaultScale = scale;
  } else if (effectiveMode === 'isometric') {
    // 3D Desk: Dramatically tangible physical desk angle with deep elevation & perspective
    defaultRotateX = 35;
    defaultRotateY = -22;
    defaultRotateZ = 5.5;
    defaultScale = 1.04;
  } else if (effectiveMode === 'dynamic') {
    // Dynamic Tilt: Responsive resting angle built for expressive cursor tracking
    defaultRotateX = 14;
    defaultRotateY = -9;
    defaultRotateZ = 2.5;
    defaultScale = 1.03;
  } else {
    // 'flat': Completely flat, 0-degree frontal view with zero distortion
    defaultRotateX = 0;
    defaultRotateY = 0;
    defaultRotateZ = 0;
    defaultScale = 1;
  }

  // Targets (where physics is animating towards)
  const targetX = useRef(defaultRotateX);
  const targetY = useRef(defaultRotateY);
  const targetZ = useRef(defaultRotateZ);
  const targetShiftX = useRef(0);
  const targetShiftY = useRef(0);
  const targetScale = useRef(defaultScale);
  const targetGlare = useRef({ x: 50, y: 50, opacity: 0 });

  // Current values
  const currentX = useRef(defaultRotateX);
  const currentY = useRef(defaultRotateY);
  const currentZ = useRef(defaultRotateZ);
  const currentShiftX = useRef(0);
  const currentShiftY = useRef(0);
  const currentScale = useRef(defaultScale);
  const currentGlare = useRef({ x: 50, y: 50, opacity: 0 });

  // Perspective distance (880px provides vivid physical depth and natural convergence)
  const perspectiveVal = 880;

  // Apply transform directly to DOM node
  const applyTransform = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(${perspectiveVal}px) translate3d(${currentShiftX.current.toFixed(2)}px, ${currentShiftY.current.toFixed(2)}px, 0px) rotateX(${currentX.current.toFixed(3)}deg) rotateY(${currentY.current.toFixed(3)}deg) rotateZ(${currentZ.current.toFixed(3)}deg) scale3d(${currentScale.current.toFixed(4)}, ${currentScale.current.toFixed(4)}, ${currentScale.current.toFixed(4)})`;
    }
    if (glareRef.current && glare && effectiveMode !== 'flat') {
      glareRef.current.style.opacity = currentGlare.current.opacity.toFixed(3);
      glareRef.current.style.background = `radial-gradient(circle 500px at ${currentGlare.current.x.toFixed(1)}% ${currentGlare.current.y.toFixed(1)}%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 72%)`;
    } else if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, [perspectiveVal, glare, effectiveMode]);

  // Smooth RAF physics loop with fast snappy mode switches
  const updatePhysics = useCallback(() => {
    let lerpFactor = 0.08;
    if (isTransitioningRef.current) {
      lerpFactor = 0.14; // Snappy mode switch
      transitionFramesRef.current -= 1;
      if (transitionFramesRef.current <= 0) {
        isTransitioningRef.current = false;
      }
    } else if (isHoveredRef.current) {
      lerpFactor = 0.095;
    } else {
      lerpFactor = 0.07;
    }

    currentX.current += (targetX.current - currentX.current) * lerpFactor;
    currentY.current += (targetY.current - currentY.current) * lerpFactor;
    currentZ.current += (targetZ.current - currentZ.current) * lerpFactor;
    currentShiftX.current += (targetShiftX.current - currentShiftX.current) * lerpFactor;
    currentShiftY.current += (targetShiftY.current - currentShiftY.current) * lerpFactor;
    currentScale.current += (targetScale.current - currentScale.current) * lerpFactor;

    currentGlare.current.x += (targetGlare.current.x - currentGlare.current.x) * lerpFactor;
    currentGlare.current.y += (targetGlare.current.y - currentGlare.current.y) * lerpFactor;
    currentGlare.current.opacity += (targetGlare.current.opacity - currentGlare.current.opacity) * (lerpFactor * 1.5);

    applyTransform();

    const dx = Math.abs(targetX.current - currentX.current);
    const dy = Math.abs(targetY.current - currentY.current);
    const dz = Math.abs(targetZ.current - currentZ.current);
    const dShiftX = Math.abs(targetShiftX.current - currentShiftX.current);
    const dShiftY = Math.abs(targetShiftY.current - currentShiftY.current);
    const ds = Math.abs(targetScale.current - currentScale.current);
    const dg = Math.abs(targetGlare.current.opacity - currentGlare.current.opacity);

    if (isTransitioningRef.current || isHoveredRef.current || dx > 0.008 || dy > 0.008 || dz > 0.008 || dShiftX > 0.04 || dShiftY > 0.04 || ds > 0.001 || dg > 0.008) {
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    } else {
      // Settle precisely on target
      currentX.current = targetX.current;
      currentY.current = targetY.current;
      currentZ.current = targetZ.current;
      currentShiftX.current = targetShiftX.current;
      currentShiftY.current = targetShiftY.current;
      currentScale.current = targetScale.current;
      currentGlare.current.opacity = targetGlare.current.opacity;
      applyTransform();
      animationFrameRef.current = null;
    }
  }, [applyTransform]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  }, [updatePhysics]);

  // Handle camera mode change
  useLayoutEffect(() => {
    isHoveredRef.current = false;
    isTransitioningRef.current = true;
    transitionFramesRef.current = 40;
    targetX.current = defaultRotateX;
    targetY.current = defaultRotateY;
    targetZ.current = defaultRotateZ;
    targetShiftX.current = 0;
    targetShiftY.current = 0;
    targetScale.current = defaultScale;
    targetGlare.current = { x: 50, y: 50, opacity: 0 };
    startAnimation();
  }, [effectiveMode, defaultRotateX, defaultRotateY, defaultRotateZ, defaultScale, startAnimation]);

  // Calculate expressive, high-impact cursor tilt & translation
  const onCursorMove = useCallback((clientX, clientY, targetRect) => {
    if (effectiveMode === 'flat') return;

    const x = clientX - targetRect.left;
    const y = clientY - targetRect.top;

    const centerX = targetRect.width / 2;
    const centerY = targetRect.height / 2;

    // Normalized offset from center (-1 to +1)
    const normX = Math.max(-1, Math.min(1, (x - centerX) / centerX));
    const normY = Math.max(-1, Math.min(1, (y - centerY) / centerY));

    // Expressive dynamic ranges based on mode
    const tiltRange = effectiveMode === 'isometric' ? 12 : (maxTilt || 28);
    const tiltPitchRange = effectiveMode === 'isometric' ? 10 : 22;
    const shiftRangeX = effectiveMode === 'isometric' ? 16 : 28;
    const shiftRangeY = effectiveMode === 'isometric' ? 12 : 22;

    // Leans and shifts smoothly towards wherever the cursor moves
    targetX.current = defaultRotateX + (normY * tiltPitchRange);
    targetY.current = defaultRotateY + (normX * tiltRange);
    targetZ.current = defaultRotateZ + (normX * 3.5);
    targetShiftX.current = normX * shiftRangeX;
    targetShiftY.current = normY * shiftRangeY;
    targetScale.current = scale * 1.03;

    if (glare && effectiveMode !== 'flat') {
      targetGlare.current = {
        x: (normX + 1) * 50,
        y: (normY + 1) * 50,
        opacity: effectiveMode === 'dynamic' ? 0.42 : 0.28,
      };
    }

    startAnimation();
  }, [effectiveMode, maxTilt, defaultRotateX, defaultRotateY, defaultRotateZ, scale, glare, startAnimation]);

  // Attach mouse listeners to the parent desk canvas (if trackParent) or card
  useEffect(() => {
    const targetElement = (trackParent && cardRef.current?.parentElement) || cardRef.current;
    if (!targetElement) return;

    const handleElementMouseMove = (e) => {
      if (effectiveMode === 'flat') return;
      isHoveredRef.current = true;
      const rect = targetElement.getBoundingClientRect();
      onCursorMove(e.clientX, e.clientY, rect);
    };

    const handleElementMouseLeave = () => {
      isHoveredRef.current = false;
      targetX.current = defaultRotateX;
      targetY.current = defaultRotateY;
      targetZ.current = defaultRotateZ;
      targetShiftX.current = 0;
      targetShiftY.current = 0;
      targetScale.current = defaultScale;
      targetGlare.current = { ...targetGlare.current, opacity: 0 };
      startAnimation();
    };

    targetElement.addEventListener('mousemove', handleElementMouseMove, { passive: true });
    targetElement.addEventListener('mouseleave', handleElementMouseLeave, { passive: true });

    return () => {
      targetElement.removeEventListener('mousemove', handleElementMouseMove);
      targetElement.removeEventListener('mouseleave', handleElementMouseLeave);
    };
  }, [trackParent, effectiveMode, defaultRotateX, defaultRotateY, defaultRotateZ, defaultScale, onCursorMove, startAnimation]);

  // Initial mount paint and cleanup
  useEffect(() => {
    applyTransform();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [applyTransform]);

  // Layered, realistic physical paper drop shadow
  const dynamicShadowClass = effectiveMode === 'isometric'
    ? 'shadow-[0_38px_75px_-20px_rgba(15,23,42,0.30),0_20px_40px_-10px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.08)]'
    : effectiveMode === 'flat'
      ? 'shadow-[0_8px_25px_-5px_rgba(15,23,42,0.10),0_0_0_1px_rgba(15,23,42,0.06)]'
      : 'shadow-[0_28px_60px_-15px_rgba(15,23,42,0.22),0_14px_30px_-8px_rgba(15,23,42,0.14),0_0_0_1px_rgba(15,23,42,0.07)]';

  const defaultContentClass = `relative rounded-xl overflow-hidden bg-white transition-shadow duration-500 ${dynamicShadowClass}`;
  const appliedContentClass = contentClassName ? `${contentClassName} ${dynamicShadowClass}` : defaultContentClass;

  const showStacked = stackedPaper || effectiveMode === 'isometric';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative select-none ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Physical Stacked Paper Sheets for Hyper-Realistic 3D Desk Depth */}
      {showStacked && (
        <>
          {/* Bottom stack paper sheet 2 */}
          <div
            className="absolute inset-0 rounded-xl bg-slate-200/95 border border-slate-300 pointer-events-none -z-20 transition-all duration-500 shadow-xl"
            style={{
              transform: 'translate3d(9px, 12px, -14px) rotateZ(-1.2deg)',
            }}
          />
          {/* Middle stack paper sheet 1 */}
          <div
            className="absolute inset-0 rounded-xl bg-slate-100/95 border border-slate-200 pointer-events-none -z-10 transition-all duration-500 shadow-md"
            style={{
              transform: 'translate3d(4px, 6px, -7px) rotateZ(-0.6deg)',
            }}
          />
        </>
      )}

      {/* Main Document Container with Multi-Stop Depth Shadows */}
      <div
        className={appliedContentClass}
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {children}

        {/* 3D Holographic ATS Scanner Beam Animation (only if explicitly enabled) */}
        {atsScanBeam && effectiveMode !== 'flat' && (
          <div className="absolute inset-x-0 h-20 pointer-events-none animate-ats-scan z-25 overflow-hidden">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
            <div className="w-full h-full bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent" />
          </div>
        )}

        {/* Dynamic Specular 3D Glare Sheen */}
        {glare && effectiveMode !== 'flat' && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none rounded-xl z-20 transition-opacity duration-300"
            style={{
              opacity: 0,
              background: 'radial-gradient(circle 500px at 50% 50%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 72%)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>

      {/* Floating 3D Parallax Badges layer */}
      {floatingBadges && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-all duration-700"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {floatingBadges}
        </div>
      )}
    </div>
  );
}
