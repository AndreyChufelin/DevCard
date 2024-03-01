<script setup lang="ts">
import ArrowIcon from "./icons/ArrowIcon.vue";
import { ref } from "vue";

const show = ref(true);
</script>

<template>
  <div class="accordion">
    <button class="accordion__title" @click="show = !show">
      <ArrowIcon class="accordion__icon" :style="{
        transform: `rotate(${show ? 0 : 90}deg)`
      }" />
      <slot name="title"></slot>
    </button>
    <Transition>
      <template v-if="show" class="">
        <slot></slot>
      </template>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
  max-height: 1000px;
  opacity: 1;
}
.v-enter-from,
.v-leave-to {
  max-height: 0px;
  opacity: 0;
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.accordion__title {
  display: flex;
  align-items: center;
}
.accordion__icon {
  position: absolute;
  left: -25px;
  transition: transform 0.3s;
}
</style>
