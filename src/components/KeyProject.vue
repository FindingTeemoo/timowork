<template>
  <div class="key-project">
    <div class="featured-model">
      <ModelViewer modelPath="/key%20v32.obj" />
    </div>
    <div class="rotating-text-container">
      <div class="rotating-text">
        <span>This is a 3D Model of a Retro Key • This is a 3D Model of a Retro Key • This is a 3D Model of a Retro Key • </span>
      </div>
    </div>
    <div class="content-wrapper">
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
    title: 'Front View',
    image: '/images/key/key_front.jpg?v=20251027151602'
  },
  {
    title: 'Side Angle',
    image: '/images/key/key_45deg.jpg?v=20251027151602'
  },
  {
    title: 'Back View',
    image: '/images/key/key_back.jpg?v=20251027151602'
  }
];
</script>

<style scoped>
.key-project {
  min-height: 100vh;
  background-color: var(--background-color);
}

.featured-model {
  width: 100%;
  height: 60vh;
  background-color: transparent;
  margin-top: 80px;
}

.rotating-text-container {
  width: 100%;
  overflow: hidden;
  background: var(--background-color);
  padding: 2rem 0;
  position: relative;
}

.rotating-text {
  display: flex;
  white-space: nowrap;
  animation: cylinderRotate 20s linear infinite;
}

.rotating-text span {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-color);
  letter-spacing: 3px;
  text-transform: uppercase;
  display: inline-block;
}

@keyframes cylinderRotate {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
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
