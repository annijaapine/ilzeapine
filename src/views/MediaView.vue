<template>
  <div class="media-page">

    <!-- Back link -->
    <RouterLink to="/" class="back-link">← back</RouterLink>

    <!-- ── DESKTOP layout ── -->
    <template v-if="!isMobile">
      <MediaHero      :category="category" />
      <MediaBio       :category="category" />
      <MediaGallery   :category="category" />
      <MediaStatement :category="category" />
    </template>

    <!-- ── MOBILE layout ── -->
    <template v-else>
      <div class="mobile-content">

        <!-- Name + category + links -->
        <h1 class="mobile-name">ilze apine</h1>
        <p class="mobile-category">{{ category.label }}</p>
        <div class="mobile-links">
          <a
            v-for="link in artist.links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener"
          >{{ link.label }}</a>
        </div>

        <!-- Hero image (first heroImage if available, else first work) -->
        <div class="mobile-hero-image">
          <img
            v-if="heroImg"
            :src="heroImg"
            :alt="category.label"
          />
          <div v-else class="mobile-placeholder" />
        </div>

        <!-- Bio -->
        <p class="mobile-bio">{{ category.bio }}</p>

        <!-- Works gallery (single column) -->
        <div class="mobile-gallery">
          <div
            v-for="work in category.works"
            :key="work.id"
            class="mobile-work-item"
          >
            <img v-if="work.file" :src="work.file" :alt="work.caption" />
            <div v-else class="mobile-placeholder" />
            <p v-if="work.caption" class="mobile-work-caption">
              <span class="work-title">{{ work.caption }}</span>
              <template v-if="work.description"><br>{{ work.description }}</template>
            </p>
          </div>
        </div>

        <!-- Statements -->
        <div class="mobile-statements">
          <div
            v-for="(block, i) in category.statements"
            :key="i"
          >
            <p
              v-for="(para, j) in block.paragraphs"
              :key="j"
              class="mobile-statement"
            >{{ para }}</p>
          </div>
        </div>

      </div>
    </template>

    <!-- Footer (both breakpoints) -->
    <footer class="site-footer">© ilze apine</footer>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useResponsive } from '@/composables/useResponsive.js'
import { mediaCategories, artist } from '@/data/media.js'

import MediaHero      from '@/components/media/MediaHero.vue'
import MediaBio       from '@/components/media/MediaBio.vue'
import MediaGallery   from '@/components/media/MediaGallery.vue'
import MediaStatement from '@/components/media/MediaStatement.vue'

const props = defineProps({
  category: { type: String, required: true }
})

const { isMobile } = useResponsive()

// Resolve category slug → data object
const category = computed(() => mediaCategories[props.category])

// First available hero image, falling back to first work image
const heroImg = computed(() =>
  category.value.heroImages.find(Boolean) ??
  category.value.works.find(w => w.file)?.file ??
  null
)

// Update page title whenever the category changes
onMounted(() => {
  document.title = category.value?.title ?? 'ilze apine'
})
</script>

<style scoped>
.media-page {
  background-color: var(--color-bg);
  color: white;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── Back link ── */
.back-link {
  position: fixed;
  top: 40px;
  left: 40px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: lowercase;
  z-index: 100;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  text-decoration: underline;
}

/* ── Footer ── */
.site-footer {
  position: fixed;
  bottom: 25px;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: lowercase;
  pointer-events: none;
}

/* ── Mobile content wrapper ── */
.mobile-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px 100px;
}

.mobile-name {
  font-size: 1.8rem;
  font-weight: normal;
  text-transform: lowercase;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.mobile-category {
  font-size: 1rem;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  opacity: 0.85;
  margin-bottom: 12px;
}

.mobile-links {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

.mobile-links a {
  color: white;
  text-decoration: underline;
  font-size: 0.9rem;
  text-transform: lowercase;
  transition: opacity 0.3s ease;
}

.mobile-links a:hover {
  opacity: 0.8;
}

.mobile-hero-image {
  width: 100%;
  margin-bottom: 30px;
}

.mobile-hero-image img {
  width: 100%;
  height: auto;
  display: block;
}

.mobile-placeholder {
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.mobile-bio {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
}

.mobile-gallery {
  margin-bottom: 40px;
}

.mobile-work-item {
  margin-bottom: 30px;
}

.mobile-work-item img {
  width: 100%;
  height: auto;
  display: block;
}

.mobile-work-caption {
  margin-top: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.work-title {
  font-style: italic;
}

.mobile-statement {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
}

/* ── Back link mobile adjustment ── */
@media (max-width: 480px) {
  .back-link {
    top: 20px;
    left: 20px;
  }
}
</style>
