<template>
  <div class="explore">
    <div class="explore-header">
      <h1 class="page-title">Explore My Work</h1>
      <p class="description">Discover a curated collection of my creative projects</p>
    </div>
    
    <div class="categories-container">
      <router-link 
        :to="category.link" 
        class="category-panel"
        :class="`category-${index + 1}`"
        v-for="(category, index) in categories" 
        :key="category.title"
      >
        <div class="panel-background">
          <img :src="category.image" :alt="category.title" class="panel-image">
          <div class="panel-overlay"></div>
        </div>
        <div class="panel-content">
          <h2 class="category-title">{{ category.title }}</h2>
          <p class="category-description">{{ category.description }}</p>
          <span class="explore-arrow">→</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Select random images from each category
const digitalModelImages = ['/images/key/key_front.jpg', '/images/key/key_45deg.jpg', '/images/key/key_back.jpg'];
const figurineImages = ['/images/a744db_e0cf8e9d9a814280a591ab2b87d40774~mv2.avif'];
const digitalArtImages = ['/images/tufcat/tufcat_main.jpg'];

const getRandomImage = (images) => images[Math.floor(Math.random() * images.length)];

const categories = [
  {
    title: 'Digital Models',
    description: 'Intricate 3D models crafted with precision and detail',
    link: '/digital-models',
    image: getRandomImage(digitalModelImages)
  },
  {
    title: 'Figurines',
    description: 'Hand-crafted miniature sculptures and collectibles',
    link: '/figurines',
    image: getRandomImage(figurineImages)
  },
  {
    title: 'Digital Art',
    description: 'Creative digital artworks and illustrations',
    link: '/gallery',
    image: getRandomImage(digitalArtImages)
  }
];
</script>

<style scoped>
.explore {
  min-height: 100vh;
  background-color: var(--background-color);
  padding-top: 80px;
}

.explore-header {
  text-align: center;
  padding: 4rem 2rem 3rem;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.description {
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.7;
  font-weight: 300;
}

.categories-container {
  display: flex;
  gap: 0;
  padding: 0;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 600px;
}

.category-panel {
  flex: 1;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}

.category-panel:last-child {
  border-right: none;
}

.category-panel:hover {
  flex: 1.5;
}

.panel-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.6s ease;
}

.panel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.8s ease;
}

.category-panel:hover .panel-image {
  transform: scale(1.05);
}

.panel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1px);
  transition: all 0.6s ease;
}

.category-panel:hover .panel-overlay {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(0px);
}

.panel-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 3rem;
  opacity: 0.9;
  transition: all 0.5s ease;
  transform: translateY(20px);
}

.category-panel:hover .panel-content {
  opacity: 1;
  transform: translateY(0);
}

.category-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
  transition: all 0.4s ease;
}

.category-panel:hover .category-title {
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.9);
}

.category-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  max-width: 250px;
  margin: 0 auto 1.5rem;
  transition: all 0.5s ease 0.1s;
  transform: translateY(10px);
}

.category-panel:hover .category-description {
  opacity: 1;
  transform: translateY(0);
}

.explore-arrow {
  display: inline-block;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: all 0.5s ease 0.2s;
  transform: translateX(-20px);
}

.category-panel:hover .explore-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Specific panel colors */
.category-1 .category-title,
.category-1 .category-description,
.category-1 .explore-arrow {
  color: #c2185b;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
}

.category-2 .category-title,
.category-2 .category-description,
.category-2 .explore-arrow {
  color: #e65100;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
}

.category-3 .category-title,
.category-3 .category-description,
.category-3 .explore-arrow {
  color: #00838f;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
}

@media (max-width: 1024px) {
  .categories-container {
    flex-direction: column;
    gap: 0;
  }

  .category-panel {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    min-height: 400px;
  }

  .category-panel:last-child {
    border-bottom: none;
  }

  .category-panel:hover {
    flex: 1;
  }

  .category-title {
    font-size: 2rem;
  }

  .category-panel:hover .category-title {
    font-size: 2.3rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .explore-header {
    padding: 3rem 1.5rem 2rem;
  }

  .category-panel {
    min-height: 350px;
  }

  .panel-content {
    padding: 2rem;
  }

  .category-title {
    font-size: 1.8rem;
  }

  .category-panel:hover .category-title {
    font-size: 2rem;
  }

  .category-description {
    font-size: 0.9rem;
  }
}
</style>
