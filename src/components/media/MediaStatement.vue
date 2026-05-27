<template>
  <section class="statement-section" id="artist-statement">
    <div
      v-for="(block, i) in category.statements"
      :key="i"
      class="statement-row"
    >
      <!-- Image (left column) -->
      <div class="statement-image">
        <img v-if="block.image" :src="block.image" :alt="category.label" />
        <div v-else class="statement-placeholder" />

        <p class="statement-caption">ilze apine — {{ category.label }}</p>

        <div class="statement-links">
          <a
            v-for="link in artist.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener"
          >{{ link.label }}</a>
        </div>
      </div>

      <!-- Text (right column) -->
      <div class="statement-text">
        <p
          v-for="(para, j) in block.paragraphs"
          :key="j"
        >{{ para }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { artist } from '@/data/media.js'

defineProps({
  category: { type: Object, required: true }
})
</script>

<style scoped>
.statement-section {
  padding: 0 5% 80px;
}

.statement-row {
  display: flex;
  gap: 80px;
  align-items: flex-start;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 90vh;
  padding: 60px 0;
  box-sizing: border-box;
}

/* ── Left: image + caption + links ── */
.statement-image {
  width: 400px;
  flex-shrink: 0;
}

.statement-image img {
  width: 100%;
  height: auto;
  display: block;
}

.statement-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.statement-caption {
  margin-top: 20px;
  font-size: 1.2rem;
  color: white;
  text-transform: lowercase;
}

.statement-links {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}

.statement-links a {
  color: white;
  text-decoration: underline;
  text-transform: lowercase;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  transition: opacity 0.3s ease;
}

.statement-links a:hover {
  opacity: 0.8;
}

/* ── Right: text ── */
.statement-text {
  flex: 1;
  max-width: 650px;
  text-align: justify;
}

.statement-text p {
  font-size: 1.05rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 22px;
}

/* ── Mobile: stack vertically ── */
@media (max-width: 480px) {
  .statement-section {
    padding: 0 20px 60px;
  }

  .statement-row {
    flex-direction: column;
    gap: 30px;
    min-height: auto;
    padding: 40px 0;
  }

  .statement-image {
    width: 100%;
  }

  .statement-text {
    text-align: left;
  }
}
</style>
