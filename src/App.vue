<script setup lang="ts">
import ArrowIcon from "./components/icons/ArrowIcon.vue";
import PhoneIcon from "./components/icons/PhoneIcon.vue";
import DesktopIcon from "./components/icons/DesktopIcon.vue";
</script>

<template>
  <div class="app">
    <div class="editor">
      <h1 class="app__title app__title_editor">DevCard</h1>
      <div class="editor__group">
        <h2 class="editor__title">Информация</h2>
        <label class="input-field">
          Имя<input class="input-field__input" type="text" name="" id="" />
        </label>
        <label class="input-field">
          Должность<input
            class="input-field__input"
            type="text"
            name=""
            id=""
          />
        </label>
        <label class="input-field">
          Навыки<input class="input-field__input" type="text" name="" id="" />
        </label>
        <label class="input-field">
          Ссылки
          <input class="input-field__input" type="text" name="" id="" />
          <input class="input-field__input" type="text" name="" id="" />
          <input class="input-field__input" type="text" name="" id="" />
          <button class="button">+ Добавить</button>
        </label>
      </div>
      <div class="editor__group">
        <h2 class="editor__title">Цвета</h2>
        <div class="input-field">
          Основной
          <div class="input-field__color">
            <input
              class="input-field__color-picker"
              type="color"
              name=""
              id=""
            />
            <input class="input-field__color-input" type="text" name="" id="" />
          </div>
        </div>
        <div class="input-field">
          Дополнительный
          <div class="input-field__color">
            <input
              class="input-field__color-picker"
              type="color"
              name=""
              id=""
            />
            <input class="input-field__color-input" type="text" name="" id="" />
          </div>
        </div>
      </div>
      <div class="editor__group">
        <h2 class="editor__title"><ArrowIcon /> Задний фон</h2>
        <div class="input-field">
          Информация
          <div class="input-field__select">
            <img
              class="input-field__select-item"
              src="D:\downloads\ssss.png"
              alt=""
            />
            <img
              class="input-field__select-item"
              src="D:\downloads\ssss.png"
              alt=""
            />
            <img
              class="input-field__select-item"
              src="D:\downloads\ssss.png"
              alt=""
            />
            <img
              class="input-field__select-item"
              src="D:\downloads\ssss.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="preview">
      <h1 class="app__title app__title_preview">DevCard</h1>
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

h1 {
  background-color: var(--gradient-first-color);
  background-image: var(--gradient);

  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
.editor {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 30px;
  container-type: inline-size;
}
.editor__title {
  display: flex;
  align-items: center;
}
.editor__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.app__title_preview {
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
  .app__title {
    display: none;
  }
  .app__title_preview {
    display: block;
  }
}
</style>
