import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeDHeroAnimation (Whole-Page 3D Spatial Universe)
 * - The 2 signature 3D animations flanking the hero headline:
 *   1. Left: 3D Holographic Torus Knot with tilted orbital coordinate ring.
 *   2. Right: 3D Diamond Icosahedron with illuminated crystalline core & orbit ring.
 * - Multi-tiered floating 3D geometric sculptures populating the upper, outer, and lower whitespaces.
 * - Architectural constellation network and 550+ ambient depth particles.
 * - Full interactive mouse parallax, inertia tracking, and zero THREE.Clock warnings.
 */

// ============================================================================
// 🎮 SUPER SIMPLE 3D CONTROLS (Change any number here and press Save!)
// ============================================================================
const SIMPLE_3D_CONTROLS = {
  // ⬅️ ➡️ MOVE LEFT & RIGHT (Away from text or Closer to text):
  // • Put positive numbers (+1, +2, +3, +5) = Pushes them FARTHER OUT (away from text)
  // • Put negative numbers (-1, -2, -3)     = Pulls them CLOSER IN (towards text)
  // • 0 = Default (centered in whitespace)
  MOVE_LEFT_RIGHT: -6,

  // ⬆️ ⬇️ LEFT 3D ANIMATION (Torus Knot) UP & DOWN:
  // • Positive numbers (+1, +2, +3) = Moves it UP
  // • Negative numbers (-1, -2, -3) = Moves it DOWN
  // • 0 = Default
  LEFT_ANIMATION_UP_DOWN: 1,

  // ⬆️ ⬇️ RIGHT 3D ANIMATION (Diamond Sphere) UP & DOWN:
  // • Positive numbers (+1, +2, +3) = Moves it UP
  // • Negative numbers (-1, -2, -3) = Moves it DOWN
  // • 0 = Default
  RIGHT_ANIMATION_UP_DOWN: 1,

  // 🔍 MAKE IT BIG OR SMALL:
  // • 1.0 = Normal size (100%)
  // • 1.2 = 20% Bigger
  // • 1.5 = 50% Bigger
  // • 0.8 = 20% Smaller
  // • 0.6 = Very small
  BIG_OR_SMALL: 1.2,
};

export default function ThreeDHeroAnimation({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    // 2. Ambient & Studio Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const pointLightCursor = new THREE.PointLight(0x6366f1, 3.2, 65);
    pointLightCursor.position.set(0, 0, 12);
    scene.add(pointLightCursor);

    const pointLightLeft = new THREE.PointLight(0x06b6d4, 2.6, 55);
    pointLightLeft.position.set(-20, 4, 10);
    scene.add(pointLightLeft);

    const pointLightRight = new THREE.PointLight(0x8b5cf6, 2.6, 55);
    pointLightRight.position.set(20, -4, 10);
    scene.add(pointLightRight);

    // 3. 3D Geometric Group & Materials
    const group = new THREE.Group();
    scene.add(group);

    const indigoMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      wireframe: true,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.30,
    });

    const violetMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.28,
    });

    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.26,
    });

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.25,
    });

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.24,
    });

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.22,
    });

    // --- RESPONSIVE OBJECT REGISTRY ---
    const animatedObjects = [];

    const registerMesh = (mesh, config) => {
      group.add(mesh);
      animatedObjects.push({
        mesh,
        id: config.id,
        relX: config.relX,
        relY: config.relY,
        baseZ: config.baseZ || -4,
        rotSpeedX: config.rotX || 0.2,
        rotSpeedY: config.rotY || 0.25,
        rotSpeedZ: config.rotZ || 0,
        bobSpeed: config.bobSpeed || 0.8,
        bobAmp: config.bobAmp || 0.5,
        bobPhase: config.bobPhase || Math.random() * Math.PI,
        isPrimary: !!config.isPrimary,
      });
    };

    // ========================================================
    // 🌟 1. PRIMARY LEFT 3D ANIMATION: Holographic Torus Knot
    // ========================================================
    const torusGeo = new THREE.TorusKnotGeometry(1.5, 0.28, 100, 16);
    const torusKnot = new THREE.Mesh(torusGeo, indigoMat);
    registerMesh(torusKnot, {
      id: 'primary-left-torus',
      isPrimary: true,
      relX: -0.72,
      relY: 0.16,
      baseZ: -4,
      rotX: 0.22,
      rotY: 0.32,
      bobSpeed: 0.75,
      bobAmp: 0.55,
    });

    // Orbit Ring around Torus Knot
    const ring1Geo = new THREE.TorusGeometry(2.7, 0.020, 16, 90);
    const orbitRing1 = new THREE.Mesh(ring1Geo, ringMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    registerMesh(orbitRing1, {
      id: 'primary-left-ring',
      isPrimary: true,
      relX: -0.72,
      relY: 0.16,
      baseZ: -4,
      rotZ: 0.16,
      bobSpeed: 0.75,
      bobAmp: 0.55,
    });

    // ========================================================
    // 🌟 2. PRIMARY RIGHT 3D ANIMATION: Diamond Icosahedron + Core
    // ========================================================
    const icoGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const icosahedron = new THREE.Mesh(icoGeo, violetMat);

    const coreGeo = new THREE.IcosahedronGeometry(0.80, 0);
    const core = new THREE.Mesh(coreGeo, coreMat);
    icosahedron.add(core);

    registerMesh(icosahedron, {
      id: 'primary-right-ico',
      isPrimary: true,
      relX: 0.72,
      relY: 0.20,
      baseZ: -4,
      rotX: 0.25,
      rotY: 0.35,
      bobSpeed: 0.8,
      bobAmp: 0.5,
    });

    // Orbit Ring around Icosahedron
    const ringRight1Geo = new THREE.TorusGeometry(2.7, 0.020, 16, 90);
    const ringRight1 = new THREE.Mesh(ringRight1Geo, ringMat1);
    ringRight1.rotation.y = Math.PI / 4;
    registerMesh(ringRight1, {
      id: 'primary-right-ring',
      isPrimary: true,
      relX: 0.72,
      relY: 0.20,
      baseZ: -4,
      rotX: 0.18,
      rotZ: -0.22,
      bobSpeed: 0.8,
      bobAmp: 0.5,
    });

    // ========================================================
    // 🌌 3. UPPER-LEFT WHITESPACE: Nested Gyroscope with Inner Gem
    // ========================================================
    const gyroLeftGeo = new THREE.TorusGeometry(2.0, 0.020, 16, 90);
    const gyroLeft = new THREE.Mesh(gyroLeftGeo, ringMat2);
    registerMesh(gyroLeft, { relX: -0.68, relY: 0.64, baseZ: -4.5, rotX: 0.26, rotY: 0.18, rotZ: 0.14, bobSpeed: 0.65, bobAmp: 0.4 });

    const gyroLeftInnerGeo = new THREE.TorusGeometry(1.4, 0.016, 16, 80);
    const gyroLeftInner = new THREE.Mesh(gyroLeftInnerGeo, ringMat1);
    gyroLeftInner.rotation.x = Math.PI / 3;
    registerMesh(gyroLeftInner, { relX: -0.68, relY: 0.64, baseZ: -4.5, rotX: -0.2, rotZ: 0.25, bobSpeed: 0.65, bobAmp: 0.4 });

    const octGemLeftGeo = new THREE.OctahedronGeometry(0.75, 0);
    const octGemLeft = new THREE.Mesh(octGemLeftGeo, cyanMat);
    registerMesh(octGemLeft, { relX: -0.68, relY: 0.64, baseZ: -4.5, rotX: 0.35, rotY: 0.25, bobSpeed: 0.65, bobAmp: 0.4 });

    // Far Upper-Left: Floating Tetrahedron
    const tetraFarLeftGeo = new THREE.TetrahedronGeometry(1.1, 0);
    const tetraFarLeft = new THREE.Mesh(tetraFarLeftGeo, indigoMat);
    registerMesh(tetraFarLeft, { relX: -0.86, relY: 0.52, baseZ: -5, rotX: 0.22, rotY: 0.28, bobSpeed: 0.7, bobAmp: 0.35 });

    // ========================================================
    // 🌌 4. UPPER-RIGHT WHITESPACE: Nested Gyroscope with Inner Gem
    // ========================================================
    const gyroRightGeo = new THREE.TorusGeometry(2.0, 0.020, 16, 90);
    const gyroRight = new THREE.Mesh(gyroRightGeo, ringMat2);
    gyroRight.rotation.x = Math.PI / 4;
    registerMesh(gyroRight, { relX: 0.68, relY: 0.64, baseZ: -4.5, rotY: -0.26, rotX: 0.16, bobSpeed: 0.65, bobAmp: 0.4 });

    const gyroRightInnerGeo = new THREE.TorusGeometry(1.4, 0.016, 16, 80);
    const gyroRightInner = new THREE.Mesh(gyroRightInnerGeo, ringMat1);
    gyroRightInner.rotation.y = Math.PI / 3;
    registerMesh(gyroRightInner, { relX: 0.68, relY: 0.64, baseZ: -4.5, rotY: 0.22, rotZ: -0.2, bobSpeed: 0.65, bobAmp: 0.4 });

    const dodecGemRightGeo = new THREE.DodecahedronGeometry(0.75, 0);
    const dodecGemRight = new THREE.Mesh(dodecGemRightGeo, violetMat);
    registerMesh(dodecGemRight, { relX: 0.68, relY: 0.64, baseZ: -4.5, rotX: -0.3, rotZ: 0.25, bobSpeed: 0.65, bobAmp: 0.4 });

    // Far Upper-Right: Floating Diamond Gem
    const octFarRightGeo = new THREE.OctahedronGeometry(1.1, 0);
    const octFarRight = new THREE.Mesh(octFarRightGeo, cyanMat);
    registerMesh(octFarRight, { relX: 0.86, relY: 0.52, baseZ: -5, rotX: 0.25, rotZ: -0.22, bobSpeed: 0.7, bobAmp: 0.35 });

    // ========================================================
    // 🌌 5. MID-OUTER FLANKS (Filling the far left and right edges)
    // ========================================================
    // Far-Left Outer Cube
    const cubeFarLeftGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeFarLeft = new THREE.Mesh(cubeFarLeftGeo, indigoMat);
    registerMesh(cubeFarLeft, { relX: -0.88, relY: -0.05, baseZ: -4.5, rotX: 0.24, rotY: 0.2, rotZ: 0.15, bobSpeed: 0.75, bobAmp: 0.4 });

    // Far-Right Bipyramid Prism
    const bipyramidRightGeo = new THREE.CylinderGeometry(0, 1.0, 1.8, 6);
    const bipyramidRight = new THREE.Mesh(bipyramidRightGeo, violetMat);
    registerMesh(bipyramidRight, { relX: 0.88, relY: -0.05, baseZ: -4.5, rotX: 0.2, rotY: 0.3, bobSpeed: 0.75, bobAmp: 0.4 });

    // ========================================================
    // 🌌 6. LOWER-LEFT & LOWER-RIGHT FLANKS (Above studio desk)
    // ========================================================
    // Lower-Left Dodecahedron
    const dodecLowerLeftGeo = new THREE.DodecahedronGeometry(1.25, 0);
    const dodecLowerLeft = new THREE.Mesh(dodecLowerLeftGeo, indigoMat);
    registerMesh(dodecLowerLeft, { relX: -0.62, relY: -0.48, baseZ: -4, rotX: 0.22, rotY: -0.22, bobSpeed: 0.75, bobAmp: 0.45 });

    // Lower-Right Crystal Octahedron with Mini Orbit Ring
    const octLowerRightGeo = new THREE.OctahedronGeometry(1.25, 0);
    const octLowerRight = new THREE.Mesh(octLowerRightGeo, cyanMat);
    registerMesh(octLowerRight, { relX: 0.62, relY: -0.48, baseZ: -4, rotX: 0.25, rotZ: 0.2, bobSpeed: 0.8, bobAmp: 0.45 });

    const ringLowerRightGeo = new THREE.TorusGeometry(1.9, 0.016, 16, 80);
    const ringLowerRight = new THREE.Mesh(ringLowerRightGeo, ringMat2);
    ringLowerRight.rotation.x = Math.PI / 3;
    registerMesh(ringLowerRight, { relX: 0.62, relY: -0.48, baseZ: -4, rotZ: 0.18, bobSpeed: 0.8, bobAmp: 0.45 });

    // ========================================================
    // 🌌 7. TOP-CENTER ACCENTS (High above the headline)
    // ========================================================
    const ringTopLeftGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 80);
    const ringTopLeft = new THREE.Mesh(ringTopLeftGeo, ringMat1);
    ringTopLeft.rotation.x = Math.PI / 4;
    registerMesh(ringTopLeft, { relX: -0.32, relY: 0.84, baseZ: -6, rotX: 0.2, rotY: 0.15, bobSpeed: 0.85, bobAmp: 0.3 });

    const ringTopRightGeo = new THREE.TorusGeometry(1.6, 0.015, 16, 80);
    const ringTopRight = new THREE.Mesh(ringTopRightGeo, ringMat2);
    ringTopRight.rotation.y = Math.PI / 3;
    registerMesh(ringTopRight, { relX: 0.32, relY: 0.84, baseZ: -6, rotY: -0.2, rotX: 0.15, bobSpeed: 0.85, bobAmp: 0.3 });

    // 8. Architectural 3D Constellation Network
    const constellationNodeCount = 28;
    const nodeCoords = [];

    for (let i = 0; i < constellationNodeCount; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const relX = (Math.random() * 0.26 + 0.58) * side;
      const relY = (Math.random() - 0.5) * 1.7;
      nodeCoords.push({ relX, relY, z: (Math.random() - 0.5) * 12 - 4 });
    }

    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.16,
    });
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(constellationLines);

    // 9. Ambient 3D Depth Particles Field (550+ Particles)
    const particleCount = 550;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0x38bdf8), // Sky
      new THREE.Color(0x94a3b8), // Slate
      new THREE.Color(0x10b981), // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45 - 4;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Responsive Viewport Resizing & Whitespace-Centered Positioning Logic
    const updateLayout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const vFov = (camera.fov * Math.PI) / 180;
      const isMobile = w < 768;

      // Project each animated 3D sculpture relative to visible camera boundaries
      animatedObjects.forEach(item => {
        const dist = camera.position.z - item.baseZ;
        const visibleHalfHeight = Math.tan(vFov / 2) * dist;
        const visibleHalfWidth = visibleHalfHeight * camera.aspect;

        if (item.isPrimary) {
          const side = item.relX > 0 ? 1 : -1;

          // Calculate exact headline bounding box in 3D world units:
          const textPixelHalfWidth = Math.min(460, (w - 64) / 2);
          const pixelsPerUnit = w / (visibleHalfWidth * 2);
          const textUnitHalfWidth = textPixelHalfWidth / pixelsPerUnit;

          const whitespaceAvailable = visibleHalfWidth - textUnitHalfWidth;

          if (w >= 1024 && whitespaceAvailable >= 5.5) {
            // Desktop: Center the 3D sculpture in whitespace + apply user's MOVE_LEFT_RIGHT
            const whitespaceCenter = textUnitHalfWidth + (whitespaceAvailable * 0.52);
            const finalX = side * (whitespaceCenter + SIMPLE_3D_CONTROLS.MOVE_LEFT_RIGHT);

            // Apply user's UP & DOWN:
            const defaultY = (item.relX > 0 ? 0.20 : 0.16) * visibleHalfHeight;
            const extraY = item.relX > 0 ? SIMPLE_3D_CONTROLS.RIGHT_ANIMATION_UP_DOWN : SIMPLE_3D_CONTROLS.LEFT_ANIMATION_UP_DOWN;
            const finalY = defaultY + extraY;

            // Apply user's BIG_OR_SMALL:
            const finalScale = SIMPLE_3D_CONTROLS.BIG_OR_SMALL;

            item.mesh.scale.set(finalScale, finalScale, finalScale);
            item.actualBaseX = finalX;
            item.actualBaseY = finalY;
            item.mesh.visible = true;
          } else if (w >= 768) {
            // Tablets
            const scaleVal = 0.75 * SIMPLE_3D_CONTROLS.BIG_OR_SMALL;
            const extraY = item.relX > 0 ? SIMPLE_3D_CONTROLS.RIGHT_ANIMATION_UP_DOWN : SIMPLE_3D_CONTROLS.LEFT_ANIMATION_UP_DOWN;
            item.mesh.scale.set(scaleVal, scaleVal, scaleVal);
            item.actualBaseX = side * (Math.max(textUnitHalfWidth + 3.8, visibleHalfWidth * 0.82) + SIMPLE_3D_CONTROLS.MOVE_LEFT_RIGHT);
            item.actualBaseY = (item.relX > 0 ? 0.20 : 0.16) * visibleHalfHeight + extraY;
            item.mesh.visible = true;
          } else {
            // Mobile (< 768px)
            const scaleVal = 0.55 * SIMPLE_3D_CONTROLS.BIG_OR_SMALL;
            item.mesh.scale.set(scaleVal, scaleVal, scaleVal);
            item.actualBaseX = side * (visibleHalfWidth * 0.76);
            item.actualBaseY = visibleHalfHeight * 0.68;
            item.mesh.visible = true;
          }
        } else {
          // Secondary ambient background sculptures (upper/lower corners)
          if (isMobile) {
            item.mesh.visible = false;
          } else {
            item.mesh.visible = true;
            item.mesh.scale.set(1, 1, 1);
            item.actualBaseX = item.relX * visibleHalfWidth;
            item.actualBaseY = item.relY * visibleHalfHeight;
          }
        }

        item.mesh.position.x = item.actualBaseX;
        item.mesh.position.y = item.actualBaseY;
        item.mesh.position.z = item.baseZ;
      });

      // Update Constellation Line Endpoints for current visible dimensions
      if (!isMobile) {
        constellationLines.visible = true;
        const dist = camera.position.z - (-4);
        const visibleHalfHeight = Math.tan(vFov / 2) * dist;
        const visibleHalfWidth = visibleHalfHeight * camera.aspect;
        const linePts = [];

        for (let i = 0; i < constellationNodeCount; i++) {
          for (let j = i + 1; j < constellationNodeCount; j++) {
            const ptA = new THREE.Vector3(nodeCoords[i].relX * visibleHalfWidth, nodeCoords[i].relY * visibleHalfHeight, nodeCoords[i].z);
            const ptB = new THREE.Vector3(nodeCoords[j].relX * visibleHalfWidth, nodeCoords[j].relY * visibleHalfHeight, nodeCoords[j].z);
            if (ptA.distanceTo(ptB) < 11.5) {
              linePts.push(ptA.x, ptA.y, ptA.z);
              linePts.push(ptB.x, ptB.y, ptB.z);
            }
          }
        }
        lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePts), 3));
        lineGeo.attributes.position.needsUpdate = true;
      } else {
        constellationLines.visible = false;
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout, { passive: true });

    // 11. Mouse & Scroll Interaction Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      targetX = (x - 0.5) * 2;
      targetY = (y - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 12. Real-Time Physics & Animation Render Loop (Using performance.now() - 0 warnings)
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      // Cursor light tracking
      pointLightCursor.position.x = currentX * 16;
      pointLightCursor.position.y = -currentY * 11;

      // Subtle scroll influence
      const scrollRotation = scrollY * 0.0006;
      const scrollDrift = Math.sin(scrollY * 0.0008) * 0.4;

      // Animate all registered 3D sculptures
      animatedObjects.forEach(item => {
        if (!item.mesh.visible) return;
        item.mesh.rotation.x = elapsed * item.rotSpeedX + scrollRotation;
        item.mesh.rotation.y = elapsed * item.rotSpeedY;
        if (item.rotSpeedZ) {
          item.mesh.rotation.z = elapsed * item.rotSpeedZ;
        }
        item.mesh.position.y = (item.actualBaseY || 0) + Math.sin(elapsed * item.bobSpeed + item.bobPhase) * item.bobAmp + scrollDrift;
      });

      // Animate inner core of icosahedron in counter-rotation
      core.rotation.y = -elapsed * 0.45;
      core.rotation.z = elapsed * 0.3;

      // Animate Constellation network & particles
      if (constellationLines.visible) {
        constellationLines.rotation.y = elapsed * 0.01 + scrollRotation * 0.3;
      }
      particles.rotation.y = elapsed * 0.012 + scrollRotation * 0.4;
      particles.rotation.x = elapsed * 0.006;

      // Camera parallax tracking
      camera.position.x = currentX * 2.0;
      camera.position.y = -currentY * 1.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLayout);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Geometries & materials disposal
      animatedObjects.forEach(item => {
        if (item.mesh.geometry) item.mesh.geometry.dispose();
      });
      lineGeo.dispose();
      lineMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      indigoMat.dispose();
      cyanMat.dispose();
      violetMat.dispose();
      coreMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      style={{ opacity: 0.98 }}
    />
  );
}
