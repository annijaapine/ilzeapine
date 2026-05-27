<template>
  <div
    ref="el"
    class="scattered-img"
    :class="[`scatter-${slot.n}`, { dragging: isDragging }]"
    :style="dragStyle"
    @mousedown="onMousedown"
  >
    <!-- Real image -->
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="slot.cat"
      draggable="false"
    />
    <!-- Placeholder shown until real images are added -->
    <div v-else class="placeholder" :data-label="slot.cat" />
  </div>
</template>

<script setup>
import { ref, computed, inject, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { mediaCategories } from '@/data/media.js'

const props = defineProps({
  slot: { type: Object, required: true } // one entry from SCATTER_CONFIG
})

const router   = useRouter()
const getNextZ = inject('getNextZ') // shared z-index counter from ScatteredImages

// ── Image source ──────────────────────────────────────────────────────────────
const imageSrc = computed(() => {
  const cat  = mediaCategories[props.slot.cat]
  const work = cat?.works[props.slot.wi]
  return work?.file ?? null
})

// ── Drag state ────────────────────────────────────────────────────────────────
const el          = ref(null)
const isDragging  = ref(false)
const dragStyle   = ref({})  // empty = CSS class controls position

let startX = 0, startY = 0
let originLeft = 0, originTop = 0
let mousedownTime = 0
let hasMoved = false
let cleanedUp = false

function onMousemove(e) {
  const dx = e.clientX - startX
  const dy = e.clientY - startY

  if (!hasMoved && (Math.abs(dx) > 2 || Math.abs(dy) > 2)) {
    hasMoved = true
    isDragging.value = true
  }

  if (isDragging.value) {
    dragStyle.value = {
      ...dragStyle.value,
      left: (originLeft + dx) + 'px',
      top:  (originTop  + dy) + 'px'
    }
  }
}

function onMouseup() {
  cleanup()

  const elapsed = Date.now() - mousedownTime

  // Click: fast + barely moved → navigate to the category page
  if (!hasMoved && elapsed < 200) {
    router.push('/' + props.slot.cat)
  }

  isDragging.value = false
}

function onMousedown(e) {
  if (e.button !== 0) return
  e.preventDefault()

  const rect = el.value.getBoundingClientRect()

  // Capture pixel position from wherever CSS placed the element
  originLeft = rect.left
  originTop  = rect.top
  startX     = e.clientX
  startY     = e.clientY
  mousedownTime = Date.now()
  hasMoved   = false

  // Switch from CSS percentages to fixed pixels so we can drag freely
  dragStyle.value = {
    left:   originLeft + 'px',
    top:    originTop  + 'px',
    right:  'auto',
    bottom: 'auto',
    zIndex: getNextZ()
  }

  cleanedUp = false
  window.addEventListener('mousemove', onMousemove)
  window.addEventListener('mouseup',   onMouseup)
}

function cleanup() {
  if (cleanedUp) return
  cleanedUp = true
  window.removeEventListener('mousemove', onMousemove)
  window.removeEventListener('mouseup',   onMouseup)
}

onUnmounted(cleanup)
</script>

<style scoped>
/* ── Shared scattered image styles ─────────────────────────────────────────── */
.scattered-img {
  position: absolute;
  cursor: grab;
  pointer-events: auto;
  user-select: none;
  filter: blur(15px);
  -webkit-filter: blur(15px);
  transition:
    filter 0.4s ease,
    box-shadow 0.4s ease;
  animation: float 6s ease-in-out infinite;
}

.scattered-img:hover {
  filter: blur(0);
  -webkit-filter: blur(0);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.scattered-img.dragging {
  cursor: grabbing;
  filter: blur(0);
  -webkit-filter: blur(0);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.2s ease;
  animation-play-state: paused;
}

.scattered-img img {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
}

/* Placeholder box — shown when file is null */
.placeholder {
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* ── Per-slot positions (mirrored from original) ──────────────────────────── */
.scatter-1  { top: 8%;    left: 8%;    width: 180px; }
.scatter-2  { top: 5%;    right: 15%;  width: 150px; }
.scatter-3  { top: 52%;   left: 1%;    width: 140px; z-index: 2; }
.scatter-4  { bottom: 10%;left: 20%;   width: 160px; }
.scatter-5  { top: 35%;   right: 8%;   width: 170px; }
.scatter-6  { bottom: 8%; right: 20%;  width: 145px; }
.scatter-7  { top: 20%;   left: 25%;   width: 155px; }
.scatter-8  { bottom: 14%;right: 32%;  width: 150px; animation: floatDrift 8s ease-in-out infinite; }
.scatter-9  { top: 15%;   right: 35%;  width: 140px; }
.scatter-10 { bottom: 30%;left: 12%;   width: 145px; z-index: 2; animation: floatDrift 7s ease-in-out infinite; }
.scatter-11 { top: 55%;   left: 30%;   width: 135px; }
.scatter-12 { top: 42%;   right: 20%;  width: 155px; }
.scatter-13 { top: 10%;   left: 42%;   width: 175px; }
.scatter-14 { bottom: 8%; left: 14%;   width: 150px; animation: floatDrift 8s ease-in-out infinite; animation-delay: 2s; }
.scatter-15 { bottom: 5%; left: 45%;   width: 160px; }
.scatter-16 { top: 68%;   right: 5%;   width: 155px; }
.scatter-17 { top: 10%;   right: 2%;   width: 150px; }
.scatter-18 { top: 22%;   left: 18%;   width: 145px; z-index: -1; animation: floatDrift 8s ease-in-out infinite; animation-delay: 3s; }
.scatter-19 { top: 22%;   left: -3%;   width: 160px; z-index: 3; }
.scatter-20 { top: 52%;   right: 0%;   width: 150px; }
.scatter-21 { top: 25%;   left: 35%;   width: 155px; z-index: -1; }
.scatter-22 { top: 23%;   right: 25%;  width: 150px; z-index: -1; }

/* Animation delays for float */
.scatter-1  { animation-delay: 0s; }
.scatter-2  { animation-delay: 1s; }
.scatter-3  { animation-delay: 2s; }
.scatter-4  { animation-delay: 3s; }
.scatter-5  { animation-delay: 4s; }
.scatter-6  { animation-delay: 0s; }
.scatter-7  { animation-delay: 1s; }
.scatter-9  { animation-delay: 2s; }
.scatter-11 { animation-delay: 3s; }
.scatter-12 { animation-delay: 0s; }
.scatter-13 { animation-delay: 1s; }
.scatter-15 { animation-delay: 0s; }
.scatter-16 { animation-delay: 2s; }
.scatter-17 { animation-delay: 0s; }
.scatter-19 { animation-delay: 1s; }
.scatter-20 { animation-delay: 4s; }
.scatter-21 { animation-delay: 0s; }
.scatter-22 { animation-delay: 2s; }
</style>
