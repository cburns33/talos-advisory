# Hero + Mobile Alignment Work Handoff (Talos Advisory)

This file summarizes the changes made to stabilize the **Hero section alignment** across desktop and mobile, with a focus on **simplicity** and **site speed** (minimal JS, mostly CSS + small JSX structure changes).

## Goal
- Keep the hero headline as a **strict 3-line layout** across all screen sizes:
  - `Marketing for [ROTATING WORD]`
  - `By a Human.`
  - `With AI.`
- Make the hero CTA behave predictably and remain readable:
  - Desktop: CTA sits to the **right** of the headline.
  - Mobile: CTA **stacks below** the headline and is **right-aligned** (Option 1).
  - CTA text should be visually centered and not become excessively tall.
- Fix mobile issues with the rotating word:
  - Prevent truncation/ghost letters.
  - Improve baseline alignment with surrounding text.

## Summary of structural approach
### Hero layout (single layout model)
Previously, the CTA used absolute positioning at some breakpoints, which is fragile when the layout reflows.

We changed the hero to a single layout model:
- `.hero-inner` is a **CSS grid**.
- Desktop: 2 columns (`1fr auto`)
- Mobile/tablet (<= 1024px): 1 column with headline left-aligned and CTA right-aligned.

This reduces alignment bugs caused by mixing absolute positioning with responsive stacking.

### Headline line-breaking
Previously, the headline was relying on `flex-wrap` / natural wrapping, which made it hard to guarantee the exact line structure.

We changed the `Headline` JSX to render explicit lines so the copy always appears as exactly 3 lines.

### Rotating word stability
The rotating word display relies on a masked container (`overflow: hidden`) and a `translateY` list.

We adjusted styles to keep the rotating word container as `inline-block` with a stable width and a predictable mask so it doesn’t show leftover characters.

We also adjusted baseline alignment between the primary headline font and the rotating word font.

## Files changed
### `src/App.jsx`
- Updated `Headline` component markup to enforce strict 3-line output.
- Updated Hero section markup:
  - Hero now renders a `.hero-inner.container` wrapper around `Headline` + CTA.
  - CTA is no longer absolutely positioned; it participates in the grid.

### `src/App.css`
Key changes:
- Added `.hero-inner` grid layout.
- Removed old absolute positioning behavior from `.hero-cta-button`.
- Implemented **Option 1** stacking behavior:
  - Desktop: 2-column
  - <= 1024px: 1-column, headline left (`justify-self: start`), CTA right (`justify-self: end`)
- CTA readability constraints:
  - CTA uses flex centering for text (`display: flex; align-items/justify-content: center; text-align: center`)
  - Constrained width to reduce overly tall/square behavior (`max-width: min(14ch, 100%)`)
- Rotating word baseline alignment:
  - `.rotating-text-container` uses `vertical-align` tweak to align with “Marketing for”.
- Headline section nesting fix:
  - Removed inner `max-width/margins/padding` from `.headline-section` so it doesn’t fight the outer `.container`.

### `src/index.css`
- Removed conflicting Vite starter defaults from `:root`:
  - `color-scheme: light dark`
  - default text color
  - default background color
This prevents cross-browser/mobile differences where base styles fight `App.css`.

## Current behavior (expected)
- Desktop:
  - Headline left, CTA right.
  - Rotating word sits visually on the same baseline as “Marketing for”.
- Mobile/tablet:
  - Headline remains left.
  - CTA stacks below and is right-aligned.
  - Rotating word no longer switches to `display: inline` (which previously broke masking).

## Notes / follow-ups
- If CTA still becomes too tall on extremely narrow widths, options:
  - Shorten CTA copy.
  - Reduce padding/font-size at very small breakpoints.
  - Allow CTA to become full-width (but that departs from Option 1).
- If the rotating word baseline still needs micro-tuning, adjust:
  - `.rotating-text-container { vertical-align: ... }`

## Dev environment
- `npm install` was run successfully on this machine.
- Start dev server:
  - `npm run dev -- --host`
