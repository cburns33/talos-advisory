# Handoff Document: Talos Advisory Landing Page

**Date:** 2026-01-30
**Project:** Talos Advisory Brand Engine & Landing Page
**Framework:** React (Vite) + GSAP + Tailwind/CSS
**Status:** In Development

---

## 1. Project Goal
Build a "Minimalist Technical" landing page for Talos Advisory that features a continuous "Golden Thread" animation—a scroll-linked SVG ribbon that guides the user through the narrative ("The Noise" vs "The Signal").

## 2. Current Implementation Status

### A. The Golden Thread (`src/components/GoldenThread.jsx`)
*   **Status:** Functional & Responsive.
*   **Logic:** Uses 3 parallel SVG paths (60px, 40px, 20px) with pixel-based Bezier curves calculated on window resize.
*   **Animation:** GSAP `ScrollTrigger` scrubs the `strokeDashoffset` to "draw" the line as you scroll.
*   **Alignment:** Starts Top-Right (Hero), curves Left (Problem), curves Right (Solution), centers (Audit).

### B. Brand Engine Narrative (`src/App.jsx`)
*   **Status:** Implemented (latest version saved).
*   **Sections:**
    1.  **Hero:** "Marketing for Humans" (Text Reveal). Thread at Top-Right.
    2.  **The Noise:** "Vanity Metrics" (Kinetic Text). Thread swings Left.
    3.  **The Signal:** "Capabilities Cards" (Neo-Brutalist Grid). Thread swings Right.
    4.  **Tech Stack:** Horizontal Scroll section.
    5.  **The Audit:** Call to Action. Thread Centers.

### C. Components
*   `TextReveal`: Staggered entry animation.
*   `KineticText`: Velocity-based skew effect.
*   `ServiceCard`: Glassmorphism with mouse-tracking radial glow.
*   `HorizontalScroll`: Pins the section and scrolls content sideways.

### D. Documentation (`documentation/feature-explanation.md`)
*   Contains the **Framer Code Component** versions of all the above features so they can be ported to the Framer design tool if needed.

---

## 3. Environment & Setup
*   **Root:** `c:\Users\chase\OneDrive\Documents\Talos Advisory\landing-page`
*   **Run Dev Server:** `npm run dev -- --host`
*   **Local URL:** `http://localhost:5173`
*   **Network URL:** `http://192.168.1.197:5173` (Use this for mobile testing).

---

## 4. Immediate Next Steps for New Agent
1.  **Verify Mobile Alignment:** Check the "Golden Thread" path against the text content on mobile. The path coordinates in `GoldenThread.jsx` might need tweaking (`p1`, `p2` y-values) if the text reflows significantly on small screens.
2.  **Framer Porting:** If the user wants to move to Framer, use the code in `documentation/feature-explanation.md`.
3.  **Refine Design:** The "Horizontal Scroll" section is functional but basic. It needs styling to match the "Minimalist Technical" aesthetic (e.g., adding the Golden Thread to this section too, or subtle grid backgrounds).

## 5. Important Files
*   [App.jsx](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/App.jsx) - Main layout and narrative structure.
*   [GoldenThread.jsx](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/components/GoldenThread.jsx) - The core SVG animation logic.
*   [feature-explanation.md](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/documentation/feature-explanation.md) - Framer code reference.
