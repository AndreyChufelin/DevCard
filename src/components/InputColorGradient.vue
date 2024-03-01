<script setup lang="ts">
import InputColor from "./InputColor.vue";

export type Gradient = [string, string];

const gradient = defineModel<Gradient>({ default: ["", ""] });
</script>

<template>
  <div class="input-gradient">
    <InputColor v-model="gradient[0]" />
    <InputColor v-model="gradient[1]" />
  </div>
</template>

<style scoped>
.input-gradient {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
