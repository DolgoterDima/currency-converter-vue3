<template>
  <div class="page">
    <CForm  class="page__form" />
    <CChart
        class="page__chart"
        v-if="getChartData.firstCurrencyData"
        :key="getChartData"
    />
    <CurrenciesBlock  class="page__currencies-block" />



  </div>
</template>

<script setup>
import CChart from "@/components/CChart.vue";

 import CurrenciesBlock from "@/components/CurrenciesBlock.vue";
import CForm from "@/components/CForm.vue";

import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
const currenciesStore = useCurrenciesStore();

const { getChartData } =
    storeToRefs(currenciesStore);
</script>
