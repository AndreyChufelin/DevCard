<script setup lang="ts">
import { DrawOptions } from "../composables/cardCanvas";
import InputBackground from "./InputBackground.vue";
import InputColor from "./InputColor.vue";
import InputColorSwitch from "./InputColorSwitch.vue";
import InputField from "./InputField.vue";
import InputSocials from "./InputSocials.vue";
import InputTags from "./InputTags.vue";
import VueAccordion from "./VueAccordion.vue";
import VueInput from "./VueInput.vue";

defineProps<{
  modelValue: DrawOptions;
}>();
</script>

<template>
  <div
    class="editor"
    :class="{
      small: modelValue.size === 'small',
      large: modelValue.size === 'large',
    }"
  >
    <h1 class="app-title">DevCard</h1>
    <VueAccordion>
      <template #title><h2>Информация</h2></template>
      <template #default>
        <div class="editor__group">
          <InputField tag="label" title="Имя">
            <VueInput v-model="modelValue.info.name" :maxLength="32" />
          </InputField>
          <InputField tag="label" title="Должность">
            <VueInput v-model="modelValue.info.jobTitle" :maxLength="32" />
          </InputField>
          <InputField title="Навыки (Enter)">
            <InputTags v-model="modelValue.info.skills" />
          </InputField>
          <InputField title="Ссылки">
            <InputSocials v-model="modelValue.info.socials" />
          </InputField>
          <InputField tag="label" title="QR-код">
            <VueInput v-model="modelValue.info.qrcode" />
          </InputField>
        </div>
      </template>
    </VueAccordion>
    <VueAccordion>
      <template #title>
        <h2>Цвета</h2>
      </template>
      <template #default>
        <div class="editor__group">
          <InputField title="Основной">
            <InputColor v-model="modelValue.colors.primary" />
          </InputField>
          <InputField title="Дополнительный">
            <InputColor v-model="modelValue.colors.second" />
          </InputField>
          <InputField title="Акцентный">
            <InputColorSwitch v-model="modelValue.colors.accent" />
          </InputField>
        </div>
      </template>
    </VueAccordion>
    <VueAccordion>
      <template #title><h2>Задний фон</h2></template>
      <template #default>
        <InputBackground v-model="modelValue.background" />
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
  transition: width 0.3s;
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

.large {
  width: 30%;
}
.small {
  width: 70%;
}

@media (max-width: 992px) {
  .app-title {
    display: none;
  }
  .editor {
    width: 100%;
    margin-top: 0;
  }

  .small {
    width: 100%;
  }
  .large {
    width: 100%;
  }
}
</style>
