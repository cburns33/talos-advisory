import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import GoldenThread from './components/GoldenThread';
import LoadingScreen from './components/LoadingScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// --- Inline Components ---

const TextReveal = ({ children, delay = 0 }) => {
  const el = useRef();
  useGSAP(() => {
    gsap.fromTo(el.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: delay, ease: "power3.out" }
    );
  }, { scope: el });
  return <div ref={el}>{children}</div>;
};

const KineticText = ({ text }) => {
  const textRef = useRef(null);
  useGSAP(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = self.getVelocity() / 300;
          gsap.to(textRef.current, { skewX: skew, overwrite: true, duration: 0.1 });
        }
      }
    });
  }, { scope: textRef });
  return (
    <div style={{ overflow: 'hidden' }}>
      <h2 ref={textRef} style={{ fontSize: '4rem', whiteSpace: 'nowrap', display: 'inline-block', margin: 0 }}>
        {text}
      </h2>
    </div>
  );
};

const ServiceCard = ({ title, value, description }) => {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };
  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="service-card"
    >
      <div 
        className="glow-effect"
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>{value}</h3>
        <h4 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', fontWeight: 600 }}>{title}</h4>
        <p style={{ fontSize: '0.9rem', color: '#ccc', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
};

const CapabilitiesCardGrid = () => {
  const capabilities = [
    { 
      title: "PAID SEARCH", 
      desc: "High-intent capture. Zero waste.", 
      color: "var(--color-terracotta)", 
      rotate: "-1deg",
      textColor: "var(--text)"
    },
    { 
      title: "ANALYTICS", 
      desc: "Truthful data. No black boxes.", 
      color: "var(--color-dusk-blue)", 
      rotate: "1deg",
      textColor: "#ffffff" // Keep white for contrast
    },
    { 
      title: "AI AGENTS", 
      desc: "The Librarian Model. Scale infinite content.", 
      color: "var(--color-sandy-brown)", 
      rotate: "-2deg",
      textColor: "var(--text)"
    },
    { 
      title: "CRM & OPS", 
      desc: "Full-funnel wiring. Lead velocity.", 
      color: "var(--color-tropical-teal)", 
      rotate: "2deg",
      textColor: "var(--text)"
    }
  ];

  return (
    <div className="neo-grid">
      {capabilities.map((cap, i) => (
        <div 
          key={i}
          className="neo-box"
          style={{ 
            backgroundColor: cap.color,
            transform: `rotate(${cap.rotate})`,
            color: cap.textColor
          }}
        >
          <h3 style={{ color: cap.textColor }}>{cap.title}</h3>
          <p style={{ color: cap.textColor }}>{cap.desc}</p>
        </div>
      ))}
    </div>
  );
};

const HorizontalScroll = ({ items }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const cards = gsap.utils.toArray('.horizontal-card', track);
    
    // Calculate total width to scroll
    // We want to scroll until the last card is visible
    const totalWidth = cards.length * 400; // 400px per card approx

    gsap.to(track, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        // snap: 1 / (cards.length - 1), // Optional: snap to cards
        end: "+=4000", // Slower scroll
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="horizontal-scroll-container"
    >
      <div 
        ref={trackRef}
        className="horizontal-track"
      >
        <div style={{ minWidth: '300px' }}>
          <h2 className="text-primary" style={{ lineHeight: 1 }}>THE<br/>TECH<br/>STACK</h2>
          <p style={{ marginTop: '1rem' }}>Tools we master.</p>
        </div>
        {items.map((item, i) => (
          <div 
            key={i} 
            className="horizontal-card"
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.title}</h3>
            <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const rotatingWords = [
  { word: 'Humans', color: 'var(--color-terracotta)' },
  { word: 'Skeptics', color: 'var(--color-dusk-blue)' },
  { word: 'eCommerce', color: 'var(--color-sandy-brown)' },
  { word: 'Innovators', color: 'var(--color-tropical-teal)' },
  { word: 'Disruptors', color: 'var(--color-cool-steel)' },
];

const Headline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState('auto');
  const [isJumping, setIsJumping] = useState(false);
  const itemRefs = useRef([]);

  // Create a seamless loop by duplicating the first item at the end
  const loopedWords = [...rotatingWords, rotatingWords[0]];

  useLayoutEffect(() => {
    if (itemRefs.current.length > 0) {
      const widths = itemRefs.current.map(el => el.scrollWidth);
      const maxWidth = Math.max(...widths);
      setContainerWidth(`${maxWidth}px`);
    }
  }, [loopedWords]);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 2500);
    return () => clearInterval(rotationInterval);
  }, []);

  useEffect(() => {
    // Check if we are at the duplicated last item
    if (currentIndex === loopedWords.length - 1) {
      // After the transition to the duplicate item finishes...
      const jumpTimer = setTimeout(() => {
        // ...disable transitions via the class, and jump back to the start.
        setIsJumping(true);
        setCurrentIndex(0);
      }, 500); // This MUST match the CSS transition duration

      return () => clearTimeout(jumpTimer);
    }

    // If we just jumped, re-enable transitions after a render cycle.
    if (isJumping) {
      const transitionTimer = setTimeout(() => {
        setIsJumping(false);
      }, 50); // A small delay to allow React to render the jump first.

      return () => clearTimeout(transitionTimer);
    }
  }, [currentIndex, isJumping, loopedWords.length]);

  return (
    <div className="headline-section">
      <div className="headline-line">
        Marketing for{" "}
        <div className={`rotating-text-container ${isJumping ? 'no-transition' : ''}`} style={{ width: containerWidth }}>
          {loopedWords.map((item, index) => (
            <span
              key={`${item.word}-${index}`}
              ref={el => (itemRefs.current[index] = el)}
              className="rotating-text-item"
              style={{
                transform: `translateY(${(index - currentIndex) * -100}%)`,
                color: item.color,
              }}
            >
              {item.word}
            </span>
          ))}
        </div>
      </div>
      <div className="headline-line">By a Human.</div>
      <div className="headline-line">With AI.</div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const techStack = [
    { title: "Paid Search", desc: "Google Ads, Microsoft Ads. Automated bidding strategies that actually work." },
    { title: "Analytics", desc: "GA4, Looker, SQL. Truthful data pipelines that reveal the actual ROI." },
    { title: "AI Operations", desc: "OpenAI, Anthropic, Custom Agents. Building the 'Librarian' to scale your content." },
    { title: "CRM / MAP", desc: "Salesforce, HubSpot, Marketo. Connecting the pipes so no lead is left behind." }
  ];

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '400vh' }}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <GoldenThread />
      
      <main style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Hero - Thread Top Right, Content Left */}
        <section className="section-screen" style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
           <div style={{ width: '100%', padding: '0 2rem' }}>
             <Headline />
             <TextReveal delay={0.8}>
               <p style={{ maxWidth: '450px', marginTop: '1.5rem' }}>
                 Talos Advisory finds the signal in the noise. No vanity metrics. No black boxes. Just revenue-driving strategy.
               </p>
             </TextReveal>
           </div>
        </section>

        {/* The Noise - Thread Left, Content Right */}
        <section className="section-screen" style={{ justifyContent: 'flex-end' }}>
          <div style={{ maxWidth: '600px', textAlign: 'right' }}>
            <h2 className="tracking-widest uppercase" style={{ fontSize: '1rem', color: '#aaa', marginBottom: '2rem' }}>The Problem</h2>
            <KineticText text="VANITY METRICS / BLACK BOXES / WASTE" />
            <p style={{ marginTop: '2rem', marginLeft: 'auto', maxWidth: '500px' }}>
              Most agencies hide behind "green" metrics like CTR and Impressions. 
              We don't. If it doesn't drive <span className="text-primary">Revenue</span>, it's just noise.
            </p>
          </div>
        </section>

        {/* The Signal - Capabilities Cards */}
        <section className="section-screen" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1000px' }}>
            <h2 className="text-primary tracking-widest uppercase" style={{ fontSize: '1rem', marginBottom: '3rem', textAlign: 'center' }}>The Capabilities Cards</h2>
            <CapabilitiesCardGrid />
          </div>
        </section>

        {/* Horizontal Scroll - Tech Stack */}
        <HorizontalScroll items={techStack} />

        {/* The Audit - Thread Center, Content Center */}
        <section className="section-centered">
          <h2 style={{ marginBottom: '1rem' }}>THE TALOS AUDIT</h2>
          <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            A comprehensive deep-dive into your Paid Search, Demand Gen, and Tech Ops. 
            We find the signal in your noise.
          </p>
          <button className="btn-primary">
            GET THE TRUTH
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;