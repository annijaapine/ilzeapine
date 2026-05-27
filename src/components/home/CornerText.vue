<template>
  <!-- Top-left -->
  <div class="corner-text top-left">{{ topLeft }}</div>

  <!-- Top-center (repositions to top-right on mobile) -->
  <div class="corner-text top-center">{{ topCenter }}</div>

  <!-- Top-right (repositions to bottom-right on mobile) -->
  <div class="corner-text top-right">{{ topRight }}</div>
</template>

<script setup>
defineProps({
  topLeft:   { type: String, default: 'ilze apine' },
  topCenter: { type: String, default: 'art' },
  topRight:  { type: String, default: 'portfolio' }
})
</script>

<style scoped>
.corner-text {
  position: fixed;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: lowercase;
  z-index: 10;
  color: white;
}

.top-left {
  top: 25px;
  left: 25px;
}

.top-right {
  top: 25px;
  right: 25px;
}

.top-center {
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .corner-text {
    font-size: 0.85rem;
    color: white;
  }

  /* "art" moves to top-right */
  .top-center {
    left: auto;
    transform: none;
    right: 25px;
  }

  /* "portfolio" moves to bottom-right */
  .top-right {
    top: auto;
    bottom: 25px;
    right: 25px;
  }
}

/* ── Desktop override ── */
@media (min-width: 481px) {
  .corner-text {
    color: white;
  }
}
</style>
