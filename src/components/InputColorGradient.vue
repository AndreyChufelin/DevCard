<script setup lang="ts">
import { Gradient } from "../composables/cardCanvas";
import InputColor from "./InputColor.vue";

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
