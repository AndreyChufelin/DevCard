<script setup lang="ts">
import InputColor from "./InputColor.vue";
import { Gradient } from "./InputColorGradient.vue";
import InputColorSwitch from "./InputColorSwitch.vue";
import InputField from "./InputField.vue";
import InputSocials, { SocialItem } from "./InputSocials.vue";
import InputTags from "./InputTags.vue";
import VueAccordion from "./VueAccordion.vue";
import VueInput from "./VueInput.vue";

export interface EditorOptions {
  info: {
    name: string;
    jobTitle: string;
    skills: string[];
    socials: SocialItem[];
  };
  colors: {
    additional: string | Gradient;
  };
}

defineProps<{
  modelValue: EditorOptions;
}>();
</script>

<template>
  <div class="editor">
    <h1 class="app-title">DevCard</h1>
    <VueAccordion>
      <template #title><h2>Информация</h2></template>
      <template #default>
        <div class="editor__group">
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
      </template>
    </VueAccordion>
    <!-- <div class="editor__group">
      <h2 class="editor__title"></h2>
    </div> -->
    <VueAccordion>
      <template #title>
        <h2>Цвета</h2>
      </template>
      <template #default>
        <div class="editor__group">
          <InputField title="Основной">
            <InputColor />
          </InputField>
          <InputField title="Дополнительный">
            <InputColorSwitch v-model="modelValue.colors.additional" />
          </InputField>
        </div>
      </template>
    </VueAccordion>
    <VueAccordion>
      <template #title><h2>Задний фон</h2></template>
      <template #default>
        <div class="editor__group">
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
      </template>
    </VueAccordion>
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
