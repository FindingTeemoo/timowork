<template>
  <div class="figurines">
    <div class="search-bar" :class="{ expanded: isSearchExpanded }">
      <button class="search-button" @click="isSearchExpanded = !isSearchExpanded" type="button">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search figurines..."
        class="search-input"
        @focus="isSearchExpanded = true"
      />
    </div>
    
    <div class="content-wrapper">
      <div class="figurines-grid">
        <router-link 
          :to="figurine.link" 
          class="figurine-card"
          v-for="figurine in filteredFigurines" 
          :key="figurine.title"
        >
          <div class="figurine-image">
            <img :src="figurine.image" :alt="figurine.title">
            <div class="card-overlay">
              <span class="view-text">View Project</span>
            </div>
          </div>
          <h3 class="figurine-title">{{ figurine.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const isSearchExpanded = ref(false);

const figurines = [
  {
    title: 'DripMonster',
    image: '/images/drip-monster/IMG_1787.jpg',
    link: '/figurines/drip-monster'
  },
  {
    title: 'Monster Hunter',
    image: '/images/monster-hunter/monster hunter main.jpg',
    link: '/figurines/monster-hunter'
  },
  {
    title: 'One Piece Marine',
    image: '/images/one-piece-marine/IMG_1545.jpg',
    link: '/figurines/one-piece-marine'
  }
];

const filteredFigurines = computed(() => {
  if (!searchQuery.value) return figurines;
  
  const query = searchQuery.value.toLowerCase();
  return figurines.filter(figurine => 
    figurine.title.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.figurines {
  padding: 100px 4rem 4rem;
  min-height: 100vh;
  background-color: var(--background-color);
  overflow-x: hidden;
  position: relative;
}

.search-bar {
  position: absolute;
  top: 100px;
  right: 4rem;
  width: 250px;
  z-index: 10;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

/* Search Bar Styles */
.search-bar {
  position: fixed;
  top: 90px;
  right: 2rem;
  width: 44px;
  height: 44px;
  z-index: 100;
  display: flex;
  align-items: center;
  background: var(--card-background);
  border-radius: 22px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.search-bar.expanded {
  width: 280px;
}

.search-button {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: var(--text-color);
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.search-button:hover .search-icon {
  opacity: 1;
}

.search-input {
  flex: 1;
  padding: 0.6rem 1rem 0.6rem 0.5rem;
  font-size: 0.875rem;
  border: none;
  background: transparent;
  color: var(--text-color);
  outline: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.search-bar.expanded .search-input {
  opacity: 1;
}

.search-input::placeholder {
  color: var(--text-color);
  opacity: 0.5;
}

/* Grid Styles */
.figurines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.figurine-card {
  position: relative;
  text-decoration: none;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.figurine-card:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
  transform: translateY(-8px);
}

.figurine-image {
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: relative;
}

.figurine-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  transition: transform 0.3s ease;
}

.figurine-card:first-child .figurine-image img {
  object-fit: contain;
  object-position: center center;
}

.figurine-card:hover .figurine-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.figurine-card:hover .card-overlay {
  opacity: 1;
}

.view-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.figurine-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: white;
  font-weight: 400;
  margin: 0;
  padding: 1.5rem;
  text-align: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
}

.figurine-card:hover .figurine-title {
  opacity: 1;
}

@media (max-width: 768px) {
  .figurines {
    padding: 100px 2rem 2rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .figurines-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .figurine-title {
    font-size: 1.2rem;
    padding: 1rem;
  }
}
</style>