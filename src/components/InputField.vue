<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
    title?: string;
  }>(),
  {
    tag: "div",
  }
);
</script>

<template>
  <component :is="tag" class="input-field">
    {{ title }}
    <slot></slot>
  </component>
</template>

<style scoped>
.input-field {
  display: flex;
  flex-direction: column;
  color: var(--additional-text-color);
  gap: 5px;
}
</style>
