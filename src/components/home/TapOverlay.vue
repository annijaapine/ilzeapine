<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="tap-overlay"
      :class="{ 'blur-in': isBlurIn, 'revealed': isRevealed }"
      @click="onEnter"
      @touchend.prevent="onEnter"
    >
      <img class="tap-icon" :src="currentIcon" alt="loading" />
      <span class="tap-text">tap to enter</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useLoadingIcon } from '@/composables/useLoadingIcon.js'

const emit = defineEmits(['entered'])

const visible  = ref(true)
const isBlurIn = ref(false)
const isRevealed = ref(false)
let hasEntered = false

const { currentIcon } = useLoadingIcon()

onMounted(() => {
  // If returning from a media page, blur in the overlay
  if (sessionStorage.getItem('hasEntered') === 'true') {
    sessionStorage.removeItem('hasEntered')
    isBlurIn.value = true
    nextTick(() => {
      // Tiny delay triggers the CSS transition
      setTimeout(() => { isRevealed.value = true }, 50)
    })
  }
})

function onEnter() {
  if (hasEntered) return
  hasEntered = true

  emit('entered')

  // Fade out then remove
  visible.value = false
  sessionStorage.setItem('hasEntered', 'true')
}
</script>

<style scoped>
.tap-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--color-bg);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0;
  cursor: pointer;
  transition: opacity 0.8s ease-out;
}

.tap-overlay.blur-in {
  opacity: 0;
}

.tap-overlay.blur-in.revealed {
  opacity: 1;
}

.tap-icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.tap-text {
  color: white;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  margin-top: -10px;
}

/* Vue transition */
.fade-leave-active {
  transition: opacity 0.8s ease-out;
}
.fade-leave-to {
  opacity: 0;
}

/* Never shown on desktop */
@media (min-width: 481px) {
  .tap-overlay {
    display: none !important;
  }
}
</style>
