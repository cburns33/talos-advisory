import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import gsap from 'gsap';
import animationData from '../assets/Full Logo.json';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const animationContainer = useRef(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    anim.addEventListener('complete', () => {
      // Fade out the container using GSAP
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onComplete
      });
    });

    return () => {
      anim.destroy();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F2E9DC', // Match your global bg
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure it's on top of everything
      }}
    >
      <div 
        ref={animationContainer}
        style={{ width: '900px', maxWidth: '90%' }}
      />
    </div>
  );
};

export default LoadingScreen;