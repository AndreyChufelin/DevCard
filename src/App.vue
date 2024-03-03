<script setup lang="ts">
import { ref } from "vue";
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
  };

  return defaultOptions;
}

const editorOptions = ref(setDefaultOptions());

function clearOptions() {
  editorOptions.value = setDefaultOptions();
}
</script>

<template>
  <div class="app">
    <TheEditor v-model="editorOptions" class="editor" />
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
