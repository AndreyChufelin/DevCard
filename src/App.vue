<script setup lang="ts">
import { ref } from "vue";
import { EditorOptions } from "./composables/cardCanvas";
import TheEditor from "./components/TheEditor.vue";
import ThePreview from "./components/ThePreview.vue";

const editorOptions = ref<EditorOptions>({
  info: {
    name: "",
    jobTitle: "",
    skills: [],
    socials: [
      { text: "", type: "tg" },
      { text: "", type: "github" },
      { text: "", type: "email" },
    ],
  },
  colors: {
    primary: "#ffffff",
    second: "#828284",
    accent: ["#4158d0", "#c850c0"],
  },
});
</script>

<template>
  <div class="app">
    <TheEditor v-model="editorOptions" class="editor" />
    <ThePreview :canvasOptions="editorOptions" />
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
