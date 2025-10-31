<template>
  <div class="home">
    <nav class="top-nav">
      <div class="logo">Light Box</div>
      <div class="nav-links">
        <router-link to="/gallery">Figurines</router-link>
        <router-link to="/gallery">Digital Models</router-link>
      </div>
    </nav>
    
    <div class="hero-section">
      <div class="hero-content">
        <h1>WELCOME</h1>
        <p class="subtitle">LIGHTBOX - a place where I showcase some of my art!</p>
        <p class="description">Discover my collection of Digital art, 3D models and figurines.</p>
        <div class="hero-button">
          <router-link to="/explore" class="explore-btn">Explore</router-link>
        </div>
      </div>
      <div class="hero-image" 
           @mouseenter="isPaused = true" 
           @mouseleave="isPaused = false"
           @click="isPaused = !isPaused"
           :class="{ 'paused': isPaused }">
        <img src="/images/a744db_e0cf8e9d9a814280a591ab2b87d40774~mv2.avif" alt="Hero Image">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isPaused = ref(false);
import { modelCache } from '../utils/modelCache.js';

const categories = [
  {
    title: '3D Models',
    description: 'Explore my detailed 3D modeling work',
    image: '/images/key_front.jpg',
    link: '/gallery'
  },
  {
    title: 'Key Project',
    description: 'View the complete key modeling process',
    image: '/images/key-black.jpg',
    link: '/gallery'
  },
  {
    title: 'Manufacturing',
    description: 'See the mold design process',
    image: '/images/key mould.jpg',
    link: '/gallery'
  }
];

// Preload 3D model for instant display on Digital Models page
onMounted(async () => {
  console.log('Starting 3D model preload...');
  try {
    await Promise.all([
      modelCache.preload('/key%20v32.obj'),
      modelCache.preload('/helmet.obj')
    ]);
    console.log('All models preloaded successfully!');
  } catch (error) {
    console.error('Error preloading models:', error);
  }
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: var(--background-color);
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--text-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  font-family: var(--font-heading);
  transition: color var(--transition-speed) ease;
}

.nav-links a:hover {
  color: var(--accent-color);
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  padding: 80px 4rem 0;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-right: 2rem;
}

.hero-section h1 {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
  color: var(--text-color);
  animation: fadeIn 0.8s ease-out 0.2s forwards;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  color: var(--text-color);
  animation: fadeIn 0.8s ease-out 0.3s forwards;
}

.description {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  animation: fadeIn 0.8s ease-out 0.6s forwards;
  opacity: 0.8;
}

.explore-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: #000000;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  transition: all var(--transition-speed) ease;
  animation: fadeIn 0.8s ease-out 0.9s forwards;
}

.explore-btn:hover {
  background: #333333;
}

.hero-image {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  cursor: pointer;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.hero-image.paused img {
  animation-play-state: paused !important;
  transform: scale(1) !important;
}

.hero-image:hover img {
  animation-play-state: paused !important;
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    padding: 0 2rem;
  }

  .hero-content {
    padding-right: 0;
    padding-top: 6rem;
    text-align: center;
    align-items: center;
  }

  .hero-image {
    order: -1;
    height: calc(50vh - 40px);
    margin-top: 60px;
  }

  .hero-image img {
    height: 100%;
  }

  .top-nav {
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
  }
}

@media (max-width: 768px) {
  .top-nav {
    padding: 1rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .hero-section h1 {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .description {
    font-size: 0.9rem;
  }
}
</style>