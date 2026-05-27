import { ref, onMounted, onUnmounted } from 'vue'

// Import all 9 loading icons so Vite includes them in the build
import icon1 from '@/assets/images/loading-icons/image1.png'
import icon2 from '@/assets/images/loading-icons/image2.png'
import icon3 from '@/assets/images/loading-icons/image3.png'
import icon4 from '@/assets/images/loading-icons/image4.png'
import icon5 from '@/assets/images/loading-icons/image5.png'
import icon6 from '@/assets/images/loading-icons/image6.png'
import icon7 from '@/assets/images/loading-icons/image7.png'
import icon8 from '@/assets/images/loading-icons/image8.png'
import icon9 from '@/assets/images/loading-icons/image9.png'

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9]

const INTERVAL_MS = 350

/**
 * Cycles through the 9 loading icons at 350ms intervals.
 * Used on the mobile landing page while the background video loads.
 *
 * Usage:
 *   const { currentIcon } = useLoadingIcon()
 *   <img :src="currentIcon" />
 */
export function useLoadingIcon() {
  const index = ref(0)
  const currentIcon = ref(icons[0])
  let timer = null

  onMounted(() => {
    timer = setInterval(() => {
      index.value = (index.value + 1) % icons.length
      currentIcon.value = icons[index.value]
    }, INTERVAL_MS)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return { currentIcon }
}
