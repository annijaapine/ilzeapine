<template>
  <section class="gallery-section" id="gallery-row">
    <!--
      galleryLayout = [2, 3] → first row has 2 cols, second row has 3 cols.
      Works are distributed across rows in order.
    -->
    <div
      v-for="(cols, rowIndex) in category.galleryLayout"
      :key="rowIndex"
      class="gallery-row"
      :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }"
    >
      <div
        v-for="work in rowWorks(rowIndex)"
        :key="work.id"
        class="gallery-item"
      >
        <img
          v-if="work.file"
          :src="work.file"
          :alt="work.caption"
        />
        <div v-else class="gallery-placeholder" />

        <p v-if="work.caption || work.description" class="gallery-caption">
          <span class="work-title">{{ work.caption }}</span>
          <template v-if="work.description"><br>{{ work.description }}</template>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  category: { type: Object, required: true }
})

/**
 * Splits works into rows based on galleryLayout.
 * e.g. layout [2, 3], works [a,b,c,d,e] → row0=[a,b], row1=[c,d,e]
 */
function rowWorks(rowIndex) {
  const layout = props.category.galleryLayout
  const start  = layout.slice(0, rowIndex).reduce((sum, n) => sum + n, 0)
  const count  = layout[rowIndex]
  return props.category.works.slice(start, start + count)
}
</script>

<style scoped>
.gallery-section {
  padding: 80px 5%;
}

.gallery-row {
  display: grid;
  gap: 30px;
  margin-bottom: 60px;
}

.gallery-row:last-child {
  margin-bottom: 0;
}

.gallery-item {
  position: relative;
}

.gallery-item img {
  width: 100%;
  height: auto;
  display: block;
}

/* Placeholder shown until real images are added */
.gallery-placeholder {
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.gallery-caption {
  margin-top: 15px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: lowercase;
  line-height: 1.4;
}

.work-title {
  font-style: italic;
}

/* ── Mobile: single column ── */
@media (max-width: 480px) {
  .gallery-section {
    padding: 40px 20px;
  }

  /* Override grid to single column on mobile */
  .gallery-row {
    grid-template-columns: 1fr !important;
    gap: 30px;
    margin-bottom: 30px;
  }
}
</style>
