<script setup lang="ts">
import PhoneIcon from "./icons/PhoneIcon.vue";
import DesktopIcon from "./icons/DesktopIcon.vue";

const size = defineModel();
</script>

<template>
  <div class="preview__title_toolbar">
    <button
      class="link"
      @click="size = 'large'"
      :style="{
        color:
          size === 'large'
            ? 'var(--gradient-first-color)'
            : 'var(--additional-text-color)',
      }"
    >
      <DesktopIcon />
    </button>
    <button
      class="link"
      @click="size = 'small'"
      :style="{
        color:
          size === 'small'
            ? 'var(--gradient-first-color)'
            : 'var(--additional-text-color)',
      }"
    >
      <PhoneIcon />
    </button>
  </div>
</template>
