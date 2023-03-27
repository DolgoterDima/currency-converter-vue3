<template>
  <div class="home">
    <CForm />
    <CChart
        class="form__chart"
        v-if="getChartData.firstCurrencyData"
        :key="getChartData"
    />
    <CurrenciesBlock />

    <ModalComponent :isOpen="isOpenModal" @close="closeModal">
      <template #header>header</template>
    </ModalComponent>
    <button @click="openModal">open modal1</button>
  </div>
</template>

<script setup>
import CChart from "@/components/CChart.vue";

import ModalComponent from "@/components/ModalComponent.vue";
import CurrenciesBlock from "@/components/CurrenciesBlock.vue";
import CForm from "@/components/CForm.vue";
import { useModal } from "@/composables/UseModal";
import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
const currenciesStore = useCurrenciesStore();
const { isOpenModal, openModal, closeModal } = useModal();
const { getChartData } =
    storeToRefs(currenciesStore);
</script>
