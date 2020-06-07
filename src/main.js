import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import BootstrapVue from "./plugins/bootstrap-vue";
import VueCurrencyFilter from "./plugins/vue-currency-filter";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  BootstrapVue,
  VueCurrencyFilter,
  render: h => h(App)
}).$mount("#app");
