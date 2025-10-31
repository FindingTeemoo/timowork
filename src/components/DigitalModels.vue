<template>
  <div class="digital-models">
    <div class="content-wrapper">
      <h1 class="page-title">Digital Models</h1>
      <p class="description">Welcome to my gallery of unique digital models. Each model tells a unique story, inviting you to immerse yourself in the world of digital artistry. Browse through my collection of 3D projects.</p>
      
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
          <p class="project-description">{{ project.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    title: 'KeyZ',
    description: 'Interactive 3D model of an ornate vintage key with detailed craftsmanship',
    image: '/images/key/key_front.jpg',
    link: '/digital-models/key-project'
  },
  {
    title: 'TufcaT',
    description: 'Character modeling project featuring detailed design',
    image: '/images/key/key_45deg.jpg',
    link: '/digital-models/project-2'
  }
];
</script>

<style scoped>
.digital-models {
  padding: 120px 4rem 4rem;
  min-height: 100vh;
  background-color: var(--background-color);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
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
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.8;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  padding: 2rem 0;
}

.project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
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

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project {
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.project-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: var(--text-color);
  font-weight: 400;
  margin: 1.5rem 1rem 0.5rem;
  padding: 0 1rem;
}

.project-description {
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0 1rem 1.5rem;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .digital-models {
    padding: 100px 1rem 2rem;
  }

  .page-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 0.95rem;
    margin-bottom: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 0.9rem;
  }
}
</style>