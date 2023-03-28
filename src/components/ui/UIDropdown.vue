<template>
  <div
    class="dropdown"
    @click="toggleDropdown"
    :class="isDropdownOpen && 'dropdown--open'"
    v-click-outside="closeDropdown"
  >
    <div class="dropdown__header">
      {{ props.default }}
      <svg
        class="dropdown__arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        id="caret-down"
      >
        <rect width="256" height="256" fill="none" />
        <polyline
          fill="none"
          stroke="#000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
          points="208 96 128 176 48 96"
        />
      </svg>
    </div>
    <ul v-if="isDropdownOpen" class="dropdown__list" @click="toggleDropdown">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="selectValue(item)"
        class="dropdown__item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
const props = defineProps(["list", "default"]);
const emits = defineEmits(["value"]);

import { ref } from "vue";

const selectedValue = ref(props.list[0]);
const isDropdownOpen = ref(false);

const emit = (value) => {
  selectedValue.value = value;
  isDropdownOpen.value = false;
  emits("selected", value);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const closeDropdown = () => {
  isDropdownOpen.value = false;
};
const selectValue = (value) => {
  emit(value);
};
</script>
