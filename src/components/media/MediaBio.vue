<template>
  <section class="bio-section">
    <p class="bio-label">bio / {{ category.label }}</p>
    <p class="bio-text">{{ category.bio }}</p>
  </section>
</template>

<script setup>
defineProps({
  category: { type: Object, required: true }
})
</script>

<style scoped>
.bio-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 10%;
  text-align: center;
}

.bio-label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 40px;
  color: rgba(255, 255, 255, 0.7);
}

.bio-text {
  font-size: 2vw;
  font-weight: normal;
  font-style: italic;
  line-height: 1.6;
  color: white;
  max-width: 800px;
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .bio-section {
    min-height: auto;
    padding: 60px 20px;
  }

  .bio-text {
    font-size: 1rem;
  }
}
</style>
