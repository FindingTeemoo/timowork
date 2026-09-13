# Copilot instructions for this codebase

Last validated: 2026-09-12

## Sync policy for AI agents
- This file is the canonical AI guidance for this repository.
- If other agent docs are added later (`AGENTS.md`, `CLAUDE.md`, cursor/windsurf rules), keep them aligned with this file in the same PR.
- `README.md` contains developer-facing setup details and should not conflict with architecture notes here.

## Project overview
- This is a Vue 3 + Vite single-page portfolio site (no backend service layer).
- Routing is the app structure: each page is a component in `src/components`, wired in `src/router/index.js`.
- `src/App.vue` renders global navigation plus `<router-view>`; page-level behavior lives in route components.

## Core architecture and data flow
- Static assets are served from `public/images/**` and root-level model files (for example `/key%20v32.obj`, `/helmet.obj`).
- 3D rendering flow:
  1. `src/main.js` preloads known OBJ models via `modelCache.preload(...)`.
  2. Detail pages (`KeyProject.vue`, `Project2.vue`, `DinoProject.vue`) pass `modelPath` + material props into `ModelViewer`.
  3. `src/components/ModelViewer.vue` loads/clones models from `src/utils/modelCache.js`, applies materials, and renders with Three.js + `OrbitControls`.
- `modelCache` stores loaded objects and returns clones, so callers should treat returned models as disposable scene instances.

## Developer workflows
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Local production preview: `npm run preview`
- Deployment target is Netlify (`netlify.toml`): build command is `npm run build`, publish directory is `dist`, SPA redirect rewrites `/*` to `/index.html`.
- There are currently no test/lint scripts in `package.json`; validate changes by running the app and checking affected routes manually.

## Project-specific conventions
- Most components use `<script setup>`; `ModelViewer.vue` uses Options API + `setup()` for complex Three.js lifecycle management.
- When adding a new page, update **all** navigation surfaces that expose it:
  - Route table in `src/router/index.js`
  - Cards/links in listing pages (`DigitalModels.vue`, `Figurines.vue`, `Explore.vue`, `Navigation.vue`)
- Image-protection pattern is intentional: keep `@contextmenu.prevent` and `@dragstart.prevent` on gallery/featured images.
- Lightbox pages follow a repeated pattern: `lightboxOpen`/index refs, `document.body.style.overflow` lock, and `keydown` listener cleanup in `onUnmounted`.
- Search pages (`DigitalModels.vue`, `Figurines.vue`) use local arrays + computed client filtering; no remote data source.
- The global visual system is CSS variable based in `src/style.css` (`--background-color`, `--text-color`, etc.); prefer variables over hard-coded colors in new themed UI.

## Integration details and gotchas
- Three.js integration depends on `three/examples/jsm/...` imports and Vite optimization settings in `vite.config.js`.
- Keep model URLs URL-encoded where needed (spaces become `%20`) to match existing public asset naming.
- If you add a new 3D model route, consider preloading it in both `src/main.js` and `Home.vue` to preserve the current “instant open” behavior.
- `Home.vue` currently preloads two models (`/key%20v32.obj`, `/helmet.obj`) while `main.js` preloads three (adds `/dino%20v22.obj`); maintain both lists together when expanding model pages.