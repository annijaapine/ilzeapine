import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Handles mobile video autoplay with a user-gesture fallback.
 *
 * Usage:
 *   const { videoRef, isPlaying, triggerPlay } = useVideoAutoplay()
 *   <video ref="videoRef" ... />
 *
 * On mount it attempts silent autoplay. If the browser blocks it (common on
 * mobile), it waits for the first touchstart on the document to play.
 */
export function useVideoAutoplay() {
  const videoRef = ref(null)
  const isPlaying = ref(false)

  function triggerPlay() {
    const video = videoRef.value
    if (!video || isPlaying.value) return

    video.muted = true
    video.play()
      .then(() => { isPlaying.value = true })
      .catch(() => { /* still blocked — wait for gesture */ })
  }

  function onTouchstart() {
    triggerPlay()
    if (isPlaying.value) {
      document.removeEventListener('touchstart', onTouchstart)
    }
  }

  // Seamless loop: restart slightly before the true end to avoid a flash
  function onTimeupdate() {
    const video = videoRef.value
    if (!video) return
    if (video.duration && video.currentTime >= video.duration - 0.1) {
      video.currentTime = 0
    }
  }

  onMounted(() => {
    const video = videoRef.value
    if (!video) return

    video.addEventListener('timeupdate', onTimeupdate)

    // Attempt autoplay; register touch fallback regardless
    triggerPlay()
    document.addEventListener('touchstart', onTouchstart, { passive: true })
  })

  onUnmounted(() => {
    const video = videoRef.value
    if (video) video.removeEventListener('timeupdate', onTimeupdate)
    document.removeEventListener('touchstart', onTouchstart)
  })

  return { videoRef, isPlaying, triggerPlay }
}
