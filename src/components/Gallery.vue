<template>
  <div class="gallery">
    <div class="gallery-header">
      <h1 class="page-title">Digital Art Gallery</h1>
      <p class="description">Experience art in a virtual exhibition space</p>
    </div>

    <div class="gallery-space">
      <div class="gallery-room">
        <!-- Left Wall -->
        <div class="wall left-wall">
          <div class="artwork artwork-1" @click="openArtwork(0)">
            <img src="/images/key/key_front.jpg" alt="Artwork 1">
            <div class="artwork-frame"></div>
            <div class="artwork-light"></div>
          </div>
          <div class="artwork artwork-2" @click="openArtwork(1)">
            <img src="/images/key/key_45deg.jpg" alt="Artwork 2">
            <div class="artwork-frame"></div>
            <div class="artwork-light"></div>
          </div>
        </div>

        <!-- Center Wall -->
        <div class="wall center-wall">
          <div class="artwork artwork-featured" @click="openArtwork(2)">
            <img src="/images/tufcat/tufcat_main.jpg" alt="Featured Artwork">
            <div class="artwork-frame"></div>
            <div class="artwork-light"></div>
          </div>
        </div>

        <!-- Right Wall -->
        <div class="wall right-wall">
          <div class="artwork artwork-3" @click="openArtwork(3)">
            <img src="/images/key/key_back.jpg" alt="Artwork 3">
            <div class="artwork-frame"></div>
            <div class="artwork-light"></div>
          </div>
          <div class="artwork artwork-4" @click="openArtwork(4)">
            <img src="/images/a744db_e0cf8e9d9a814280a591ab2b87d40774~mv2.avif" alt="Artwork 4">
            <div class="artwork-frame"></div>
            <div class="artwork-light"></div>
          </div>
        </div>

        <!-- Floor -->
        <div class="floor"></div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Transition name="lightbox">
      <div v-if="selectedArtwork !== null" class="lightbox-overlay" @click="closeArtwork">
        <button class="lightbox-close" @click="closeArtwork" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="lightbox-content" @click.stop>
          <img :src="artworks[selectedArtwork].image" :alt="artworks[selectedArtwork].title">
          <div class="artwork-info">
            <h3>{{ artworks[selectedArtwork].title }}</h3>
            <p>{{ artworks[selectedArtwork].description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const selectedArtwork = ref(null);

const artworks = [
  { title: 'KeyZ - Front View', image: '/images/key/key_front.jpg', description: 'Detailed front perspective of the ornate key model' },
  { title: 'KeyZ - Angle View', image: '/images/key/key_45deg.jpg', description: 'Dynamic 45-degree angle showcasing depth and detail' },
  { title: 'TufcaT', image: '/images/tufcat/tufcat_main.jpg', description: 'Featured 3D model with intricate design elements' },
  { title: 'KeyZ - Back View', image: '/images/key/key_back.jpg', description: 'Reverse perspective revealing hidden details' },
  { title: 'Figurine Collection', image: '/images/a744db_e0cf8e9d9a814280a591ab2b87d40774~mv2.avif', description: 'Hand-crafted miniature sculpture' }
];

const openArtwork = (index) => {
  selectedArtwork.value = index;
  document.body.style.overflow = 'hidden';
};

const closeArtwork = () => {
  selectedArtwork.value = null;
  document.body.style.overflow = '';
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' && selectedArtwork.value !== null) {
    closeArtwork();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.gallery {
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a1a1a 0%, #2d2d2d 100%);
  padding-top: 80px;
  overflow-x: hidden;
}

.gallery-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
  color: #ffffff;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.description {
  font-size: 1.1rem;
  opacity: 0.8;
  font-weight: 300;
}

.gallery-space {
  perspective: 1500px;
  padding: 2rem;
  min-height: 70vh;
}

.gallery-room {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(5deg) rotateY(0deg);
  transition: transform 0.5s ease;
}

.wall {
  position: relative;
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  min-height: 400px;
}

.left-wall {
  transform: translateZ(50px) translateX(-100px);
  opacity: 0.9;
}

.center-wall {
  transform: translateZ(100px);
  margin: 2rem 0;
}

.right-wall {
  transform: translateZ(50px) translateX(100px);
  opacity: 0.9;
}

.floor {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, 
    rgba(100, 100, 100, 0.3) 0%,
    rgba(50, 50, 50, 0.5) 50%,
    rgba(20, 20, 20, 0.8) 100%);
  transform: rotateX(85deg) translateY(150px);
  transform-origin: top;
}

.artwork {
  position: relative;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.artwork-1, .artwork-2, .artwork-3, .artwork-4 {
  width: 300px;
  height: 300px;
}

.artwork-featured {
  width: 500px;
  height: 400px;
}

.artwork:hover {
  transform: translateZ(30px) scale(1.05);
}

.artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.artwork-frame {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border: 15px solid #8B7355;
  border-radius: 4px;
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.3),
    0 5px 20px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  z-index: -1;
}

.artwork-light {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 50px;
  background: linear-gradient(to bottom, 
    rgba(255, 248, 220, 0.3) 0%,
    rgba(255, 248, 220, 0.1) 50%,
    transparent 100%);
  pointer-events: none;
  border-radius: 50%;
  filter: blur(10px);
}

.artwork-card:hover .artwork-image img {
  transform: scale(1.05);
}

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.lightbox-close svg {
  width: 24px;
  height: 24px;
  stroke: white;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.artwork-info {
  text-align: center;
  color: white;
}

.artwork-info h3 {
  font-family: var(--font-heading);
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
}

.artwork-info p {
  font-size: 1rem;
  opacity: 0.8;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-content,
.lightbox-leave-active .lightbox-content {
  transition: transform 0.3s ease;
}

.lightbox-enter-from .lightbox-content,
.lightbox-leave-to .lightbox-content {
  transform: scale(0.9);
}

@media (max-width: 1024px) {
  .gallery-room {
    transform: rotateX(0deg) rotateY(0deg);
  }

  .left-wall,
  .center-wall,
  .right-wall {
    transform: none;
    opacity: 1;
  }

  .wall {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .artwork-1, .artwork-2, .artwork-3, .artwork-4 {
    width: 280px;
    height: 280px;
  }

  .artwork-featured {
    width: 400px;
    height: 320px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .gallery-header {
    padding: 2rem 1.5rem 1rem;
  }

  .artwork-1, .artwork-2, .artwork-3, .artwork-4 {
    width: 250px;
    height: 250px;
  }

  .artwork-featured {
    width: 300px;
    height: 240px;
  }

  .artwork-info h3 {
    font-size: 1.5rem;
  }

  .artwork-info p {
    font-size: 0.9rem;
  }
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: var(--card-background);
  border-radius: var(--border-radius);
  max-width: 900px;
  width: 90%;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.modal-content img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  background: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-info {
  padding: 2rem;
}

.modal-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-family: var(--font-heading);
}

.artwork-details {
  margin-top: 1rem;
  color: #666;
  font-style: italic;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all var(--transition-speed) ease;
}

.close-btn:hover {
  background: var(--accent-color);
  color: white;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1rem;
  }

  .hero-section h1 {
    font-size: 2.5rem;
  }

  .artwork-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 2rem;
  }

  .artwork-image img {
    height: 300px;
  }

  .modal {
    padding: 1rem;
  }

  .modal-info {
    padding: 1.5rem;
  }

  .modal-info h2 {
    font-size: 1.5rem;
  }
}
</style>