import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { modelCache } from './utils/modelCache.js'

// Preload all 3D models
const modelsToPreload = [
  '/dino%20v22.obj',
  '/key%20v32.obj',
  '/helmet.obj'
];

// Start preloading models immediately
Promise.all(modelsToPreload.map(url => modelCache.preload(url)))
  .then(() => console.log('All 3D models preloaded'))
  .catch(err => console.error('Error preloading models:', err));

const app = createApp(App)
app.use(router)
app.mount('#app')
