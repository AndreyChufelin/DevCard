<script setup lang="ts">
const color = defineModel();
</script>

<template>
  <div class="input-color">
    <input
      v-model="color"
      class="input-color-picker"
      type="color"
      name=""
      id=""
    />
    <input
      v-model="color"
      class="input-color-input"
      type="text"
      name=""
      id=""
    />
  </div>
</template>
<style scoped>
.input-color {
  display: flex;
  border: 2px solid var(--additional-text-color);
  border-radius: 5px;
  transition: border 0.3s;
}
.input-color-input {
  width: 100%;
  padding: 0 10px;
  outline: none;
}
.input-color:has(.input-field__color-input:focus) {
  border: 2px solid var(--gradient-first-color);
}
</style>
