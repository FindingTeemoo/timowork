<template>
  <button 
    class="theme-switcher" 
    @click="toggleTheme" 
    :title="isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <span v-if="isDarkTheme" class="icon">🌞</span>
    <span v-else class="icon">🌙</span>
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isDarkTheme = ref(false);

const setThemeColors = (isDark) => {
  const root = document.documentElement;
  const theme = isDark ? 'dark' : 'light';
  
  const colors = [
    'primary-color',
    'accent-color',
    'text-color',
    'background-color',
    'card-background',
    'nav-bg',
    'border-color',
    'text-secondary'
  ];

  colors.forEach(color => {
    root.style.setProperty(`--${color}`, `var(--${color}-${theme})`);
  });

  // Store theme preference
  localStorage.setItem('theme', theme);
};

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
};

watch(isDarkTheme, (newValue) => {
  setThemeColors(newValue);
});

onMounted(() => {
  // Check saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark';
  } else {
    isDarkTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  setThemeColors(isDarkTheme.value);
});
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--card-background);
  border: 2px solid var(--accent-color);
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed) ease;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.theme-switcher:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .theme-switcher {
    bottom: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .icon {
    font-size: 1.2rem;
  }
}
</style>