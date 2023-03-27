<template>
  <div class="chart">
    <!--
    <line-chart ref="chart"    class="chart__canvas"
                        :chartData="chartData" :options="chartOptions" />
-->

    <canvas ref="canvasRef" class="chart__canvas" id="chart"></canvas>
    <!--   1<pre>{{chartData.datasets[0].label}}</pre>2-->
  </div>
</template>

<script setup>
import { LineChart } from "vue-chart-3";
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
const currenciesStore = useCurrenciesStore();
const { getChartData } = storeToRefs(currenciesStore);

const chartData = {
  labels: getChartData.value.labels,
  datasets: [
    {
      label: `Currency ${getChartData.value.firstCurrency}`,
      backgroundColor: "#f87979",
      data: getChartData.value.firstCurrencyData,
    },
    {
      label: `Currency ${getChartData.value.secondCurrency}`,
      backgroundColor: "#7f7fff",
      data: getChartData.value.secondCurrencyData,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const canvasRef = ref(null);
let myChart;

onMounted(() => {
  myChart = new Chart(canvasRef.value, {
    type: "line",
    data: chartData,
    options: chartOptions,
  });
});
</script>
