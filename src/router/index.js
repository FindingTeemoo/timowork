import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Explore from '../components/Explore.vue'
import DigitalModels from '../components/DigitalModels.vue'
import KeyProject from '../components/KeyProject.vue'
import Project2 from '../components/Project2.vue'
import DinoProject from '../components/DinoProject.vue'
import Figurines from '../components/Figurines.vue'
import DripMonster from '../components/DripMonster.vue'
import OnePieceMarine from '../components/OnePieceMarine.vue'
import MonsterHunter from '../components/MonsterHunter.vue'
import Gallery from '../components/Gallery.vue'
import Contact from '../components/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/digital-models',
    name: 'DigitalModels',
    component: DigitalModels
  },
  {
    path: '/digital-models/key-project',
    name: 'KeyProject',
    component: KeyProject
  },
  {
    path: '/digital-models/project-2',
    name: 'Project2',
    component: Project2
  },
  {
    path: '/digital-models/dino-project',
    name: 'DinoProject',
    component: DinoProject
  },
  {
    path: '/figurines',
    name: 'Figurines',
    component: Figurines
  },
  {
    path: '/figurines/drip-monster',
    name: 'DripMonster',
    component: DripMonster
  },
  {
    path: '/figurines/one-piece-marine',
    name: 'OnePieceMarine',
    component: OnePieceMarine
  },
  {
    path: '/figurines/monster-hunter',
    name: 'MonsterHunter',
    component: MonsterHunter
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router