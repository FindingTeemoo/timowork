<template>
  <div class="explore">
    <div class="buttons-container">
      <router-link to="/digital-models" class="category-button">
        <span>Digital Models</span>
      </router-link>
      <router-link to="/figurines" class="category-button">
        <span>Figurines</span>
      </router-link>
      <router-link to="/gallery" class="category-button">
        <span>Digital Art</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.explore {
  min-height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 2rem 2rem;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.category-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  padding: 1.5rem 3rem;
  background: var(--card-background);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-button span {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--text-color);
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.category-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--text-color);
}

@media (max-width: 768px) {
  .category-button {
    width: 250px;
    padding: 1.2rem 2rem;
  }

  .category-button span {
    font-size: 1.2rem;
  }
}
</style>
