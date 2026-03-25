import React, { useState, useRef } from 'react';

const CapabilitiesCardGrid = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const isFlipping = useRef({});

  const capabilities = [
    {
      title: "Paid Search",
      desc: "Moving beyond bid adjustments to build account structures that allow bidding algos to learn + scale.",
      color: "var(--color-terracotta)",
      rotate: "-1deg",
      textColor: "#ffffff"
    },
    {
      title: "Analytics & Reporting",
      desc: "Server-side tracking + GTAG-first reporting = clean conversion signals. No more vanity metrics.",
      color: "var(--color-dusk-blue)",
      rotate: "1deg",
      textColor: "#ffffff"
    },
    {
      title: "AI Operations",
      desc: "No \"AI-powered\" buzzwords. Just tools with actual utility, faster & cheaper than your agency can deliver.",
      color: "var(--color-sandy-brown)",
      rotate: "-2deg",
      textColor: "#000"
    },
    {
      title: "CRM Health",
      desc: "Auditing lifecycle stages and setting up Offline Conversion Imports (OCI). Optimize for profit, not just volume.",
      color: "var(--color-tropical-teal)",
      rotate: "2deg",
      textColor: "#000"
    }
  ];

  const handleCardClick = (index, e) => {
    e.stopPropagation();
    
    // Prevent rapid toggling
    if (isFlipping.current[index]) return;
    
    isFlipping.current[index] = true;
    
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    
    // Reset after animation completes
    setTimeout(() => {
      isFlipping.current[index] = false;
    }, 600); // Match the flip animation duration
  };

  return (
    <div className="neo-grid">
      {capabilities.map((cap, i) => (
        <div
          key={i}
          className={`flip-card ${flippedCards[i] ? 'flipped' : ''}`}
          onClick={(e) => handleCardClick(i, e)}
          style={{
            transform: `rotate(${cap.rotate})`,
            '--card-rotation': cap.rotate
          }}
        >
          <div className="flip-card-inner">
            <div
              className="flip-card-front neo-box"
              style={{
                backgroundColor: cap.color,
                color: cap.textColor
              }}
            >
              <h3 style={{ color: cap.textColor }}>{cap.title}</h3>
            </div>
            <div
              className="flip-card-back neo-box"
              style={{
                backgroundColor: cap.color,
                color: cap.textColor
              }}
            >
              <p style={{ color: cap.textColor }}>{cap.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CapabilitiesCardGrid;
