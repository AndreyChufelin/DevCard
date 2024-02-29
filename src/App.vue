<script setup lang="ts">
import { ref } from "vue";
import PhoneIcon from "./components/icons/PhoneIcon.vue";
import DesktopIcon from "./components/icons/DesktopIcon.vue";
import TheEditor, { EditorOptions } from "./components/TheEditor.vue";

const editorOptions = ref<EditorOptions>({
  info: {
    name: "",
    jobTitle: "",
    skills: [],
    socials: [{text: "", type: "tg"},{text: "", type: "github"},{text: "", type: "email"},],
  },
});
</script>

<template>
  <div class="app">
    <TheEditor v-model="editorOptions" class="editor" />
    <div class="preview">
      <h1 class="app-title">DevCard</h1>
      <h2 class="preview__title">
        Пред просмотр
        <div class="preview__title_toolbar">
          <button class="link"><DesktopIcon /></button>
          <button class="link"><PhoneIcon /></button>
        </div>
      </h2>
      <img
        class="preview__image"
        src="D:\downloads\filename(23).png"
        alt="Card's preview"
      />
      <p>{{ editorOptions.info }}</p>
      <div class="preview__toolbar">
        <button class="button download-button">Скачать</button>
        <button class="button-dark">Сбросить</button>
      </div>
    </div>
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
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 70%;
  margin-top: 70px;
}
.preview__image {
  width: 100%;
  border: 5px solid var(--additional-background-color);
  border-radius: 30px;
}
.preview__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  container-type: inline-size;
}
@container (max-width: 500px) {
  .preview__toolbar > * {
    width: 100%;
  }
}

.app-title {
  display: none;
}
.preview__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.preview__title_toolbar {
  font-size: 14px;
  display: flex;
  gap: 10px;
}

.download-button {
  padding: 15px 60px;
}

@media (max-width: 992px) {
  .app {
    flex-direction: column-reverse;
  }
  .editor,
  .preview {
    width: 100%;
    margin-top: 0px;
  }
  .app-title {
    display: block;
  }
}
</style>
