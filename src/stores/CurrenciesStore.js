import { defineStore } from "pinia";
const MAX_DIGITS_AFTER_POINT = 20;
export const useCurrenciesStore = defineStore("CurrenciesStore", {
  state: () => {
    return {
      currenciesToSetInTable: ["USD", "EUR", "UAH"],
      allCurrenciesInTable: ["USD", "EUR", "UAH", "BTC", "ETH"],
      currenciesInTable: [],
      currentCurrency: "USD",
      allCurrencies: [],
      chartData: {},
      ratesForCurrencies: [],
    };
  },
  getters: {


    getFilteredCurrenciesNames: (state) => (searchLetters) => {
      /* return only currencies which starts with passed letters in variables searchLetters and
       *    return currencies which not are in list already  */

      const filteredSearchArray = state.allCurrencies.filter((item) => {
        return (
          item.startsWith(searchLetters) &&
          !state.allCurrenciesInTable.includes(item)
        );
      });

      return (searchLetters.length > 2 && filteredSearchArray) || [];
    },
    getCurrenciesToSetInTable: (state) => state.currenciesToSetInTable,
    getAllCurrenciesInTable: (state) => state.currenciesInTable,
    getChartData: (state) => state.chartData,
    getFormattedRatesForCurrency:
      (state) =>
      (amount, currentCurrency = state.currentCurrency) => {
        const ratesForCurrency = state.ratesForCurrencies[currentCurrency];

        return (amount * ratesForCurrency)
          ?.toFixed(MAX_DIGITS_AFTER_POINT)
          .replace(/\.?0+$/, ""); /* delete all not denoting nulls */
      },
  },
  actions: {
    addNewCurrency(payload) {
      if (payload) {
        this.allCurrenciesInTable.push(payload);

        localStorage.setItem("currencies", this.allCurrenciesInTable);
      } else {
        if (localStorage.getItem("currencies")) {
          this.allCurrenciesInTable = [
            ...localStorage.getItem("currencies").split(","),
          ];
        } else {
          localStorage.setItem("currencies", this.allCurrenciesInTable);
        }
      }
    },
    async fetchAllCurrencies() {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist`
        );
        const data = await response.json();

        this.allCurrencies = Object.keys(data.Data);
      } catch (error) {
        alert(error);
      }
    },
    changeCurrentCurrency(payload) {
      this.currentCurrency = payload;
    },

    async fetchRatesForCheckedCurrency(currentCurrency, currenciesList) {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${currentCurrency}&tsyms=${currenciesList}`
        );

        this.ratesForCurrencies = await response.json();
      } catch (error) {
        alert(error);
      }
    },

    async fetchDataByCurrencyToPaint({ buy, sell }) {
      try {
        console.log("fetchDataByCurrencyToPaint", buy, sell);

        fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${buy}&tsym=${sell}&limit=10`
        )
          .then((response) => response.json())
          .then((data) => {
            this.chartData = {
              labels: data.Data.Data.map((item) =>
                new Date(item.time * 1000).toLocaleDateString()
              ),
              secondCurrencyData: data.Data.Data.map((item) => item.open),
              firstCurrencyData: data.Data.Data.map((item) => item.close),
              firstCurrency: sell,
              secondCurrency: buy,
            };
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error("fetchDataByCurrencyToPaint" + error);
      }
    },

    async fetchRatesByCurrency() {
      try {
        this.addNewCurrency();

        const currenciesToFetch = this.allCurrenciesInTable.join(",");
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=${this.currentCurrency}&fsyms=${currenciesToFetch}`
        );
        const data = await response.json();
        const tableData = Object.keys(data.DISPLAY).map((currency) => {
          const isImageExist =
            data.DISPLAY[currency][this.currentCurrency]["IMAGEURL"].includes(
              "no-image"
            );

          const currencyImage = !isImageExist
            ? `https://www.cryptocompare.com${
                data.DISPLAY[currency][this.currentCurrency]["IMAGEURL"]
              }`
            : null;

          const currencySymbol = isImageExist
            ? data.DISPLAY[currency][this.currentCurrency]["FROMSYMBOL"]
            : null;

          return {
            name: currency,
            rates: data.RAW[currency][this.currentCurrency]["PRICE"],
            image: currencyImage,
            symbol: currencySymbol,
          };
        });
        console.log(this.currenciesInTable, tableData);
        this.currenciesInTable = tableData;
      } catch (error) {
        console.error("fetchRatesByCurrency" + error);
      }
    },
  },
});
