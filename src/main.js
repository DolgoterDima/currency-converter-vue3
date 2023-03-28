import { createApp } from "vue";
import App from "./App.vue";

import lodash from "lodash";

import { createPinia } from "pinia";
const pinia = createPinia();

import vClickOutside from "click-outside-vue3";

import "@/assets/scss/index.scss";
const app = createApp(App);

app.directive(vClickOutside.directive);

app.use(pinia);
app.use(lodash);
app.use(vClickOutside);
app.mount("#app");
