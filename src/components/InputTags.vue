<script setup lang="ts">
import { ref } from "vue";
import InputTagsTag from "./InputTagsTag.vue";

const props = defineProps<{
  modelValue: string[];
}>();
const emits = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const tagElements = ref<Array<InstanceType<typeof InputTagsTag>>>([]);
const hasSelectedTag = ref(false);
let selectTimeout: number;

function addTag(event: Event) {
  const element = event.target as HTMLInputElement;
  if (!element.value) return;

  props.modelValue.push(element.value);
  element.value = "";
}
function removeTag(index: number) {
  props.modelValue.splice(index, 1);
}
function onDelete(event: Event) {
  const element = event.target as HTMLInputElement;
  if (element.value || !tagElements.value.length) return;

  if (hasSelectedTag.value) {
    props.modelValue.pop();
    clearTimeout(selectTimeout);
    hasSelectedTag.value = false;
  } else {
    hasSelectedTag.value = true;
    const last = tagElements.value.length - 1;
    tagElements.value[last].toggleSelect();

    selectTimeout = setTimeout(() => {
      hasSelectedTag.value = false;
      tagElements.value[last].toggleSelect();
    }, 1000);
  }
}
</script>

<template>
  <div class="input-tag">
    <InputTagsTag
      v-for="(tag, index) in modelValue"
      :key="index"
      :index="index"
      ref="tagElements"
      @remove="removeTag(index)"
    >
      {{ tag }}
    </InputTagsTag>
    <input
      @keyup.enter="addTag($event)"
      @keyup.delete="onDelete"
      class="input-tag__input"
      type="text"
    />
  </div>
</template>
<style>
.input-tag {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  
  color: var(--text-color);
  border: 2px solid var(--additional-text-color);
  border-radius: 5px;
  padding: 10px 20px;
  transition: border 0.3s;
}
.input-tag:has(.input-tag__input:focus) {
  border: 2px solid var(--gradient-first-color);
}
.input-tag__input {
  flex: 1;
  min-width: 100px;
}
.input-tag__close-button {
  display: flex;
  border-radius: 50%;
}
.input-tag__close-button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.cross {
  width: 20px;
  height: 20px;
}
</style>
