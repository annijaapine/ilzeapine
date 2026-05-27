<template>
  <div class="event-info">
    <slot>
      <!-- Default content — replace with real info when ready -->
      <a :href="artist.links[0]?.url" target="_blank" rel="noopener">{{ artist.links[0]?.label }}</a><br>
      <a :href="artist.links[1]?.url">{{ artist.links[1]?.label }}</a>
    </slot>
  </div>
</template>

<script setup>
import { artist } from '@/data/media.js'
</script>

<style scoped>
.event-info {
  position: fixed;
  right: 25px;
  bottom: 25px;
  text-align: right;
  color: white;
  font-size: 0.95rem;
  line-height: 1.4;
  z-index: 10;
  padding: 10px 15px;
  isolation: isolate;
  text-transform: lowercase;
  letter-spacing: 0.02em;
}

/* Gold glow on hover */
.event-info::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  background: radial-gradient(
    circle,
    rgba(220, 190, 80, 0.6) 0%,
    rgba(220, 190, 80, 0.25) 50%,
    rgba(220, 190, 80, 0) 70%
  );
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.event-info:hover::before {
  opacity: 1;
}

.event-info :deep(a) {
  color: white;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.event-info :deep(a:hover) {
  color: rgba(255, 255, 255, 0.7);
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .event-info {
    bottom: 160px;
    right: 25px;
    font-size: 0.85rem;
    padding: 0;
  }

  /* Always-on pink glow on mobile */
  .event-info::before {
    display: block;
    opacity: 1;
    width: 140px;
    height: 140px;
    background: radial-gradient(
      circle,
      rgba(180, 120, 140, 0.5) 0%,
      rgba(180, 120, 140, 0.2) 50%,
      rgba(180, 120, 140, 0) 70%
    );
  }
}
</style>
