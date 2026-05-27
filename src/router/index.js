import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MediaView from '@/views/MediaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/stained-glass',
    name: 'stained-glass',
    component: MediaView,
    props: { category: 'stained-glass' }
  },
  {
    path: '/paintings',
    name: 'paintings',
    component: MediaView,
    props: { category: 'paintings' }
  },
  {
    path: '/other-media',
    name: 'other-media',
    component: MediaView,
    props: { category: 'other-media' }
  },
  // Catch-all: redirect unknown routes to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})
