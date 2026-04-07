<template>
  <div class="digital-models">
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
        placeholder="Search projects..."
        class="search-input"
        @focus="isSearchExpanded = true"
      />
    </div>
    
    <div class="content-wrapper">
      <div class="projects-grid">
        <router-link 
          :to="project.link" 
          class="project-card"
          v-for="project in projects" 
          :key="project.title"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" @contextmenu.prevent @dragstart.prevent>
            <div class="image-watermark"></div>
            <div class="project-overlay">
              <span class="view-project">View Project</span>
            </div>
          </div>
          <h3 class="project-title">{{ project.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const isSearchExpanded = ref(false);

const allProjects = [
  {
    title: 'KeyZ',
    description: 'Interactive 3D model of an ornate vintage key with detailed craftsmanship',
    image: '/images/key/KeyZ.jpg',
    link: '/digital-models/key-project'
  },
  {
    title: 'TufcaT',
    description: 'A detailed 3D model showcasing intricate design and craftsmanship',
    image: '/images/tufcat/Tufcat.jpg',
    link: '/digital-models/project-2'
  },
  {
    title: 'Dino',
    description: 'A detailed 3D dinosaur model',
    image: '/images/dino/Dino.jpg',
    link: '/digital-models/dino-project'
  }
];

const projects = computed(() => {
  if (!searchQuery.value) return allProjects;
  
  const query = searchQuery.value.toLowerCase();
  return allProjects.filter(project => 
    project.title.toLowerCase().includes(query) ||
    project.description.toLowerCase().includes(query)
  );
});
</script>

<style scoped>
.digital-models {
  padding: 100px 5rem 6rem;
  min-height: 100vh;
  background-color: var(--background-color);
  position: relative;
}

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

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 4rem;
  padding: 2rem 0;
}

.project-card {
  position: relative;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  background: #ffffff;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1);
}

.image-watermark {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
}

.image-watermark::after {
  content: 'Light Box';
  font-family: var(--font-heading);
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.12);
  letter-spacing: 6px;
  transform: rotate(-30deg);
  white-space: nowrap;
  text-transform: uppercase;
  user-select: none;
  pointer-events: none;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(2px);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project {
  color: white;
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 3px;
  transform: translateY(10px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .view-project {
  transform: translateY(0);
}

.project-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: var(--font-heading);
  font-size: 2rem;
  color: white;
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
}

.project-card:hover .project-title {
  opacity: 1;
}

.project-description {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 1rem 1.5rem;
  padding: 0 1rem;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .digital-models {
    padding: 120px 1.5rem 3rem;
  }

  .page-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 0.95rem;
    margin-bottom: 3rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .project-title {
    font-size: 1.6rem;
    margin: 1.5rem 0 1.5rem;
  }
}
</style>