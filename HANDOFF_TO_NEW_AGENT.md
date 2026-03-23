# Handoff Document: Talos Advisory Landing Page

**Date:** 2026-03-23
**Project:** Talos Advisory Landing Page
**Framework:** React 18 (Vite) + GSAP + Custom CSS (OKLCH)
**Status:** In Development

---

## 1. Project Goal
Create a minimalist, technical landing page that converts visitors by showcasing expertise and client work. The focus is on business impact (Revenue, MQLs) over vanity metrics, with a brand tone that is candid, witty, and grounded.

## 2. Current Implementation Status

### A. Headline Section (`src/App.jsx` & `src/App.css`)
*   **Status:** **Recently Fixed & Verified.**
*   **Logic:** A three-line headline with a "slot machine" style rotating word animation.
*   **Implementation:** Uses React state and CSS `translateY` transforms for the animation, with a cloned element to ensure a seamless loop.
*   **Recent Fixes (March 2026):** Resolved complex alignment, spacing, and text-wrapping issues to ensure the headline is perfectly centered and responsive on both desktop and mobile.

### B. The Golden Thread (`src/components/GoldenThread.jsx`)
*   **Status:** Functional but needs fine-tuning.
*   **Logic:** A custom scroll-linked SVG animation with 3 parallel paths that "draws" itself as the user scrolls down the page.
*   **Implementation:** Uses GSAP `ScrollTrigger` to animate the `strokeDashoffset` of SVG `<path>` elements. The path direction has been inverted from the original design.

### C. Capabilities Card Grid (`src/components/CapabilitiesCardGrid.jsx`)
*   **Status:** Design complete, content is placeholder.
*   **Design:** Features a Neo-Brutalist aesthetic with bold borders and hard shadows, using the primary brand colors.

### D. Other Sections
*   **Loading Screen (`src/components/LoadingScreen.jsx`):** A vanilla `lottie-web` animation that plays once on page load.
*   **Client Logos (`src/App.jsx` & `src/components/ClientLogos.css`):** A responsive grid of 6 client logos. **Note:** Contains a minor CSS typo (`justify-items` should be `justify-items`).
*   **Placeholder Content:** The "Problem," "Process," and "Final CTA" sections are currently placeholders with boilerplate text.

---

## 3. Environment & Setup
*   **Repository Root:** `c:\Users\chase\OneDrive\Documents\Talos Advisory\landing-page`
*   **Run Dev Server:** Execute `start-server.bat` (runs `npx vite --host`).
*   **Push to Git:** Execute `push-changes.bat "Your commit message"` to stage, commit, and push all changes to the `main` branch.

---

## 4. Immediate Next Steps
1.  **Fill Out Content:** Replace the placeholder text in the "Problem," "Process," and "Final CTA" sections with final copy.
2.  **Fine-Tune Golden Thread:** Review the `GoldenThread.jsx` animation and adjust its path or timing as needed to perfect the effect.
3.  **Fix CSS Typo:** In `ClientLogos.css`, correct `justify-items` and `align-items` to `justify-items` and `align-items`.
4.  **Mobile Responsiveness QA:** Continue testing all sections across a range of mobile device sizes to catch any layout issues.

## 5. Important Files
*   [App.jsx](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/App.jsx) - Main layout and structure, contains the `Headline` component.
*   [App.css](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/App.css) - Contains all global styles and the specific styles for the headline animation.
*   [GoldenThread.jsx](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/components/GoldenThread.jsx) - The core SVG animation logic.
*   [CapabilitiesCardGrid.jsx](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/components/CapabilitiesCardGrid.jsx) - The Neo-Brutalist card grid component.
*   [ClientLogos.css](file:///c:/Users/chase/OneDrive/Documents/Talos Advisory/landing-page/src/components/ClientLogos.css) - Styling for the client logos (contains the typo).
