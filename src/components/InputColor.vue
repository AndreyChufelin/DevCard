<script setup lang="ts">
import { computed } from "vue";

const color = defineModel<string>();

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (regex.test(value)) {
    color.value = value;
  }
}

const colorToSixDigitHex = computed(() => {
  if (color.value?.length === 4) {
    const hexcolor = color.value.slice(1);
    return (
      "#" +
      hexcolor
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("")
    );
  }
  return color.value;
});
</script>

<template>
  <div class="input-color">
    <input
      :value="colorToSixDigitHex"
      @input="onInput"
      class="input-color-picker"
      type="color"
      name=""
      id=""
    />
    <input
      :value="color"
      @input="onInput"
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
