import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Parallax effect for media category hero sections.
 *
 * Usage:
 *   const { heroOpacity, getImageOffset } = useParallax(heroRef)
 *
 * - heroOpacity: fades the hero name from 1 → 0 as user scrolls through the hero
 * - getImageOffset(speed): returns a translateY string for floating images
 *   speed < 1 = moves slower than scroll (stays behind)
 *   speed > 1 = moves faster than scroll (moves ahead)
 */
export function useParallax(heroRef) {
  const scrollY = ref(0)
  const heroOpacity = ref(1)

  function onScroll() {
    scrollY.value = window.scrollY

    if (!heroRef?.value) return
    const heroHeight = heroRef.value.offsetHeight
    if (heroHeight === 0) return

    // Fade name out over the first 60% of the hero height
    const progress = scrollY.value / (heroHeight * 0.6)
    heroOpacity.value = Math.max(0, 1 - progress)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  function getImageOffset(speed = 0.4) {
    return `translateY(${scrollY.value * speed}px)`
  }

  return { scrollY, heroOpacity, getImageOffset }
}
