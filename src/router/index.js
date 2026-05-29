import { createRouter, createWebHistory } from 'vue-router'
import TemporaryLandingView from '@/views/TemporaryLandingView.vue'
import HomeView from '@/views/HomeView.vue'
import MediaView from '@/views/MediaView.vue'
import { SITE_LIVE } from '@/config.js'

const routes = [
  {
    path: '/',
    name: 'home',
    // To launch the full site: set SITE_LIVE = true in src/config.js
    component: SITE_LIVE ? HomeView : TemporaryLandingView
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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// Handle GitHub Pages 404 redirect.
// When a user lands on e.g. ilzeapine.com/paintings directly,
// GitHub Pages serves 404.html which stores the path and redirects to /.
// Here we pick that path up and navigate to it via Vue Router.
router.beforeEach((to) => {
  const redirectPath = sessionStorage.getItem('redirectPath')
  if (redirectPath) {
    sessionStorage.removeItem('redirectPath')
    if (redirectPath !== to.fullPath) {
      return redirectPath
    }
  }
})

export default router
