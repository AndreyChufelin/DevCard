<script setup lang="ts">
import { ref } from "vue";
import CrossIcon from "./icons/CrossIcon.vue";

defineEmits<{
  (e: "remove"): void;
}>();

const isSelected = ref(false);

function toggleSelect() {
  isSelected.value = !isSelected.value;
}

defineExpose({ toggleSelect });
</script>

<template>
  <div
    class="tag"
    :style="{
      background: isSelected
        ? 'var(--danger-color)'
        : 'var(--gradient-first-color)',
    }"
  >
    <slot></slot>
    <button @click="$emit('remove')" class="input-tag__close-button">
      <CrossIcon class="cross" />
    </button>
  </div>
</template>

<style scoped>
.tag {
  display: flex;
  align-items: center;
  padding: 3px 5px;
  border-radius: 5px;
}
</style>
