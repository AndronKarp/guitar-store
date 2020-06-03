import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import BootstrapVue from "./plugins/bootstrap-vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  BootstrapVue,
  render: h => h(App)
}).$mount("#app");
