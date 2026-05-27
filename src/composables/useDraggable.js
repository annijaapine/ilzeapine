import { ref, reactive } from 'vue'

/**
 * Makes an absolutely-positioned element draggable.
 *
 * Usage:
 *   const { position, isDragging, onMousedown } = useDraggable(initialX, initialY)
 *
 *   <div
 *     :style="{ left: position.x + 'px', top: position.y + 'px' }"
 *     @mousedown="onMousedown"
 *   />
 *
 * The composable also distinguishes a drag from a click:
 *   - if mouse is released within 200ms and moved < 5px → it was a click
 *   - call onMousedown with a callback: onMousedown(event, () => navigate())
 */
export function useDraggable(initialX = 0, initialY = 0) {
  const position = reactive({ x: initialX, y: initialY })
  const isDragging = ref(false)

  let startX = 0
  let startY = 0
  let startPosX = 0
  let startPosY = 0
  let mousedownTime = 0
  let clickCallback = null
  let hasMoved = false

  function onMousemove(e) {
    const dx = e.clientX - startX
    const dy = e.clientY - startY

    if (!hasMoved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      hasMoved = true
      isDragging.value = true
    }

    if (isDragging.value) {
      position.x = startPosX + dx
      position.y = startPosY + dy
    }
  }

  function onMouseup() {
    const elapsed = Date.now() - mousedownTime

    window.removeEventListener('mousemove', onMousemove)
    window.removeEventListener('mouseup', onMouseup)

    // Treat as a click if fast and barely moved
    if (elapsed < 200 && !hasMoved && clickCallback) {
      clickCallback()
    }

    isDragging.value = false
    clickCallback = null
  }

  function onMousedown(e, onClick = null) {
    // Only respond to left mouse button
    if (e.button !== 0) return

    e.preventDefault()

    startX = e.clientX
    startY = e.clientY
    startPosX = position.x
    startPosY = position.y
    mousedownTime = Date.now()
    hasMoved = false
    clickCallback = onClick

    window.addEventListener('mousemove', onMousemove)
    window.addEventListener('mouseup', onMouseup)
  }

  return { position, isDragging, onMousedown }
}
