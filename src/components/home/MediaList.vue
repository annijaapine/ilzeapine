<template>
  <nav class="media-list" aria-label="media categories">
    <RouterLink
      v-for="cat in categories"
      :key="cat.slug"
      :to="'/' + cat.slug"
    >
      {{ cat.label }}
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { mediaCategories } from '@/data/media.js'

// Build a flat array from the data object, preserving order
const categories = Object.values(mediaCategories).map(cat => ({
  slug: cat.slug,
  label: cat.label
}))
</script>

<style scoped>
.media-list {
  position: fixed;
  bottom: 25px;
  left: 25px;
  color: white;
  font-size: 0.95rem;
  line-height: 1.2;
  text-transform: lowercase;
  text-align: left;
  z-index: 10;
}

.media-list a {
  color: white;
  text-decoration: none;
  display: block;
  position: relative;
  padding: 2px 10px;
  transition: color 0.3s ease;
}

/* Gold glow on each link hover */
.media-list a::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130%;
  height: 180%;
  background: radial-gradient(
    ellipse,
    rgba(220, 190, 80, 0.6) 0%,
    rgba(220, 190, 80, 0.25) 50%,
    rgba(220, 190, 80, 0) 75%
  );
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.media-list a:hover::before,
.media-list a.router-link-active::before {
  opacity: 1;
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .media-list {
    font-size: 0.85rem;
    line-height: 1.4;
    isolation: isolate;
  }

  /* Purple glow behind the whole list on mobile */
  .media-list::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
    background: radial-gradient(
      circle,
      rgba(150, 100, 180, 0.5) 0%,
      rgba(150, 100, 180, 0.2) 50%,
      rgba(150, 100, 180, 0) 70%
    );
    border-radius: 50%;
    z-index: -1;
  }

  .media-list a {
    padding: 0;
  }

  .media-list a::before {
    display: none;
  }
}
</style>
