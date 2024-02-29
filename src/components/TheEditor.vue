<script setup lang="ts">
import InputField from "./InputField.vue";
import InputSocials, { SocialItem } from "./InputSocials.vue";
import InputTags from "./InputTags.vue";
import VueInput from "./VueInput.vue";
import ArrowIcon from "./icons/ArrowIcon.vue";

export interface EditorOptions {
  info: {
    name: string;
    jobTitle: string;
    skills: string[];
    socials: SocialItem[];
  };
}

defineProps<{
  modelValue: EditorOptions;
}>();
</script>

<template>
  <div class="editor">
    <h1 class="app-title">DevCard</h1>
    <div class="editor__group">
      <h2 class="editor__title">Информация</h2>
      <InputField tag="label" title="Имя">
        <VueInput v-model="modelValue.info.name" />
      </InputField>
      <InputField tag="label" title="Должность">
        <VueInput v-model="modelValue.info.jobTitle" />
      </InputField>
      <InputField title="Навыки (Enter)">
        <InputTags v-model="modelValue.info.skills" />
      </InputField>
      <InputField title="Ссылки">
        <InputSocials v-model="modelValue.info.socials" />
      </InputField>
    </div>
    <div class="editor__group">
      <h2 class="editor__title">Цвета</h2>
      <div class="input-field">
        Основной
        <div class="input-field__color">
          <input class="input-field__color-picker" type="color" name="" id="" />
          <input class="input-field__color-input" type="text" name="" id="" />
        </div>
      </div>
      <div class="input-field">
        Дополнительный
        <div class="input-field__color">
          <input class="input-field__color-picker" type="color" name="" id="" />
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
</template>
<style scoped>
.editor {
  display: flex;
  flex-direction: column;
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

@media (max-width: 992px) {
  .app-title {
    display: none;
  }
}
</style>
