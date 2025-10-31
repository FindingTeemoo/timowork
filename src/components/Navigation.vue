<template>
  <nav class="navbar" :class="{ 'nav-scrolled': scrolled }">
    <div class="nav-brand">
      <router-link to="/" class="brand-link">
        <span class="brand-text">Light Box</span>
      </router-link>
    </div>
    <div class="nav-toggle" @click="toggleMenu" :class="{ 'active': menuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="nav-links" :class="{ 'active': menuOpen }">
            <router-link to="/" @click="closeMenu" exact-active-class="active">Home</router-link>
      <div class="nav-dropdown" 
           @mouseenter="showDropdown = true" 
           @mouseleave="showDropdown = false"
           @click="toggleDropdown">
        <router-link to="/digital-models" class="nav-link-text" @click="closeMenu">
          Digital Models
          <svg class="dropdown-icon" :class="{ 'rotated': showDropdown }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </router-link>
        <div class="dropdown-menu" :class="{ 'show': showDropdown }">
          <router-link to="/digital-models/key-project" @click="handleDropdownClick" active-class="active">KeyZ</router-link>
          <router-link to="/digital-models/project-2" @click="handleDropdownClick" active-class="active">TufcaT</router-link>
        </div>
      </div>
      <router-link to="/figurines" @click="closeMenu" active-class="active">Figurines</router-link>
      <router-link to="/gallery" @click="closeMenu" active-class="active">Digital Art</router-link>
      <router-link to="/contact" @click="closeMenu" active-class="active">Contact</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);
const menuOpen = ref(false);
const showDropdown = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  padding: 1.2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--nav-bg);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all var(--transition-speed) ease;
  border-bottom: 1px solid var(--border-color);
}

.nav-scrolled {
  padding: 0.8rem 2rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.brand-link {
  text-decoration: none;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-text {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--text-color);
  transition: transform var(--transition-speed) ease;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001;
}

.nav-toggle span {
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transition: all var(--transition-speed) ease;
}

.nav-toggle.active span:first-child {
  transform: translateY(9.5px) rotate(45deg);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:last-child {
  transform: translateY(-9.5px) rotate(-45deg);
}

.nav-links {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-right: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: all var(--transition-speed) ease;
  position: relative;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 0.8rem 0;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width var(--transition-speed) ease;
}

.nav-links a:hover {
  color: var(--text-color);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a.active {
  color: var(--text-color);
}

.nav-links a.active::after {
  width: 100%;
}

.nav-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-link-text {
  color: var(--text-color);
  font-weight: 500;
  transition: all var(--transition-speed) ease;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 0.8rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
}

.nav-link-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width var(--transition-speed) ease;
}

.nav-link-text:hover::after,
.nav-dropdown:hover .nav-link-text::after {
  width: 100%;
}

.nav-dropdown:hover .nav-link-text {
  color: var(--text-color);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.5rem 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all var(--transition-speed) ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 0.8rem 1.5rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all var(--transition-speed) ease;
  font-size: 0.9rem;
  text-transform: none;
  letter-spacing: 1px;
}

.dropdown-menu a::after {
  display: none;
}

.dropdown-menu a:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-color);
  padding-left: 2rem;
}

.dropdown-menu a.active {
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-color);
}

@media (max-width: 1024px) {
  .navbar {
    padding: 1.2rem 2rem;
  }

  .nav-links {
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .navbar {
    padding: 1rem 1.5rem;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 100%;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    transition: right var(--transition-speed) ease;
  }

  .nav-links a {
    font-size: 1.2rem;
    opacity: 0;
    transform: translateX(50px);
  }

  .nav-links.active {
    right: 0;
  }

  .nav-links.active a {
    opacity: 1;
    transform: translateX(0);
    transition: all var(--transition-speed) ease;
  }

  .nav-links.active a:nth-child(1) { transition-delay: 0.1s; }
  .nav-links.active a:nth-child(2) { transition-delay: 0.2s; }
  .nav-links.active a:nth-child(3) { transition-delay: 0.3s; }
  .nav-links.active a:nth-child(4) { transition-delay: 0.4s; }

  .brand-text {
    font-size: 1.5rem;
    letter-spacing: 3px;
  }

  .brand-subtitle {
    font-size: 0.7rem;
    letter-spacing: 2px;
  }

  .nav-dropdown {
    flex-direction: column;
    align-items: center;
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    margin-top: 0.5rem;
  }

  .dropdown-menu a {
    font-size: 1rem;
    padding: 0.8rem 0;
  }

  .dropdown-menu a:hover {
    padding-left: 0;
    background: transparent;
  }
}
</style>