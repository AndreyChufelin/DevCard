<script setup lang="ts">
import { watch } from "vue";

import { DrawOptions, useCardCanvas } from "../composables/cardCanvas.ts";
import PreviewSwitchSize from "./PreviewSwitchSize.vue";

const props = defineProps<{ canvasOptions: DrawOptions }>();

const { resultURL, loading, draw } = useCardCanvas(() => {
  draw(props.canvasOptions);
});

let timer: number;

watch(
  () => props.canvasOptions,
  () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      draw(props.canvasOptions);
    }, 500);
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div
    class="preview"
    :class="{
      small: canvasOptions.size === 'small',
      large: canvasOptions.size === 'large',
    }"
  >
    <h1 class="app-title">DevCard</h1>
    <h2 class="preview__title">
      Пред просмотр
      <PreviewSwitchSize v-model="canvasOptions.size" />
    </h2>
    <template v-if="!loading">
      <img class="preview__image" :src="resultURL" alt="Card's preview" />
      <div class="preview__toolbar">
        <a
          class="button download-button"
          :href="resultURL"
          download="DevCard.png"
        >
          Скачать
        </a>
        <button class="button-dark" @click="$emit('clear')">Сбросить</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 70px;
  transition: width 0.3s;
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
  text-align: center;
  padding: 15px 60px;
}

.large {
  width: 70%;
}
.small {
  width: 30%;
}

@media (max-width: 992px) {
  .app-title {
    display: block;
  }
  .small {
    width: 100%;
  }
  .large {
    width: 100%;
  }
}
</style>
