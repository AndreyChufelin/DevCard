<script setup lang="ts">
import { computed } from "vue";
const model = defineModel();

const filled = computed(() => model.value);
</script>

<template>
  <div
    class="input"
    :style="{
      paddingLeft: $slots.icon ? '10px' : '20px',
    }"
  >
    <div
      class="input__icon"
      :style="{
        color: filled ? 'var(--text-color)' : 'var(--additional-text-color)',
      }"
      v-if="$slots.icon"
    >
      <slot name="icon"></slot>
    </div>
    <input
      v-model="model"
      class="input__input"
      type="text"
    />
  </div>
</template>

<style scoped>
.input {
  display: flex;
  gap: 5px;
  color: var(--text-color);
  border: 2px solid var(--additional-text-color);
  border-radius: 5px;
  padding: 10px 20px;
  transition: border 0.3s;
}
.input:has(.input__input:focus) {
  border-color: var(--gradient-first-color);
}

.input__icon {
  color: var(--additional-text-color);
  width: 25px;
  height: 25px;
}
.input__input:focus + .input__icon {
  color: var(--text-color);
}
</style>
