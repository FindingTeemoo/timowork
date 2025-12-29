<template>
  <div class="project-2">
    <div class="featured-model">
      <ModelViewer modelPath="/helmet.obj" :scale="0.6" :modelColor="0xF5F5F0" :roughness="0.3" :metalness="0.7" />
    </div>
    <div class="rotating-text-container">
      <div class="rotating-text">
        <span>TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;</span>
        <span>TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;TufcaT&nbsp;&nbsp;&nbsp;🐱&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModelViewer from './ModelViewer.vue';
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
  position: relative;
  overflow: hidden;
  transform: translateY(-60px);
}

.featured-model > * {
  transform: none !important;
  will-change: auto;
}

.rotating-text-container {
  width: 100%;
  overflow: hidden;
  background: var(--background-color);
  padding: 2.5rem 0;
  position: relative;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.rotating-text {
  display: inline-flex;
  white-space: nowrap;
  animation: cylinderRotate 30s linear infinite;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  transform: translateZ(0);
}

.rotating-text span {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-color);
  letter-spacing: 4px;
  text-transform: uppercase;
  display: inline-block;
  padding-right: 0;
  flex-shrink: 0;
  opacity: 0.9;
}

@keyframes cylinderRotate {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
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
}
</style>
