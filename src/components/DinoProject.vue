<template>
  <div class="dino-project">
    <div class="featured-model">
      <ModelViewer modelPath="/dino%20v22.obj" />
    </div>
    <div class="rotating-text-container">
      <div class="rotating-text">
        <span>Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;</span>
        <span>Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;Dino&nbsp;&nbsp;&nbsp;🦖&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="models-grid">
        <div class="model-card" v-for="(model, index) in models" :key="model.title">
          <div class="model-image" @click="openLightbox(index)">
            <img :src="model.image" :alt="model.title">
            <div class="image-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
          <h3 class="model-title">{{ model.title }}</h3>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Transition name="lightbox">
      <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button class="lightbox-nav lightbox-prev" @click.stop="prevImage" v-if="models.length > 1" aria-label="Previous">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="lightbox-nav lightbox-next" @click.stop="nextImage" v-if="models.length > 1" aria-label="Next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div class="lightbox-content" @click.stop>
          <img :src="models[currentImageIndex].image" :alt="models[currentImageIndex].title">
          <p class="lightbox-caption">{{ models[currentImageIndex].title }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ModelViewer from './ModelViewer.vue';

const models = [
  {
    title: 'Dino Model',
    image: '/images/dino/dino_placeholder.jpg'
  }
];

const lightboxOpen = ref(false);
const currentImageIndex = ref(0);

const openLightbox = (index) => {
  currentImageIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = '';
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % models.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + models.length) % models.length;
};

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
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
.dino-project {
  min-height: 100vh;
  background-color: var(--background-color);
}

.featured-model {
  width: 100%;
  height: 60vh;
  background-color: transparent;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
}

.featured-model > * {
  transform: none !important;
  will-change: auto;
}

.rotating-text-container {
  width: 100%;
  overflow: hidden;
  background: var(--background-color);
  padding: 2.5rem 0;
  position: relative;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.rotating-text {
  display: inline-flex;
  white-space: nowrap;
  animation: cylinderRotate 30s linear infinite;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  transform: translateZ(0);
}

.rotating-text span {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-color);
  letter-spacing: 4px;
  text-transform: uppercase;
  display: inline-block;
  padding-right: 0;
  flex-shrink: 0;
  opacity: 0.9;
}

@keyframes cylinderRotate {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 4rem 4rem;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-weight: 400;
}

.description {
  max-width: 800px;
  margin: 0 auto 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.8;
}

.instruction {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.6;
  margin-bottom: 3rem;
  letter-spacing: 1px;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  padding: 2rem 0;
}

.model-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.model-card:hover {
  transform: translateY(-10px);
}

.model-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
}

.model-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-overlay svg {
  width: 48px;
  height: 48px;
  color: white;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.model-image:hover .image-overlay {
  opacity: 1;
}

.model-image:hover .image-overlay svg {
  transform: scale(1);
}

.model-card:hover .model-image img {
  transform: scale(1.05);
}

.model-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--text-color);
  font-weight: 400;
  margin: 0;
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
  z-index: 9999;
  cursor: zoom-out;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.lightbox-caption {
  color: white;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  font-family: var(--font-heading);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10000;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.lightbox-close svg {
  width: 24px;
  height: 24px;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 10000;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.lightbox-nav svg {
  width: 28px;
  height: 28px;
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

/* Lightbox Transitions */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-active .lightbox-content,
.lightbox-leave-active .lightbox-content {
  transition: transform 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-from .lightbox-content {
  transform: scale(0.9);
}

.lightbox-leave-to .lightbox-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .featured-model {
    height: 50vh;
    margin-top: 70px;
  }

  .rotating-text-container {
    padding: 1.5rem 0;
  }

  .rotating-text span {
    font-size: 1rem;
    letter-spacing: 2px;
  }

  .content-wrapper {
    padding: 2rem 1rem;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }

  .lightbox-close svg {
    width: 20px;
    height: 20px;
  }

  .lightbox-nav {
    width: 44px;
    height: 44px;
  }

  .lightbox-nav svg {
    width: 22px;
    height: 22px;
  }

  .lightbox-prev {
    left: 1rem;
  }

  .lightbox-next {
    right: 1rem;
  }

  .lightbox-caption {
    font-size: 1rem;
    margin-top: 1rem;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .instruction {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .models-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    padding: 1rem 0;
  }

  .model-image {
    margin-bottom: 0.5rem;
  }

  .model-title {
    font-size: 1rem;
  }
}
</style>
