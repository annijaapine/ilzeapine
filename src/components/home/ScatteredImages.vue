<template>
  <div class="desktop-scattered-images">
    <ScatteredImage
      v-for="slot in SCATTER_CONFIG"
      :key="slot.n"
      :slot="slot"
    />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import ScatteredImage from './ScatteredImage.vue'

// ── Shared z-index counter ────────────────────────────────────────────────────
// Each image calls getNextZ() on mousedown to come to the front.
// Cycles back to 1 after 9 to stay below the UI chrome (z-index: 10).
const zCounter = ref(0)
provide('getNextZ', () => {
  zCounter.value = (zCounter.value % 9) + 1
  return zCounter.value
})

// ── Scatter config ────────────────────────────────────────────────────────────
// 22 slots spread evenly across all 3 media categories.
// cat  = mediaCategories key  |  wi = works[] index (repeats after 5)
const SCATTER_CONFIG = [
  { n:  1, cat: 'stained-glass', wi: 0 },
  { n:  2, cat: 'paintings',     wi: 0 },
  { n:  3, cat: 'other-media',   wi: 0 },
  { n:  4, cat: 'stained-glass', wi: 1 },
  { n:  5, cat: 'paintings',     wi: 1 },
  { n:  6, cat: 'other-media',   wi: 1 },
  { n:  7, cat: 'stained-glass', wi: 2 },
  { n:  8, cat: 'paintings',     wi: 2 },
  { n:  9, cat: 'other-media',   wi: 2 },
  { n: 10, cat: 'stained-glass', wi: 3 },
  { n: 11, cat: 'paintings',     wi: 3 },
  { n: 12, cat: 'other-media',   wi: 3 },
  { n: 13, cat: 'stained-glass', wi: 4 },
  { n: 14, cat: 'paintings',     wi: 4 },
  { n: 15, cat: 'other-media',   wi: 4 },
  // Slots 16–22 cycle back (repeats wi 0–2 across categories)
  { n: 16, cat: 'stained-glass', wi: 0 },
  { n: 17, cat: 'paintings',     wi: 0 },
  { n: 18, cat: 'other-media',   wi: 0 },
  { n: 19, cat: 'stained-glass', wi: 1 },
  { n: 20, cat: 'paintings',     wi: 1 },
  { n: 21, cat: 'other-media',   wi: 1 },
  { n: 22, cat: 'stained-glass', wi: 2 },
]
</script>

<style scoped>
.desktop-scattered-images {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none; /* children opt back in with pointer-events: auto */
}

/* Hidden on mobile — parent already conditionally renders, but belt + braces */
@media (max-width: 480px) {
  .desktop-scattered-images {
    display: none;
  }
}
</style>
