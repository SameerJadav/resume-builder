# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend-only resume builder built with React 19 and Vite 8. No backend server. Features include live preview editing, drag-and-drop section reordering, 5 professional templates, font/color/spacing customization, and ATS-friendly output.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build
- `npm run lint` — ESLint across all files
- `npm run preview` — Preview production build locally

## Architecture

- **Language:** JavaScript (JSX) — no TypeScript
- **Styling:** Vanilla CSS with CSS custom properties (no Tailwind/Bootstrap)
- **React Compiler:** Enabled via `@rolldown/plugin-babel` with `babel-plugin-react-compiler` for automatic memoization — avoid manual `useMemo`/`useCallback`/`React.memo` unless profiling shows a need
- **Entry:** `src/main.jsx` → `src/App.jsx`
- **Global styles:** `src/index.css` (CSS variables, light/dark mode)
- **Component styles:** Co-located CSS files (e.g., `App.css` alongside `App.jsx`)

## Conventions

- ESLint flat config (`eslint.config.js`) with `react-hooks` and `react-refresh` plugins
- ES modules throughout (`"type": "module"` in package.json)
- Keep the app simple and small — every feature must work perfectly; avoid bloat
