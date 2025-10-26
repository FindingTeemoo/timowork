<template>
  <div class="about">
    <div class="about-header">
      <h1>About the Artist</h1>
      <div class="artist-quote">"Art is the expression of the soul through visual poetry"</div>
    </div>

    <div class="about-content">
      <div class="artist-image-container">
        <img src="https://placehold.co/600x800" alt="Artist profile" class="artist-image">
        <div class="image-overlay"></div>
      </div>

      <div class="artist-info">
        <div class="info-section">
          <h2>Welcome to LIGHTBOX</h2>
          <p>
            LIGHTBOX is a digital art gallery showcasing my collection of innovative digital artworks,
            detailed 3D models, and meticulously crafted figurines. Each piece represents a unique
            exploration of form, light, and creativity in the digital space.
          </p>
          <p>
            Through my work, I aim to bridge the gap between digital and physical art forms,
            creating pieces that challenge perception and inspire imagination.
          </p>
        </div>

        <div class="info-section">
          <h3>Creative Vision</h3>
          <p>
            My work focuses on the interplay between light and shadow in digital environments,
            creating immersive experiences that blur the lines between reality and digital art.
            Each piece is carefully crafted to capture the essence of modern digital artistry.
          </p>
        </div>

        <div class="exhibitions-section">
          <h3>Recent Exhibitions</h3>
          <div class="timeline">
            <div class="timeline-item" v-for="exhibition in exhibitions" :key="exhibition.year">
              <div class="year">{{ exhibition.year }}</div>
              <div class="details">
                <h4>{{ exhibition.title }}</h4>
                <p>{{ exhibition.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const exhibitions = [
  {
    year: '2025',
    title: 'Digital Art Collection',
    location: 'LIGHTBOX Gallery'
  },
  {
    year: '2024',
    title: '3D Models Exhibition',
    location: 'Virtual Art Space'
  },
  {
    year: '2023',
    title: 'Figurine Showcase',
    location: 'Lightbox Studio'
  }
];
</script>

<style scoped>
.about {
  padding-top: 6rem;
}

.about-header {
  text-align: center;
  padding: 8rem 2rem;
  background: var(--background-color);
  color: white;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;
}

.about-header::before {
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

.about-header h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.artist-quote {
  font-size: 1.2rem;
  font-style: italic;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.3s forwards;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.artist-image-container {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.artist-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--border-radius);
  transition: transform var(--transition-speed) ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 100%);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.artist-image-container:hover .artist-image {
  transform: scale(1.05);
}

.artist-image-container:hover .image-overlay {
  opacity: 1;
}

.artist-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.info-section h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-family: var(--font-heading);
}

.info-section h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-family: var(--font-heading);
}

.info-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 1rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 2rem;
  position: relative;
  padding-left: 2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent-color);
  opacity: 0.3;
}

.timeline-item::after {
  content: '';
  position: absolute;
  left: -4px;
  top: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-color);
}

.year {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-color);
}

.details h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.details p {
  color: #666;
}

@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .artist-image-container {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .about-header {
    padding: 3rem 1rem;
  }

  .about-header h1 {
    font-size: 2.5rem;
  }

  .about-content {
    padding: 0 1rem;
  }

  .info-section h2 {
    font-size: 2rem;
  }

  .info-section h3 {
    font-size: 1.6rem;
  }

  .timeline-item {
    grid-template-columns: 70px 1fr;
    gap: 1rem;
  }
}
</style>