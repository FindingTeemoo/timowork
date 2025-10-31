<template>
  <div class="gallery">
    <div class="gallery-header">
      <h1 class="page-title">Digital Art Gallery</h1>
      <p class="description">Explore a curated collection of digital artworks</p>
    </div>

    <!-- Category Filters -->
    <div class="filter-bar">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectedCategory = category"
        :class="['filter-btn', { active: selectedCategory === category }]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid">
      <div 
        v-for="(artwork, index) in filteredArtworks" 
        :key="artwork.id"
        :class="['artwork-item', `size-${artwork.size}`]"
        @click="openArtwork(getArtworkIndex(artwork))"
      >
        <img :src="artwork.image" :alt="artwork.title">
        <div class="artwork-overlay">
          <div class="artwork-info-preview">
            <h3>{{ artwork.title }}</h3>
            <p class="category-tag">{{ artwork.category }}</p>
          </div>
        </div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';

const selectedArtwork = ref(null);
const selectedCategory = ref('All');

const categories = ['All', 'Abstract', 'Characters', 'Landscapes', 'Surreal', 'Experimental'];

const artworks = [
  // Abstract & Surreal
  { id: 1, title: 'Across', image: '/images/digital-art/across 2.jpg', description: 'Ethereal journey through abstract landscapes', category: 'Abstract', size: 'large' },
  { id: 2, title: 'Branches', image: '/images/digital-art/Branches_ 2.jpg', description: 'Organic patterns and flowing forms', category: 'Abstract', size: 'medium' },
  { id: 3, title: 'The Lake', image: '/images/digital-art/The_Lake 2.jpg', description: 'Serene water reflections', category: 'Landscapes', size: 'large' },
  { id: 4, title: 'Vision', image: '/images/digital-art/Vision 2.jpg', description: 'Kaleidoscopic perspective', category: 'Surreal', size: 'medium' },
  { id: 5, title: 'Sharp', image: '/images/digital-art/Sharp_ 2.jpg', description: 'Dynamic angular compositions', category: 'Abstract', size: 'medium' },
  
  // Characters & Figures
  { id: 6, title: 'Chef', image: '/images/digital-art/Chef.jpg', description: 'Colorful culinary character', category: 'Characters', size: 'medium' },
  { id: 7, title: 'Cry', image: '/images/digital-art/Cry 3.jpg', description: 'Emotional expression study', category: 'Characters', size: 'small' },
  { id: 8, title: 'In The Dark', image: '/images/digital-art/In_The_Dark 2.jpg', description: 'Mysterious shadowed portrait', category: 'Characters', size: 'medium' },
  { id: 9, title: 'Monster', image: '/images/digital-art/Monster_ 2.jpg', description: 'Creature from imagination', category: 'Characters', size: 'large' },
  { id: 10, title: 'Potato', image: '/images/digital-art/Potato 2.jpg', description: 'Whimsical character design', category: 'Characters', size: 'small' },
  { id: 11, title: 'Virus', image: '/images/digital-art/Virus 2.jpg', description: 'Abstract biological forms', category: 'Surreal', size: 'medium' },
  
  // Experimental Series
  { id: 12, title: 'Paint', image: '/images/digital-art/Paint 2.jpg', description: 'Expressive brushwork study', category: 'Experimental', size: 'medium' },
  { id: 13, title: 'Untitled Vision', image: '/images/digital-art/Untitled_Artwork.jpg', description: 'Exploratory digital composition', category: 'Experimental', size: 'large' },
  { id: 14, title: 'Study 10', image: '/images/digital-art/Untitled_Artwork 10.jpg', description: 'Color and form exploration', category: 'Experimental', size: 'medium' },
  { id: 15, title: 'Study 14', image: '/images/digital-art/Untitled_Artwork 14.jpg', description: 'Abstract digital painting', category: 'Abstract', size: 'small' },
  { id: 16, title: 'Study 15', image: '/images/digital-art/Untitled_Artwork 15.jpg', description: 'Organic flowing patterns', category: 'Abstract', size: 'large' },
  { id: 17, title: 'Study 16', image: '/images/digital-art/Untitled_Artwork 16.jpg', description: 'Geometric abstraction', category: 'Abstract', size: 'medium' },
  { id: 18, title: 'Study 17', image: '/images/digital-art/Untitled_Artwork 17.jpg', description: 'Minimalist composition', category: 'Experimental', size: 'small' },
  { id: 19, title: 'Study 21', image: '/images/digital-art/Untitled_Artwork 21.jpg', description: 'Dynamic color play', category: 'Abstract', size: 'medium' },
  { id: 20, title: 'Study 23', image: '/images/digital-art/Untitled_Artwork 23.jpg', description: 'Textured digital landscape', category: 'Landscapes', size: 'large' },
  { id: 21, title: 'Study 33', image: '/images/digital-art/Untitled_Artwork 33.jpg', description: 'Ethereal atmosphere', category: 'Surreal', size: 'medium' },
  { id: 22, title: 'Study 34', image: '/images/digital-art/Untitled_Artwork 34.jpg', description: 'Bold experimental work', category: 'Experimental', size: 'large' },
  { id: 23, title: 'Study 41', image: '/images/digital-art/Untitled_Artwork 41.jpg', description: 'Complex layered composition', category: 'Experimental', size: 'medium' }
];

const filteredArtworks = computed(() => {
  if (selectedCategory.value === 'All') return artworks;
  return artworks.filter(art => art.category === selectedCategory.value);
});

const getArtworkIndex = (artwork) => {
  return artworks.findIndex(art => art.id === artwork.id);
};

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
  background: var(--background-color);
  padding-top: 80px;
  padding-bottom: 4rem;
}

.gallery-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
  color: var(--text-color);
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
  opacity: 0.7;
  font-weight: 300;
}

.filter-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.7rem 1.8rem;
  background: transparent;
  border: 2px solid var(--border-color);
  color: var(--text-color);
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.filter-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--background-color);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
  grid-auto-flow: dense;
}

.artwork-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--card-background);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.artwork-item.size-small {
  grid-row: span 1;
  aspect-ratio: 1;
}

.artwork-item.size-medium {
  grid-row: span 2;
  aspect-ratio: 3/4;
}

.artwork-item.size-large {
  grid-column: span 2;
  grid-row: span 2;
  aspect-ratio: 16/10;
}

.artwork-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.artwork-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.artwork-item:hover img {
  transform: scale(1.08);
}

.artwork-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
}

.artwork-item:hover .artwork-overlay {
  opacity: 1;
}

.artwork-info-preview {
  color: white;
  transform: translateY(10px);
  transition: transform 0.4s ease;
}

.artwork-item:hover .artwork-info-preview {
  transform: translateY(0);
}

.artwork-info-preview h3 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
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

@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    padding: 2rem;
  }

  .artwork-item.size-large {
    grid-column: span 1;
    aspect-ratio: 4/3;
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

  .gallery-grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .artwork-item.size-large {
    grid-row: span 1;
  }

  .filter-bar {
    padding: 1.5rem 1rem;
    gap: 0.8rem;
  }

  .filter-btn {
    padding: 0.6rem 1.4rem;
    font-size: 0.85rem;
  }

  .artwork-info h3 {
    font-size: 1.5rem;
  }

  .artwork-info p {
    font-size: 0.9rem;
  }
  
  .artwork-info-preview h3 {
    font-size: 1.1rem;
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