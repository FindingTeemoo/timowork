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
    description: 'A detailed 3D model showcasing intricate design and craftsmanship',
    image: '/images/tufcat/tufcat_main.png',
    link: '/digital-models/project-2'
  },
  {
    title: 'Dino',
    description: 'A detailed 3D dinosaur model',
    image: '/images/dino/dino_placeholder.jpg',
    link: '/digital-models/dino-project'
  }
];
</script>

<style scoped>
.digital-models {
  padding: 140px 5rem 6rem;
  min-height: 100vh;
  background-color: var(--background-color);
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
}

.page-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  font-weight: 300;
  letter-spacing: 2px;
}

.description {
  max-width: 700px;
  margin: 0 auto 5rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-color);
  opacity: 0.7;
  font-weight: 300;
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
  color: var(--accent-color);
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