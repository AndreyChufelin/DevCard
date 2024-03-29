<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import type { DrawOptions } from "./composables/cardCanvas.ts";
import TheEditor from "./components/TheEditor.vue";
import ThePreview from "./components/ThePreview.vue";

function setDefaultOptions() {
  const defaultOptions: DrawOptions = {
    size: "large",
    info: {
      name: "",
      jobTitle: "",
      skills: [],
      socials: [
        { text: "", type: "tg" },
        { text: "", type: "github" },
        { text: "", type: "email" },
      ],
      qrcode: "",
    },
    colors: {
      primary: "#ffffff",
      second: "#828284",
      accent: ["#4158d0", "#c850c0"],
    },
    background: "background",
  };

  return defaultOptions;
}

const savedOptions = localStorage.getItem("canvasOptions");
const editorOptions = ref(
  savedOptions ? JSON.parse(savedOptions) : setDefaultOptions()
);

function clearOptions() {
  editorOptions.value = setDefaultOptions();
}

interface color {
  primary?: string;
  second?: string;
  accent?: string | string[];
}

const colors: {
  [key: string]: color;
} = {
  background: {
    primary: "#ffffff",
    second: "#828284",
    accent: ["#4158d0", "#c850c0"],
  },
  background2: {
    primary: "#000000",
    second: "#000000",
    accent: ["#41AED0", "#B7C850"],
  },
  background3: { primary: "#ffffff", second: "#DCDCDC", accent: "#FDC830" },
};

type colorType = "primary" | "second" | "accent";
watch(
  () => editorOptions.value.background,
  () => {
    Object.keys(colors[editorOptions.value.background]).forEach((key) => {
      editorOptions.value.colors[key as colorType] = colors[
        editorOptions.value.background
      ][key as colorType] as string;
    });
  }
);
watchEffect(() => {
  localStorage.setItem("canvasOptions", JSON.stringify(editorOptions.value));
});
</script>

<template>
  <div class="app">
    <TheEditor
      v-model="editorOptions"
      @changeColor="editorOptions.colors.primary = $event.primary"
    />
    <ThePreview :canvasOptions="editorOptions" @clear="clearOptions" />
  </div>
</template>

<style scoped>
.app {
  max-width: 1280px;
  display: flex;
  gap: 30px;
  margin: 0 auto;
}
@media (max-width: 992px) {
  .app {
    flex-direction: column-reverse;
  }
  .editor,
  .preview {
    width: 100%;
    margin-top: 0;
  }
}
</style>
