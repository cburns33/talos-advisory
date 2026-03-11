import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const GoldenThread = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle Resize and Path Generation
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      setDimensions({ width, height });

      // Generate the base path string (S-curve)
      // We want it to be responsive. 
      // Start Top Center
      // Curve Right
      // Curve Left
      // End Bottom Center
      
      const centerX = width / 2;
      const amplitude = Math.min(width * 0.4, 300); // Smoother S-curve
      const sectionHeight = height / 4;

      // Base points for a smooth S-curve from top-center
      const p0 = { x: centerX, y: 0 };
      const p1 = { x: centerX + amplitude, y: sectionHeight };
      const p2 = { x: centerX - amplitude, y: sectionHeight * 2 };
      const p3 = { x: centerX, y: sectionHeight * 3 }; // End before the absolute bottom for aesthetics

      // Helper to create Bezier curve string
      const generatePathString = (offsetX) => {
        // Apply offset to X coordinates
        const x0 = p0.x + offsetX;
        const x1 = p1.x + offsetX;
        const x2 = p2.x + offsetX;
        const x3 = p3.x + offsetX;
        
        // Control points for a smooth vertical flow
        const y01 = (p0.y + p1.y) / 2;
        const y12 = (p1.y + p2.y) / 2;
        const y23 = (p2.y + p3.y) / 2;

        const cp1 = { x: x0, y: y01 };
        const cp2 = { x: x1, y: y01 };
        // cp3 is implied by S command
        const cp4 = { x: x2, y: y12 };
        // cp5 is implied by S command
        const cp6 = { x: x3, y: y23 };

        // Using C for the first segment and S (smooth curve to) for subsequent ones
        return `M ${x0} ${p0.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${x1} ${p1.y} S ${cp4.x} ${cp4.y}, ${x2} ${p2.y} S ${cp6.x} ${cp6.y}, ${x3} ${p3.y}`;
      };

      // Calculate offsets for parallel lines
      // We want them side-by-side.
      // Path 1 (60px) | Path 2 (40px) | Path 3 (20px)
      // Total bundle width = 60 + 40 + 20 = 120px.
      // Let's center the bundle on the path.
      // Center of bundle is at 60px from left edge of Path 1.
      
      // Offsets relative to CenterX:
      // Path 1 Center: -30px (Left edge at -60, Right at 0) -> Wait, width is 60. Center is at 30.
      // Let's align them left-to-right.
      // Start X relative to "Bundle Start":
      // Path 1 (Width 60): Center at 30.
      // Path 2 (Width 40): Center at 60 + 20 = 80.
      // Path 3 (Width 20): Center at 60 + 40 + 10 = 110.
      
      // Total width = 120.
      // Center of bundle = 60.
      
      // So offsets from Bundle Center:
      // Path 1: 30 - 60 = -30.
      // Path 2: 80 - 60 = +20.
      // Path 3: 110 - 60 = +50.
      
      const offset1 = -30;
      const offset2 = 20;
      const offset3 = 50;

      setPaths([
        { d: generatePathString(offset1), color: "#E07A5F", width: 60 },
        { d: generatePathString(offset2), color: "#3d5a80", width: 40 },
        { d: generatePathString(offset3), color: "#f4a261", width: 20 },
      ]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP Animation
  useGSAP(() => {
    if (paths.length === 0 || !svgRef.current) return;

    const svgPaths = svgRef.current.querySelectorAll('path');
    
    // Reset any previous styles to avoid conflicts during resize
    // But we need to set initial dasharray
    
    svgPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Animate with stagger
    // Path 1, 2, 3
    // Reduced stagger by 75% as requested (0.05 -> 0.0125)
    // Added explicit duration to ensure consistent timing relative to scroll
    tl.to(svgPaths[0], { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
      .to(svgPaths[1], { strokeDashoffset: 0, ease: "none", duration: 1 }, 0.0125)
      .to(svgPaths[2], { strokeDashoffset: 0, ease: "none", duration: 1 }, 0.025);

  }, { scope: containerRef, dependencies: [paths] }); // Re-run when paths change

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%" 
        // No viewBox, we use pixel coordinates directly
        style={{ overflow: 'visible' }}
      >
        {paths.map((p, i) => (
          <path 
            key={i}
            d={p.d} 
            stroke={p.color} 
            strokeWidth={p.width} 
            fill="none" 
            strokeLinecap="round"
            // No vector-effect needed since we are in pixels
          />
        ))}
      </svg>
    </div>
  );
};

export default GoldenThread;
