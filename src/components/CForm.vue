<template>
  <div class="form">

      <div class="form__side">
      <span class="form__title"> I sell: </span>
        <transition name="text-width" mode="out-in">
      <span class="form__title form__title--error" v-if="isMaximumReached">(maximum value {{ MAX_VALUE_TO_INPUT }})</span>
        </transition>
      <div class="form__input-wrapper">
        <input
          type="number"
          min="0"
          :max="MAX_VALUE_TO_INPUT"
          v-model.number="amount"
          class="form__input"
        />
      </div>
      <UIDropdown
        class="form__dropdown"
        :default="defaultCurrencies.sell"
        :list="options"
        @selected="onSelectChangedSell"
      />
      </div>
      <div class="form__side">
      <span class="form__title"> I get: </span>
      <div class="form__input-wrapper">

        <span class="form__amount">
          {{ getFormattedRatesForCurrency(amount, defaultCurrencies.buy) }}
        </span>
      </div>

      <UIDropdown
        class="form__dropdown"
        :default="defaultCurrencies.buy"
        :list="options"
        @selected="onSelectChangedBuy"
      />
      </div>

  </div>

</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
 import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
const currenciesStore = useCurrenciesStore();
const {   getFormattedRatesForCurrency } =
  storeToRefs(currenciesStore);
import UIDropdown from "@/components/ui/UIDropdown.vue";
const { fetchDataByCurrencyToPaint, fetchRatesForCheckedCurrency } =
  currenciesStore;

const MAX_VALUE_TO_INPUT = 10000;

const amount = ref(1);
const isMaximumReached = ref(false);
const options = ["USD", "EUR", "UAH", "GBP", "BTC", "ETH", "BNB", "XRP"];
const defaultCurrencies = reactive({
  sell: "USD",
  buy: "BTC",
});
const onSelectChangedSell = (currency) => {
  defaultCurrencies.sell = currency;
  fetchRatesForCheckedCurrency(currency, options);
  fetchDataByCurrencyToPaint(defaultCurrencies);
};
const onSelectChangedBuy = (currency) => {
  defaultCurrencies.buy = currency;
  fetchDataByCurrencyToPaint(defaultCurrencies);
};

watch(amount, async (newValue) => {
  if (newValue > MAX_VALUE_TO_INPUT) {
    isMaximumReached.value=true
     amount.value = MAX_VALUE_TO_INPUT;
    setTimeout(()=>{ isMaximumReached.value=false}, 2000)
  }
});

onMounted(() => {
  fetchRatesForCheckedCurrency(defaultCurrencies.sell, options);

  fetchDataByCurrencyToPaint(defaultCurrencies);
});
</script>
 