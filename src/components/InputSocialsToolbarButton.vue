<script setup lang="ts">
import { ref, onMounted } from "vue";
import { SocialsListItem } from "./InputSocials.vue";

defineEmits<{
  (e: "click", cb: Function): void;
}>();

const props = defineProps<{
  item: SocialsListItem;
}>();

const element = ref();
const type = ref(props.item.type);

function error() {
  element.value.classList.add("error");
}

onMounted(() => {
  element.value.addEventListener("animationend", () => {
    element.value.classList.remove("error");
  });
});

defineExpose({
  itemType: type,
});
</script>

<template>
  <button class="button-dark" @click="$emit('click', error)" ref="element">
    <component :is="item.icon"></component>
  </button>
</template>

<style scoped>
.button-dark {
  padding: 5px;
}
.error {
  animation: 1s error;
}

@keyframes error {
  0% {
    background-color: var(--danger-color);
    transform: scale(1.1);
  }
  100% {
    background: var(--additional-background-color);
  }
}
</style>
