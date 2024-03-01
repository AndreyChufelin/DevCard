<script setup lang="ts">
import { ref, watchEffect } from "vue";
import InputColor from "./InputColor.vue";
import InputColorGradient, { Gradient } from "./InputColorGradient.vue";
import GradientIcon from "./icons/GradientIcon.vue";
import ColorIcon from "./icons/ColorIcon.vue";

const color = defineModel<Gradient | string>({ default: "#000000" });
const colorType = ref<"single" | "gradient">("single");
const single = ref("");
const gradient = ref<Gradient>(["", ""]);

watchEffect(() => {
  //switch to isArray
  if (Array.isArray(color.value)) {
    colorType.value = "gradient";
    gradient.value = color.value;
  } else {
    colorType.value = "single";
    single.value = color.value;
  }
});
watchEffect(() => {
  if (colorType.value === "single") {
    color.value = single.value;
  } else {
    color.value = gradient.value;
  }
});
</script>

<template>
  <div class="input-color-switch">
    <div class="input-color-switch__tabs">
      <button
        :class="{ active: colorType === 'single' }"
        @click="colorType = 'single'"
        title="Цвет"
      >
        <ColorIcon />
      </button>
      <button
        :class="{ active: colorType === 'gradient' }"
        @click="colorType = 'gradient'"
        title="Градиент"
      >
        <GradientIcon />
      </button>
    </div>
    <TransitionGroup tag="div" class="c">
      <InputColor v-if="colorType === 'single'" v-model="single" />
      <InputColorGradient v-else v-model="gradient" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.c {
  position: relative;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-leave-active,
.v-leave-to {
  position: absolute;
}
.input-color-switch {
  display: flex;
  gap: 3px;
}
.input-color-switch__tabs {
  display: flex;
  align-self: start;
  margin-top: 5px;
  gap: 5px;
  font-size: 12px;
}
.active {
  color: var(--gradient-first-color);
}
</style>
