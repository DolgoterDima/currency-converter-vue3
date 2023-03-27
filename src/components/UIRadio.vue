<template>
  <div class="radio" v-for="(currency, index) in list">
     <input
        type="radio"
        name="currency"
        :id="`radio_${index}`"
        :value="currency"
        class="radio__input"
        @change="onChange(currency)"
        :checked="currency===modelValue"
    />
    <label :for="`radio_${index}`"         class="radio__label"
    >
      {{ currency }}
    </label>

  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: 'USD'
  },
  list: {
    type: Array,
    required: true
  },
});
const emits = defineEmits(["change1"]);
const onChange = (currency) => {

  emits("change", currency);
};
</script>
