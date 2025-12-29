<template>
  <div class="figurines">
    <div class="content-wrapper">
      <h1 class="page-title">Figurines</h1>
      <p class="description">Explore my collection of handcrafted figurines. Each piece is carefully designed and created with attention to detail, bringing unique characters to life through physical form.</p>
      <p class="instruction">(DRAG TO ROTATE • CLICK TO VIEW)</p>
      
      <div class="carousel-container" 
           @mousedown="startDrag" 
           @mousemove="drag" 
           @mouseup="stopDrag" 
           @mouseleave="stopDrag"
           @touchstart="startDrag"
           @touchmove="drag"
           @touchend="stopDrag">
        <div class="carousel" :style="{ transform: `rotateY(${rotation}deg)` }">
          <router-link 
            v-for="(figurine, index) in figurines" 
            :key="figurine.title"
            :to="figurine.link"
            class="figurine-card"
            :style="getCardStyle(index)">
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
      
      <div class="carousel-controls">
        <button @click="rotateLeft" class="control-btn" aria-label="Rotate Left">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button @click="rotateRight" class="control-btn" aria-label="Rotate Right">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const figurines = [
  {
    title: 'DripMonster',
    image: '/images/drip-monster/IMG_1787.jpg',
    link: '/figurines/drip-monster'
  },
  {
    title: 'Monster Hunter',
    image: '/images/key mould.jpg',
    link: '/figurines/monster-hunter'
  },
  {
    title: 'KeyZ',
    image: '/images/key mould_secondhalf.jpg',
    link: '/figurines/keyz'
  },
  {
    title: 'One Piece Marine',
    image: '/images/key mould.jpg',
    link: '/figurines/one-piece-marine'
  }
];

const rotation = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startRotation = ref(0);

const anglePerCard = 360 / figurines.length;

const getCardStyle = (index) => {
  const angle = anglePerCard * index;
  return {
    transform: `rotateY(${angle}deg) translateZ(400px)`
  };
};

const startDrag = (e) => {
  isDragging.value = true;
  startX.value = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  startRotation.value = rotation.value;
};

const drag = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const diff = currentX - startX.value;
  rotation.value = startRotation.value + diff * 0.5;
};

const stopDrag = () => {
  if (isDragging.value) {
    // Calculate swipe direction and snap to next/previous card
    const diff = rotation.value - startRotation.value;
    const threshold = anglePerCard / 3; // Swipe threshold
    
    if (Math.abs(diff) > threshold) {
      // Swipe detected - move one card in the direction of swipe
      const direction = diff > 0 ? 1 : -1;
      const currentCardIndex = Math.round(startRotation.value / anglePerCard);
      rotation.value = (currentCardIndex + direction) * anglePerCard;
    } else {
      // No swipe - return to original position
      rotation.value = startRotation.value;
    }
  }
  isDragging.value = false;
};

const rotateLeft = () => {
  rotation.value -= anglePerCard;
};

const rotateRight = () => {
  rotation.value += anglePerCard;
};
</script>

<style scoped>
.figurines {
  padding: 120px 4rem 4rem;
  min-height: 100vh;
  background-color: var(--background-color);
  overflow-x: hidden;
}

.content-wrapper {
  max-width: 1400px;
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

.carousel-container {
  perspective: 1200px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0;
  cursor: grab;
  user-select: none;
}

.carousel-container:active {
  cursor: grabbing;
}

.carousel {
  position: relative;
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.figurine-card {
  position: absolute;
  width: 300px;
  height: 400px;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: var(--card-background);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  backface-visibility: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.figurine-card:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
  transform: scale(1.05);
}

.figurine-image {
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
}

.figurine-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--text-color);
  font-weight: 400;
  margin: 0;
  padding: 1.5rem;
  text-align: center;
}

.carousel-controls {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

.control-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--card-background);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-btn:hover {
  background: var(--text-color);
  border-color: var(--text-color);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.control-btn svg {
  width: 24px;
  height: 24px;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.control-btn:hover svg {
  color: var(--background-color);
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

  .carousel-container {
    height: 500px;
    perspective: 800px;
  }

  .carousel {
    width: 250px;
    height: 350px;
  }

  .figurine-card {
    width: 250px;
    height: 350px;
  }

  .figurine-image {
    height: 270px;
  }

  .figurine-title {
    font-size: 1.2rem;
    padding: 1rem;
  }

  .control-btn {
    width: 50px;
    height: 50px;
  }

  .control-btn svg {
    width: 20px;
    height: 20px;
  }
}
</style>