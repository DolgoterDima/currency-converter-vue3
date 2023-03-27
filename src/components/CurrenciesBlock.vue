<template>
  <div class="currencies-block">
    <div class="currencies-block__controls">
      <UIRadio
        class="currencies-block__radios"
        v-model="currentCurrency"
        @change="onRadioChange"
        :list="getCurrenciesToSetInTable"
      />

      <button
        type="button"
        class="currencies-block__button currencies-block__button--refresh"
        :class="isRefreshButtonDisabled && 'currencies-block__button--disabled'"
        ref="refreshButtonRef"
        @click="refreshButton()"
        :disabled="isRefreshButtonDisabled"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"         class="currencies-block__icon"
        >
          <path
            d="M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
          />
        </svg>
      </button>
    </div>

    <div class="currencies-block__list">
      <div class="currencies-block__row">
        <span class="currencies-block__name">Currency</span>
        <span class="currencies-block__value">Value</span>
      </div>

      <div
        class="currencies-block__row"
        v-for="(currency, index) in getAllCurrenciesInTable"
        :key="index"
      >
        <span class="currencies-block__name">
          <img
            v-if="currency.image"
            width="20px"
            height="20px"
            class="currencies-block__image"
            :src="`${currency.image}`"
            :alt="currency.name"
          />
          <span v-if="currency.symbol" class="currencies-block__symbol">
            {{ currency.symbol }}
          </span>

          {{ currency.name }}
        </span>
        <span class="currencies-block__value">{{
          currency.rates || "No data"
        }}</span>
      </div>
    </div>


    <ModalComponent :isOpen="isOpenModal" @close="closeModal"  class="page__modal" >
      <template #header>Add new currencies. Type currency name in english </template>
    </ModalComponent>
    <button class="currencies-block__button currencies-block__button--add-new" @click="openModal">Add new currency</button>
  </div>
</template>

<script setup>
import {useModal} from '@/composables/UseModal';

const MILLISECONDS_TO_DISABLE_BUTTON = 5000;
import ModalComponent from '@/components/ModalComponent.vue';
import { throttle } from "lodash";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
const { isOpenModal, openModal, closeModal } = useModal();


import UIRadio from "@/components/UIRadio.vue";

const currenciesStore = useCurrenciesStore();

const currentCurrency = ref("USD");

const { getAllCurrenciesInTable, getCurrenciesToSetInTable } =
  storeToRefs(currenciesStore);
const { fetchRatesByCurrency, changeCurrentCurrency } = currenciesStore;

const isRefreshButtonDisabled = ref(false);

const onRadioChange = (e) => {
  currentCurrency.value = e;
  changeCurrentCurrency(currentCurrency);
  fetchRatesByCurrency();
};

const refreshButton = throttle(() => {
  disableRefreshButton();
  fetchRatesByCurrency();
}, MILLISECONDS_TO_DISABLE_BUTTON);
const disableRefreshButton = () => {
  isRefreshButtonDisabled.value = true;
  setTimeout(() => {
    isRefreshButtonDisabled.value = false;
  }, MILLISECONDS_TO_DISABLE_BUTTON);
};

onMounted(() => {
  changeCurrentCurrency(currentCurrency.value);
  fetchRatesByCurrency();
});
</script>
