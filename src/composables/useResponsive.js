import { ref, onMounted, onUnmounted } from 'vue'

const MOBILE_BREAKPOINT = 480

/**
 * Reactive breakpoint detection.
 * isMobile is true when viewport width <= 480px.
 */
export function useResponsive() {
  const isMobile = ref(false)

  function update() {
    isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isMobile }
}
