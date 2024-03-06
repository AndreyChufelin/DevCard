<script setup lang="ts">
import { computed } from "vue";
import { backgroundImages } from "../composables/cardCanvas";

const background = defineModel();

const selectedItem = computed(() =>
  backgroundImages.findIndex((b) => b.name === background.value)
);
</script>

<template>
  <div class="input-background">
    <button
      v-for="(image, index) in backgroundImages"
      @click="background=image.name"
      class="input-background__item"
      :style="{
        backgroundImage: `url(${image.src})`,
        borderColor:
          index === selectedItem ? 'var(--gradient-first-color)' : '',
      }"
    ></button>
  </div>
</template>

<style scoped>
.input-background {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
}
@container (max-width: 600px) {
  .input-background {
    grid-template-columns: auto auto;
  }
}

.input-background__item {
  width: 100%;
  height: 150px;
  border: 2px solid var(--additional-text-color);
  border-radius: 10px;
  background-size: cover;
  transition: border 0.3s;
}
.input-background__item:hover,
.input-background__item:focus-visible {
  border-color: var(--text-color);
}
</style>
