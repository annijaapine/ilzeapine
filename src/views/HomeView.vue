<template>
  <div class="home" :class="{ unblurred: hasEntered || !isMobile }">

    <!-- Mobile only: tap-to-enter overlay -->
    <TapOverlay v-if="isMobile" @entered="hasEntered = true" />

    <!-- Mobile only: looping background video -->
    <MobileVideo v-if="isMobile" />

    <!-- Fixed UI chrome (both breakpoints) -->
    <CornerText />
    <MediaList />
    <EventInfo />

    <!-- Center logo -->
    <div class="center-logo">
      <img :src="logoSrc" alt="ilze apine" />
    </div>

    <!-- Scattered artwork images (desktop only) -->
    <ScatteredImages v-if="!isMobile" />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useResponsive } from '@/composables/useResponsive.js'

import TapOverlay      from '@/components/home/TapOverlay.vue'
import MobileVideo     from '@/components/home/MobileVideo.vue'
import CornerText      from '@/components/home/CornerText.vue'
import MediaList       from '@/components/home/MediaList.vue'
import EventInfo       from '@/components/home/EventInfo.vue'
import ScatteredImages from '@/components/home/ScatteredImages.vue'

import logoSrc from '@/assets/images/hear-her-handwriting.png'

const { isMobile } = useResponsive()
const hasEntered = ref(false)
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--color-bg);
}

/* Blur the main content until user taps in on mobile */
.home:not(.unblurred) {
  filter: blur(8px);
}

.home.unblurred {
  filter: blur(0);
  transition: filter 0.8s ease-out;
}

/* Center logo */
.center-logo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
}

.center-logo img {
  max-width: 450px;
  height: auto;
}

@media (max-width: 480px) {
  .center-logo img {
    max-width: 220px;
  }

  /* No blur gate on desktop */
  .home:not(.unblurred) {
    filter: none;
  }
}
</style>
