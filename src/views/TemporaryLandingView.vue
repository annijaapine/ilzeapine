<template>
  <div class="temp-landing">

    <!-- Corner labels -->
    <div class="corner-text top-left">art</div>
    <div class="corner-text top-right">portfolio</div>

    <!-- ── DESKTOP: hero with parallax floating images ── -->
    <template v-if="!isMobile">
      <MediaHero :category="landingCategory" />
    </template>

    <!-- ── MOBILE: simplified hero ── -->
    <template v-else>
      <div class="mobile-hero">
        <h1 class="mobile-name">ilze apine</h1>
        <p class="mobile-category">{{ landingCategory.label }}</p>
        <div class="mobile-links">
          <a
            v-for="link in artist.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener"
          >{{ link.label }}</a>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useResponsive } from '@/composables/useResponsive.js'
import { artist, mediaCategories } from '@/data/media.js'
import MediaHero from '@/components/media/MediaHero.vue'

const { isMobile } = useResponsive()

// Use stained-glass hero images but override the display label
const landingCategory = {
  ...mediaCategories['stained-glass'],
  label: 'room of stained glass & oil paintings'
}

onMounted(() => {
  document.title = 'ilze apine'
})
</script>

<style scoped>
.temp-landing {
  background-color: var(--color-bg);
  min-height: 100vh;
  overflow: hidden;
}

/* ── Corner text ── */
.corner-text {
  position: fixed;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: lowercase;
  color: white;
  z-index: 10;
}

.top-left  { top: 25px; left: 25px; }
.top-right { top: 25px; right: 25px; }

/* ── Mobile hero ── */
.mobile-hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 60px 30px;
}

.mobile-name {
  font-size: 2.2rem;
  font-weight: normal;
  text-transform: lowercase;
  letter-spacing: -0.02em;
  color: white;
  margin-bottom: 10px;
}

.mobile-category {
  font-size: 1rem;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 20px;
}

.mobile-links {
  display: flex;
  gap: 20px;
}

.mobile-links a {
  color: white;
  text-decoration: underline;
  font-size: 0.9rem;
  text-transform: lowercase;
  transition: opacity 0.3s ease;
}

.mobile-links a:hover {
  opacity: 0.8;
}

/* ── Mobile corner adjustments ── */
@media (max-width: 480px) {
  .corner-text { font-size: 0.85rem; }
  .top-right   { top: 25px; right: 25px; }
}
</style>
