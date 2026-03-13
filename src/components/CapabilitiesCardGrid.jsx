import React from 'react';

const CapabilitiesCardGrid = () => {
  const capabilities = [
    {
      title: "PAID SEARCH",
      desc: "High-intent capture. Zero waste.",
      color: "var(--color-terracotta)",
      rotate: "-1deg",
      textColor: "var(--text-color, #000)" // Fallback color
    },
    {
      title: "ANALYTICS",
      desc: "Truthful data. No black boxes.",
      color: "var(--color-dusk-blue)",
      rotate: "1deg",
      textColor: "#ffffff"
    },
    {
      title: "AI AGENTS",
      desc: "The Librarian Model. Scale infinite content.",
      color: "var(--color-sandy-brown)",
      rotate: "-2deg",
      textColor: "var(--text-color, #000)"
    },
    {
      title: "CRM & OPS",
      desc: "Full-funnel wiring. Lead velocity.",
      color: "var(--color-teal)",
      rotate: "2deg",
      textColor: "var(--text-color, #000)"
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

export default CapabilitiesCardGrid;
