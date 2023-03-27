<template>
  <teleport to="#modal-container">
    <div class="modal" v-if="props.isOpen">
      <div class="modal__wrapper" v-click-outside="closeModal">
        <div class="modal__container">
          <div class="modal__header">
            <slot name="header"></slot>
            <button
              @click.stop="closeModal"
              class="modal__button modal__button--close"
            >
              x
            </button>
          </div>
          <div class="modal__body">


            <input
              style="text-transform: uppercase"
              type="search"
              placeholder="USDT"
              v-model="currencySearch"
              @input="searchCurrency()"
              class="modal__input"
            />

            <div
              class="modal__buttons"
              v-if="
                getFilteredCurrenciesNames(currencySearch.toUpperCase()).length
              "
            >
              <button
                type="button"
                class="modal__button modal__button--currency"
                @click.stop="addNewCurrencyHandler(item)"
                v-for="(item, index) in getFilteredCurrenciesNames(
                  currencySearch.toUpperCase()
                )"
                :key="index"
              >
                {{ item }}
              </button>
            </div>
            <span
              class="modal__error"
              v-if="
                currencySearch.length > 2 &&
                !getFilteredCurrenciesNames(currencySearch.toUpperCase()).length
              "
            >
              No currency or this currency already in list
            </span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, ref, defineEmits } from "vue";
import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["close"]);

const currenciesStore = useCurrenciesStore();

const currencySearch = ref("");
const currenciesNames = ref([]);

const isOpen = ref(props.isOpen);
const closeModal = () => {
  emit("close");
  console.log("close");
};
const openModal = () => {
  isOpen.value = true;
};
/* import getters and make them reactive */
const { getAllCurrenciesInTable, getFilteredCurrenciesNames } =
  storeToRefs(currenciesStore);
const { addNewCurrency, fetchAllCurrencies, fetchRatesByCurrency } =
  currenciesStore;

const searchCurrency = () => {
  if (currencySearch.value.length <= 2) return;
  fetchAllCurrencies(currencySearch.value.toUpperCase());
};

const addNewCurrencyHandler = (currency) => {
  addNewCurrency(currency);
  fetchRatesByCurrency();
};

onMounted(() => {
  fetchAllCurrencies();
});
</script>
