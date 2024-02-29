<script setup lang="ts">
import { computed } from "vue";
import VueInput from "./VueInput.vue";
import CrossIcon from "./icons/CrossIcon.vue";
import TelegramIcon from "./icons/TelegramIcon.vue";
import PhoneNumberIcon from "./icons/PhoneNumberIcon.vue";
import GithubIcon from "./icons/GithubIcon.vue";
import EmailIcon from "./icons/EmailIcon.vue";
import LinkedinIcon from "./icons/LinkedinIcon.vue";
import FacebookIcon from "./icons/FacebookIcon.vue";
import InputSocialsToolbar, {
  SocialsAddEvent,
} from "./InputSocialsToolbar.vue";

export interface SocialItem {
  text: string;
  type: string;
}
export interface SocialsListItem {
  icon: typeof TelegramIcon | typeof GithubIcon;
  type: string;
}

const items = defineModel<SocialItem[]>({
  required: true,
});

function addItem(event: SocialsAddEvent) {
  const type = event.type;
  if (items.value.length >= 4) {
    event.errorCallback();
    return;
  }

  items.value.push({ text: "", type: type });
}

const addItemsList = computed(() => {
  const result: SocialsListItem[] = [];
  Object.entries(socialsList).forEach(([key, value]) => {
    if (items.value.some((i) => key === i.type)) return;
    result.push(value);
  });

  return result;
});

const socialsList: {
  [key: string]: SocialsListItem;
} = {
  tg: {
    icon: TelegramIcon,
    type: "tg",
  },
  github: {
    icon: GithubIcon,
    type: "github",
  },
  email: {
    icon: EmailIcon,
    type: "email",
  },
  phone: {
    icon: PhoneNumberIcon,
    type: "phone",
  },
  facebook: {
    icon: FacebookIcon,
    type: "facebook",
  },
  linkedin: {
    icon: LinkedinIcon,
    type: "linkedin",
  },
};
</script>

<template>
  <div class="socials">
    <TransitionGroup name="list">
      <div
        v-for="(item, index) in items"
        :key="item.type"
        class="socials__field"
      >
        <VueInput v-model="item.text" class="socials__input">
          <template #icon>
            <component :is="socialsList[item.type].icon" />
          </template>
        </VueInput>
        <button @click="items.splice(index, 1)" class="socials__delete-button">
          <CrossIcon class="cross" />
        </button>
      </div>
    </TransitionGroup>
    <InputSocialsToolbar :list="addItemsList" @add="addItem" />
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
  max-height: 100px;
  transform: scale(1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scale(0);
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.socials__field {
  display: flex;
  align-items: center;
  gap: 5px;
}
.socials__input {
  flex: 1;
}

.socials__delete-button {
  display: flex;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  transition: color 0.3s;
}
.socials__delete-button:hover {
  color: var(--gradient-first-color);
}
.cross {
  width: 100%;
  height: 100%;
}
</style>
