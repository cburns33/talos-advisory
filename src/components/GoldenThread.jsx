import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GoldenThread = () => {
  const svgRef = useRef(null);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const pageHeight = document.body.scrollHeight;

      // Start from the upper-right, aligned with the headline area
      const p0 = { x: width * 0.98, y: height * 0.2 };
      // First curve towards the left
      const p1 = { x: width * 0.3, y: pageHeight * 0.4 };
      // Second curve back towards the right
      const p2 = { x: width * 0.7, y: pageHeight * 0.7 };
      // Final point towards the bottom center
      const p3 = { x: width * 0.5, y: pageHeight * 0.95 };

      const generatePathString = (offsetX) => {
        const p_0 = { x: p0.x + offsetX, y: p0.y };
        const p_1 = { x: p1.x + offsetX, y: p1.y };
        const p_2 = { x: p2.x + offsetX, y: p2.y };
        const p_3 = { x: p3.x + offsetX, y: p3.y };

        // Control points for p0 -> p1 (Horizontal Curve)
        const cp1 = { x: (p_0.x + p_1.x) / 2, y: p_0.y };
        const cp2 = { x: (p_0.x + p_1.x) / 2, y: p_1.y };

        // Control points for p1 -> p2 (Smooth transition)
        const cp3 = { x: 2 * p_1.x - cp2.x, y: 2 * p_1.y - cp2.y };
        const cp4 = { x: (p_1.x + p_2.x) / 2, y: p_2.y };

        // Control points for p2 -> p3 (Smooth transition)
        const cp5 = { x: 2 * p_2.x - cp4.x, y: 2 * p_2.y - cp4.y };
        const cp6 = { x: (p_2.x + p_3.x) / 2, y: p_3.y };

        return `M ${p_0.x} ${p_0.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p_1.x} ${p_1.y} C ${cp3.x} ${cp3.y}, ${cp4.x} ${cp4.y}, ${p_2.x} ${p_2.y} C ${cp5.x} ${cp5.y}, ${cp6.x} ${cp6.y}, ${p_3.x} ${p_3.y}`;
      };

      // Responsive offsets
      const primaryOffset = width > 768 ? -30 : -20;
      const secondaryOffset = width > 768 ? 20 : 15;
      const tertiaryOffset = width > 768 ? 50 : 35;

      setPaths([
        { d: generatePathString(primaryOffset), color: 'var(--color-terracotta)', width: 60 },
        { d: generatePathString(secondaryOffset), color: 'var(--color-dusk-blue)', width: 40 },
        { d: generatePathString(tertiaryOffset), color: 'var(--color-sandy-brown)', width: 20 },
      ]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // GSAP Animation Setup
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    // This needs to wait for paths to be in the DOM
    // We select them directly here once they are rendered.
    const svgPaths = svgRef.current.querySelectorAll('path');
    if (svgPaths.length > 0) {
      svgPaths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      });

      animation.to(svgPaths, {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: 0.02, // Simple stagger
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [paths.length]); // Re-run if the number of paths changes (initially from 0 to 3)

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0, // Above background, below content
      }}
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={p.color}
          strokeWidth={p.width}
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

export default GoldenThread;
