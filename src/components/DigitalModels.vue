<template>
  <div class="digital-models">
    <div class="search-bar">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search projects..."
        class="search-input"
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
            <img :src="project.image" :alt="project.title">
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
  position: absolute;
  top: 100px;
  right: 5rem;
  width: 250px;
  z-index: 10;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--text-color);
  opacity: 0.5;
}

.search-input {
  width: 100%;
  padding: 0.6rem 0.75rem 0.6rem 2.25rem;
  font-size: 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: var(--card-background);
  color: var(--text-color);
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--border-color);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
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
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--card-background);
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1);
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
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--text-color);
  font-weight: 300;
  letter-spacing: 1px;
  margin: 2rem 0 2rem;
  padding: 0 2rem;
  transition: color 0.3s ease;
}

.project-card:hover .project-title {
  color: var(--text-color);
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