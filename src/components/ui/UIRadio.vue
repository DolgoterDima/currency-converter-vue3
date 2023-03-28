<template>
  <div class="radio" v-for="(currency, index) in list" :key="index">
    <input
      type="radio"
      name="currency"
      :id="`radio_${index}`"
      :value="currency"
      class="radio__input"
      @change="onChange(currency)"
      :checked="currency === modelValue"
    />
    <label :for="`radio_${index}`" class="radio__label">
      {{ currency }}
    </label>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  modelValue: {
    type: String,
    default: "USD",
  },
  list: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["change"]);
const onChange = (currency) => {
  emits("change", currency);
};
</script>
