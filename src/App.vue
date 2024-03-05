<script setup lang="ts">
import { ref, watchEffect } from "vue";
import type { DrawOptions } from "./composables/cardCanvas.ts";
import TheEditor from "./components/TheEditor.vue";
import ThePreview from "./components/ThePreview.vue";

function setDefaultOptions() {
  const defaultOptions: DrawOptions = {
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

const editorOptions = ref(setDefaultOptions());

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
  background: { primary: "#ffffff", second: "#828284", accent: ["#4158d0", "#c850c0"] },
  background2: { primary: "#000000", second: "#000000", accent: ["#41AED0", "#B7C850"] },
  background3: { primary: "#ffffff", second: "#DCDCDC", accent: "#FDC830" },
};
type c = "primary" | "second" | "accent";
watchEffect(() => {
  Object.keys(colors[editorOptions.value.background]).forEach((key) => {
    editorOptions.value.colors[key as c] = colors[
      editorOptions.value.background
    ][key as c] as string;
  });
});
</script>

<template>
  <div class="app">
    <TheEditor
      v-model="editorOptions"
      @changeColor="editorOptions.colors.primary = $event.primary"
      class="editor"
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

.editor {
  width: 30%;
}
.preview {
  width: 70%;
  margin-top: 70px;
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
