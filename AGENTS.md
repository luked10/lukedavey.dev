# Repository Guidelines

## Project Overview

This is `desiderium`, a React + Vite personal homepage. The experience is a cinematic, full-screen memory/constellation interface using Tailwind CSS v4 and Motion for React (`motion/react`). Keep changes minimal, atmospheric, and performance-conscious.

## Tech Stack

- React 18
- Vite 6
- Tailwind CSS v4 via `@tailwindcss/vite`
- Motion for React via the `motion` package
- Static assets served from `public/`

## Commands

- `npm run dev` starts the Vite dev server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` previews the production build locally.

Run `npm run build` before handing off meaningful UI or animation changes.

## Project Structure

- `src/App.jsx` renders the full-page app shell.
- `src/main.jsx` mounts React and imports global CSS.
- `src/index.css` contains Tailwind import, theme tokens, base styles, focus states, reduced-motion rules, and responsive overrides.
- `src/data/starNodes.js` stores editable constellation node content and coordinates.
- `src/components/DreamHero.jsx` owns hero/detail transition state and composes the main experience.
- `src/components/FloatingStar.jsx` renders clickable constellation nodes.
- `src/components/ConstellationLines.jsx` renders decorative connector paths.
- `src/components/MemoryTransitionOverlay.jsx` renders the cinematic radial transition flash.
- `src/components/DetailPage.jsx` renders the immersive detail state.
- `src/components/GrainOverlay.jsx` and `src/components/VignetteOverlay.jsx` provide atmosphere overlays.
- `public/ld.webp` is the active homepage/detail background asset.
- `public/dream-bg.webp` and `public/dream-bg-clean.webp` are older background assets.

## Coding Style

- Use functional React components and hooks.
- Keep component files focused; do not cram major UI into `App.jsx`.
- Prefer existing component boundaries before introducing new abstractions.
- Use single quotes in JS/JSX to match the existing code.
- Keep code comments sparse and useful.
- Preserve accessible semantics: interactive constellation nodes must stay real `button` elements with `aria-label`s.
- Respect `prefers-reduced-motion` for animation-heavy changes.

## Visual Direction

- The site should feel cinematic, dreamy, quiet, emotional, and minimal.
- Avoid SaaS/dashboard/portfolio styling, bright neon colors, heavy UI libraries, and loud animations.
- Use warm cream text, soft amber glow, deep navy/black shadows, vignette, and subtle grain.
- Animate primarily with `transform`, `opacity`, and light filter changes.
- Keep text readable over the image and avoid overlap with the subject’s face, headline, CTA, or nav.

## Background Image Notes

The active `ld.webp` image is close to 16:9 and is used with `object-cover`/`object-center` for clean full-bleed framing. If a background feels zoomed, first check whether the source asset aspect ratio matches the viewport before changing image formats.

Keep the blurred backing image layer for softness and edge continuity during transitions.

## Testing And Verification

- Use `npm run build` for the primary verification pass.
- For visual changes, check desktop and mobile viewport behavior in a browser.
- Verify node clicks, transition timing, Back button behavior, keyboard focus states, and reduced-motion behavior when relevant.

## Git And Workspace Notes

- The workspace may contain user or in-progress changes. Do not revert unrelated files.
- Before editing, check `git status --short`.
- Keep generated build output (`dist/`) out of commits unless explicitly requested.
- Avoid adding large or duplicate image assets unless they are required by the UI.
