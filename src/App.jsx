import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import GoldenThread from './components/GoldenThread';
import LoadingScreen from './components/LoadingScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './components/ClientLogos.css';
import './App.css';

import CapabilitiesCardGrid from './components/CapabilitiesCardGrid';

import ifsLogo from './assets/IFS_logo.svg';
import jblLogo from './assets/JBL_logo.svg';
import kasasaLogo from './assets/Kasasa_logo.svg';
import retailmenotLogo from './assets/RetailMeNot_logo.svg';
import tricorbraunLogo from './assets/Tricorbraun_logo.svg';
import offersComLogo from './assets/offers-com_logo.svg';

gsap.registerPlugin(ScrollTrigger);

// --- Inline Components ---

const TextReveal = ({ children, delay = 0 }) => {
  const el = useRef();
  useGSAP(() => {
    gsap.fromTo(el.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: delay, ease: "power3.out" }
    );
  });
  return <div ref={el}>{children}</div>;
};

// This array is defined outside the component to prevent it from being recreated on every render.
const words = [
  { text: 'Humans.', color: 'var(--color-terracotta)' },
  { text: 'Skeptics.', color: 'var(--color-sandy-brown)' },
  { text: 'eCommerce.', color: 'var(--color-dusk-blue)' },
  { text: 'Innovators.', color: 'var(--color-tropical-teal)' },
  { text: 'Disruptors.', color: 'var(--color-cool-steel)' },
];

const Headline = () => {
  const TRANSITION_MS = 500;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;

        if (nextIndex === words.length) {
          // After animating to the clone, jump back to the start without a transition
          setTimeout(() => {
            setIsJumping(true); // Disable transition
            setCurrentIndex(0); // Jump to the real first item

            // Re-enable transition after the jump has been rendered
            setTimeout(() => {
              setIsJumping(false);
            }, 50);
          }, TRANSITION_MS); // This duration MUST match the CSS transition time
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []); // Dependency array is empty as `words` is a stable constant

  return (
    <div className="headline-section">
      <h1 className="headline-line">
        Marketing for&nbsp;
        <span className="rotating-text-container">
          <span
            className={`rotating-text-list`}
            style={{
              transition: isJumping ? 'none' : `transform ${TRANSITION_MS}ms ease-in-out`,
              transform: `translateY(-${currentIndex * 1.2}em)`
            }}
          >
            {words.map((word) => (
              <span key={word.text} className="rotating-text-item" style={{ color: word.color }}>
                {word.text}
              </span>
            ))}
            {/* Cloned first element to create the seamless loop illusion */}
            <span key="clone" className="rotating-text-item" style={{ color: words[0].color }}>
              {words[0].text}
            </span>
          </span>
        </span>
      </h1>
      <div className="headline-line">By a Human.</div>
      <div className="headline-line">With AI.</div>
    </div>
  );
};

const ClientLogos = () => {
  const logos = [
    { src: ifsLogo, alt: 'IFS' },
    { src: jblLogo, alt: 'JBL' },
    { src: kasasaLogo, alt: 'Kasasa' },
    { src: retailmenotLogo, alt: 'RetailMeNot' },
    { src: tricorbraunLogo, alt: 'TricorBraun' },
    { src: offersComLogo, alt: 'Offers.com' },
  ];

  return (
    <section className="client-logos-section">
      <h2 className="client-logos-title">Brands I've Helped Build</h2>
      <div className="logos-container">
        {logos.map((logo, index) => (
          <img key={index} src={logo.src} alt={logo.alt} className="client-logo" />
        ))}
      </div>
    </section>
  );
};

const ProblemSection = () => (
    <section className="page-section text-center">
        <div className="container">
            <h2 className="section-title">You're Flying Blind</h2>
            <p className="section-subtitle">You have the data. You have the dashboards. But you don't have clarity. You're making decisions on gut-feel, wasting budget, and missing opportunities.</p>
        </div>
    </section>
);

const ProcessSection = () => (
    <section className="page-section">
        <div className="container text-center">
            <h2 className="section-title">The Process</h2>
            <div className="process-steps">
                <div className="process-step">
                    <h3>1. The Audit</h3>
                    <p>A comprehensive deep-dive into your Paid Search, Demand Gen, and Tech Ops. We find the signal in your noise.</p>
                </div>
                <div className="process-step">
                    <h3>2. The Blueprint</h3>
                    <p>We deliver a clear, actionable plan to fix the leaks, scale the winners, and build a predictable growth engine.</p>
                </div>
                <div className="process-step">
                    <h3>3. The Execution</h3>
                    <p>We partner with your team to implement the blueprint, providing hands-on support and training along the way.</p>
                </div>
            </div>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="page-section text-center final-cta">
        <div className="container">
            <h2 className="section-title">Stop Guessing. Start Growing.</h2>
            <p className="section-subtitle">Let's find the signal in your noise. Get the truth about what's working, what's not, and what to do next.</p>
            <button className="btn-primary">
                GET THE TRUTH
            </button>
        </div>
    </section>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainContentRef = useRef();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useGSAP(() => {
    if (!isLoading) {
      // Animate in the main content after loading
      gsap.fromTo(mainContentRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: 'power2.inOut' }
      );
    }

    // Toggle body scroll
    if (isLoading) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('loading');
    };
  }, { dependencies: [isLoading] });

  return (
    <div className="App">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <GoldenThread />
      
      <div ref={mainContentRef} style={{ position: 'relative', zIndex: 1, opacity: isLoading ? 0 : 1 }}>
        <main>
        
          {/* Hero Section */}
          <section className="section-screen" style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
            <div style={{ width: '100%', padding: '0 2rem' }}>
              <Headline />
            </div>
          </section>

          {/* Social Proof */}
          <ClientLogos />

          {/* The Problem */}
          <ProblemSection />

          {/* The Solution */}
          <section className="page-section">
            <div className="container">
                <CapabilitiesCardGrid />
            </div>
          </section>

          {/* The Process */}
          <ProcessSection />

          {/* Final CTA */}
          <FinalCTA />

        </main>
        </div>
    </div>
  );
}

export default App;