<template>
  <div ref="heroRef" class="desktop-hero">

    <!-- Large centred title -->
    <div
      class="hero-name"
      :style="{ opacity: heroOpacity, display: heroOpacity === 0 ? 'none' : 'block' }"
    >
      <!-- Artist name (big) -->
      <span class="hero-artist">ilze apine</span>
      <!-- Category name (smaller, below) -->
      <span class="hero-category">{{ category.label }}</span>

      <!-- Global social links -->
      <div class="hero-links">
        <a
          v-for="link in artist.links"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >{{ link.label }}</a>
      </div>
    </div>

    <!-- 5 floating hero images (scroll to gallery/statement on click) -->
    <div
      v-for="(img, i) in category.heroImages"
      :key="i"
      :class="['floating-img', `float-${i + 1}`]"
      :style="{ transform: getImageOffset(floatSpeeds[i]) }"
      @click="scrollTo(i)"
    >
      <img v-if="img" :src="img" :alt="category.label" />
      <div v-else class="hero-placeholder" />
    </div>

    <!-- Gradient fade at the bottom of the hero -->
    <div class="hero-fade" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useParallax } from '@/composables/useParallax.js'
import { artist } from '@/data/media.js'

const props = defineProps({
  category: { type: Object, required: true }
})

const heroRef = ref(null)
const { heroOpacity, getImageOffset } = useParallax(heroRef)

// Parallax speed per floating image (matches original: 0.3, 0.35, 0.4, 0.45, 0.5)
const floatSpeeds = [0.3, 0.35, 0.4, 0.45, 0.5]

// Floats 1,2,4,5 → scroll to gallery; float 3 → scroll to statement
function scrollTo(index) {
  const targetId = index === 2 ? 'artist-statement' : 'gallery-row'
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
</script>

<style scoped>
.desktop-hero {
  position: relative;
  width: 100%;
  height: 120vh;
  overflow: hidden;
}

/* Bottom gradient fade into bg colour */
.hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent, #789ebf);
  pointer-events: none;
  z-index: 6;
}

/* ── Title ── */
.hero-name {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  white-space: nowrap;
  color: white;
  transition: opacity 0.3s ease;
}

.hero-artist {
  display: block;
  font-size: 8vw;
  font-weight: normal;
  text-transform: lowercase;
  letter-spacing: -0.02em;
  line-height: 1;
}

.hero-category {
  display: block;
  font-size: 2.5vw;
  font-weight: normal;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  margin-top: 8px;
  opacity: 0.85;
}

.hero-links {
  margin-top: 15px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  gap: 25px;
  letter-spacing: 0.05em;
}

.hero-links a {
  color: white;
  text-decoration: underline;
  text-transform: lowercase;
  transition: opacity 0.3s ease;
}

.hero-links a:hover {
  opacity: 0.8;
}

/* ── Floating images ── */
.floating-img {
  position: absolute;
  z-index: 5;
  will-change: transform;
  filter: blur(15px);
  -webkit-filter: blur(15px);
  animation: float 6s ease-in-out infinite;
  transition: filter 0.4s ease;
  cursor: pointer;
}

.floating-img:hover {
  filter: blur(0);
  -webkit-filter: blur(0);
}

.floating-img:nth-child(2) { animation-delay: 0s; }
.floating-img:nth-child(3) { animation-delay: 1s; }
.floating-img:nth-child(4) { animation-delay: 2s; }
.floating-img:nth-child(5) { animation-delay: 3s; }
.floating-img:nth-child(6) { animation-delay: 4s; }

.floating-img img {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
}

/* Placeholder shown until real hero images are added */
.hero-placeholder {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Per-image positions (mirrored from original) */
.float-1 { top: 0;                  left: 30%;               width: 300px; height: 360px; }
.float-2 { top: 0;                  right: -40px;            width: 280px; height: 340px; }
.float-3 { top: calc(50% - 150px); left: -60px;             width: 300px; height: 360px; }
.float-4 { bottom: 0;              left: calc(50% - 130px); width: 260px; height: 320px; }
.float-5 { bottom: 15%;            right: 15%;              width: 280px; height: 340px; }
</style>
