<template>
  <video
    ref="videoRef"
    class="video-background"
    muted
    playsinline
    webkit-playsinline
    preload="auto"
    :src="videoSrc"
  />
</template>

<script setup>
import { useVideoAutoplay } from '@/composables/useVideoAutoplay.js'
import videoFile from '@/assets/videos/background-video-mobile.mp4'

const videoSrc = videoFile
const { videoRef } = useVideoAutoplay()
</script>

<style scoped>
/* Hidden on desktop — only shown by parent on mobile */
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;

  /* Fade edges on mobile */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

/* Hide iOS native controls */
.video-background::-webkit-media-controls               { display: none !important; }
.video-background::-webkit-media-controls-start-playback-button { display: none !important; -webkit-appearance: none; }
.video-background::-webkit-media-controls-panel         { display: none !important; }
</style>
