# Light Box Portfolio (Vue 3 + Vite)

Single-page portfolio site for digital art, figurines, and interactive 3D models.

## Tech stack
- Vue 3
- Vue Router 4
- Vite
- Three.js (OBJ + OrbitControls)

## Local development
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## App structure
- Route definitions live in `src/router/index.js`.
- Page components live in `src/components/*`.
- Global shell is `src/App.vue` (top navigation + `<router-view>`).
- Global styles and theme variables are in `src/style.css`.

## 3D model pipeline
- Cached loader utility: `src/utils/modelCache.js`
- Viewer component: `src/components/ModelViewer.vue`
- Model pages:
	- `src/components/KeyProject.vue`
	- `src/components/Project2.vue`
	- `src/components/DinoProject.vue`
- Preload entry points:
	- `src/main.js`
	- `src/components/Home.vue`

Keep OBJ model paths URL-encoded when filenames include spaces (example: `/key%20v32.obj`).

## Deployment
Configured for Netlify via `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect: `/* -> /index.html`

## AI agent guidance
Repository-specific instructions for coding agents are in `.github/copilot-instructions.md`.
