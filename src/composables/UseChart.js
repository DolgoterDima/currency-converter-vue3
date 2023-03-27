import { LineChart } from "vue-chart-3";
import { ref, onMounted } from "vue";

import { storeToRefs } from "pinia";
import { useCurrenciesStore } from "@/stores/CurrenciesStore";
export function useChart() {
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
    /*  scales: {
             yAxes: [
               {
                 scaleLabel: {
                   display: true,
                   labelString: 'Value on Left Axis',
                 },
               },
             ],
             xAxes: [
               {
                 scaleLabel: {
                   display: true,
                   labelString: 'Label on Bottom Axis',
                 },
               },
             ],
           },*/
  };

  onMounted(() => {
    /*       console.log('33333333333333333333333333333333')
         chart.value.update();*/
  });

  return { chartData, chartOptions };
}
