<template>
  <div class="project-2">
    <div class="featured-model">
      <ModelViewer modelPath="/helmet.obj" :scale="0.7" />
    </div>
    <div class="content-wrapper">
      <h1 class="page-title">TufcaT</h1>
      <p class="description">A detailed 3D model showcasing intricate design and craftsmanship. Rotate and explore the model from all angles.</p>
      <p class="instruction">(CLICK AND DRAG TO ROTATE)</p>
      
      <div class="models-grid">
        <div class="model-card" v-for="model in models" :key="model.title">
          <div class="model-image">
            <img :src="model.image" :alt="model.title">
          </div>
          <h3 class="model-title">{{ model.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModelViewer from './ModelViewer.vue';

const models = [
  {
    title: 'View 1',
    image: '/images/placeholder1.jpg'
  },
  {
    title: 'View 2',
    image: '/images/placeholder2.jpg'
  },
  {
    title: 'View 3',
    image: '/images/placeholder3.jpg'
  }
];
</script>

<style scoped>
.project-2 {
  min-height: 100vh;
  background-color: var(--background-color);
}

.featured-model {
  width: 100%;
  height: 60vh;
  background-color: transparent;
  margin-top: 80px;
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
}

.model-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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

@media (max-width: 768px) {
  .featured-model {
    height: 50vh;
    margin-top: 70px;
  }

  .content-wrapper {
    padding: 2rem 1rem;
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
