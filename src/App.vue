<script setup>
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="app">
    <Navigation />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all var(--transition-speed) ease;
}

main {
  width: 100%;
  padding-top: var(--spacing-unit);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 768px) {
  .app {
    padding-top: 60px;
  }
}
</style>
