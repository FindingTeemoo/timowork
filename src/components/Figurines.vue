<template>
  <div class="figurines">
    <div class="content-wrapper">
      <h1 class="page-title">Figurines</h1>
      <p class="description">Explore my collection of handcrafted figurines. Each piece is carefully designed and created with attention to detail, bringing unique characters to life through physical form.</p>
      <p class="instruction">(CLICK THE IMAGES TO EXPLORE MORE)</p>
      
      <div class="figurines-grid">
        <div class="figurine-card" v-for="figurine in figurines" :key="figurine.title">
          <div class="figurine-image">
            <img :src="figurine.image" :alt="figurine.title">
          </div>
          <h3 class="figurine-title">{{ figurine.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const figurines = [
  {
    title: 'Key Mold',
    image: '/images/key mould.jpg'
  },
  {
    title: 'Key Project',
    image: '/images/key mould_secondhalf.jpg'
  }
];
</script>

<style scoped>
.figurines {
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

.figurines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  padding: 2rem 0;
}

.figurine-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.figurine-card:hover {
  transform: translateY(-10px);
}

.figurine-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  margin-bottom: 1rem;
}

.figurine-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.figurine-card:hover .figurine-image img {
  transform: scale(1.05);
}

.figurine-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--text-color);
  font-weight: 400;
  margin: 0;
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
    gap: 2rem;
  }
}
</style>