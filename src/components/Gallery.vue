<template>
  <div class="gallery">
    <div class="hero-section">
      <h1>WELCOME</h1>
      <p class="subtitle">LIGHTBOX - a place where I showcase some of my art!</p>
      <p class="description">Discover my collection of Digital art, 3D models and figurines</p>
      <div class="hero-button">
        <router-link to="/gallery" class="explore-btn">Explore</router-link>
      </div>
    </div>
    
    <div class="filter-section">
      <button 
        v-for="category in categories" 
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
        class="filter-btn"
      >
        {{ category }}
      </button>
    </div>

    <div class="artwork-grid">
      <div 
        v-for="artwork in filteredArtworks" 
        :key="artwork.id" 
        class="artwork-card"
        @click="openArtwork(artwork)"
      >
        <div class="artwork-image">
          <img :src="artwork.image" :alt="artwork.title">
        </div>
        <div class="artwork-info">
          <h3>{{ artwork.title }}</h3>
          <p>{{ artwork.description }}</p>
          <span class="category-tag">{{ artwork.category }}</span>
        </div>
      </div>
    </div>

    <!-- Artwork Modal -->
    <div v-if="selectedArtwork" class="modal" @click="closeArtwork">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeArtwork">&times;</button>
        <img :src="selectedArtwork.image" :alt="selectedArtwork.title">
        <div class="modal-info">
          <h2>{{ selectedArtwork.title }}</h2>
          <p>{{ selectedArtwork.description }}</p>
          <p class="artwork-details">{{ selectedArtwork.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = ['All', 'Digital Art', '3D Models', 'Figurines'];
const selectedCategory = ref('All');
const selectedArtwork = ref(null);

const artworks = [
  {
    id: 1,
    title: 'Key Model - Front View',
    description: 'Detailed 3D Key Model',
    details: 'Front view of the key model showing intricate details and precise modeling',
    image: '/images/key_front.jpg',
    category: '3D Models'
  },
  {
    id: 2,
    title: 'Key Model - Back View',
    description: '3D Key Modeling',
    details: 'Back view showcasing the detailed geometry and texturing',
    image: '/images/key_back.jpg',
    category: '3D Models'
  },
  {
    id: 3,
    title: 'Key Model - Side View',
    description: 'Side Profile',
    details: 'Side perspective highlighting the key\'s profile and dimensions',
    image: '/images/key_leftside.jpg',
    category: '3D Models'
  },
  {
    id: 4,
    title: 'Key Model - 45° View',
    description: 'Angled Perspective',
    details: 'Diagonal view showing the key\'s three-dimensional form',
    image: '/images/key_45deg.jpg',
    category: '3D Models'
  },
  {
    id: 5,
    title: 'Key - Bottom Detail',
    description: 'Bottom Perspective',
    details: 'Detailed view of the key\'s bottom section',
    image: '/images/key-bot.jpg',
    category: '3D Models'
  },
  {
    id: 6,
    title: 'Key in Black',
    description: 'Alternative Render',
    details: 'Black material variation showing form and shadows',
    image: '/images/key-black.jpg',
    category: '3D Models'
  },
  {
    id: 7,
    title: 'Key Mold - First Half',
    description: 'Manufacturing Process',
    details: 'First half of the key mold design for production',
    image: '/images/key mould.jpg',
    category: '3D Models'
  },
  {
    id: 8,
    title: 'Key Mold - Second Half',
    description: 'Manufacturing Process',
    details: 'Second half of the key mold completing the production design',
    image: '/images/key mould_secondhalf.jpg',
    category: '3D Models'
  }
];

const filteredArtworks = computed(() => {
  if (selectedCategory.value === 'All') return artworks;
  return artworks.filter(artwork => artwork.category === selectedCategory.value);
});

const openArtwork = (artwork) => {
  selectedArtwork.value = artwork;
  document.body.style.overflow = 'hidden';
};

const closeArtwork = () => {
  selectedArtwork.value = null;
  document.body.style.overflow = 'auto';
};
</script>

<style scoped>
.gallery {
  padding-top: 6rem;
}

.hero-section {
  text-align: center;
  padding: 12rem 2rem;
  background: var(--background-color);
  color: white;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 90vh;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, var(--accent-color) 0%, transparent 70%);
  opacity: 0.1;
  animation: pulse 4s infinite;
}

.hero-section h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.3s forwards;
  font-family: var(--font-heading);
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.6s forwards;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.explore-btn {
  display: inline-block;
  padding: 1rem 3rem;
  background: var(--accent-color);
  color: var(--background-color);
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all var(--transition-speed) ease;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.9s forwards;
}

.explore-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.filter-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 0 1rem;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--accent-color);
  background: transparent;
  color: var(--accent-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--accent-color);
  color: white;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.artwork-card {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  background: var(--card-background);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-speed) ease;
  cursor: pointer;
}

.artwork-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.artwork-image {
  position: relative;
  overflow: hidden;
}

.artwork-image img {
  width: 100%;
  height: 400px;
  object-fit: contain;
  background: var(--card-background);
  padding: 1rem;
  transition: transform var(--transition-speed) ease;
}

.artwork-card:hover .artwork-image img {
  transform: scale(1.05);
}

.artwork-info {
  padding: 1.5rem;
  background: var(--card-background);
}

.artwork-info h3 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-family: var(--font-heading);
}

.artwork-info p {
  color: #666;
  margin-bottom: 1rem;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 1rem;
  background: var(--accent-color);
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
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