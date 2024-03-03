<script setup lang="ts">
import { watchEffect } from "vue";

import { DrawOptions, useCardCanvas } from "../composables/cardCanvas.ts";
import PhoneIcon from "./icons/PhoneIcon.vue";
import DesktopIcon from "./icons/DesktopIcon.vue";

const props = defineProps<{ canvasOptions: DrawOptions }>();

const { resultURL, loading, draw } = useCardCanvas(() => {
  draw(props.canvasOptions);
});

watchEffect(() => {
  draw(props.canvasOptions);
});
</script>

<template>
  <div class="preview">
    <h1 class="app-title">DevCard</h1>
    <h2 class="preview__title">
      Пред просмотр
      <div class="preview__title_toolbar">
        <button class="link"><DesktopIcon /></button>
        <button class="link"><PhoneIcon /></button>
      </div>
    </h2>
    <img
      v-if="!loading"
      class="preview__image"
      :src="resultURL"
      alt="Card's preview"
    />
    <p>{{ canvasOptions }}</p>
    <div class="preview__toolbar">
      <button class="button download-button">Скачать</button>
      <button class="button-dark">Сбросить</button>
    </div>
  </div>
</template>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.preview__image {
  width: 100%;
  border: 5px solid var(--additional-background-color);
  border-radius: 30px;
}
.preview__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  container-type: inline-size;
}
@container (max-width: 500px) {
  .preview__toolbar > * {
    width: 100%;
  }
}

.app-title {
  display: none;
}
.preview__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.preview__title_toolbar {
  font-size: 14px;
  display: flex;
  gap: 10px;
}

.download-button {
  padding: 15px 60px;
}

@media (max-width: 992px) {
  .app-title {
    display: block;
  }
}
</style>
