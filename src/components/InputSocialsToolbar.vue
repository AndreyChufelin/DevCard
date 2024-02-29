<script setup lang="ts">
import { ref } from "vue";
import { SocialsListItem } from "./InputSocials.vue";
import InputSocialsToolbarButton from "./InputSocialsToolbarButton.vue";

export interface SocialsAddEvent {
  type: string;
  errorCallback: Function;
}

defineProps<{
  list: SocialsListItem[];
}>();
defineEmits<{
  (e: "add", event: SocialsAddEvent): void;
}>();

const showDropdown = ref(false);
</script>

<template>
  <Transition name="toolbar">
    <div class="socials__toolbar" v-if="showDropdown && list.length > 0">
      <TransitionGroup name="list">
        <InputSocialsToolbarButton
          v-for="item in list"
          @click="
            $emit('add', {
              type: item.type,
              errorCallback: $event,
            })
          "
          :key="item.type"
          :item="item"
        />
        <!-- <button
          v-for="item in list"
          @click="$emit('add', $event)"
          :key="item.type"
          class="button-dark"
        >
          <component :is="item.icon"></component>
        </button> -->
      </TransitionGroup>
    </div>
  </Transition>
  <button
    v-if="list.length"
    @click="showDropdown = !showDropdown"
    class="button"
  >
    Ещё
  </button>
</template>

<style scoped>
.toolbar-enter-active,
.toolbar-leave-active {
  transition: all 0.3s;
  max-height: 230px;
  transform: scale(1);
  opacity: 1;
}
.toolbar-enter-from,
.toolbar-leave-to {
  transform: scale(0);
  max-height: 0px;
  opacity: 0;
}

.socials__toolbar {
  gap: 10px;
  display: flex;
  height: 40px;
}
.socials__toolbar > * {
  flex: 0 1 100px;
}
</style>
