import Vue from "vue";
import Vuex from "vuex";
import guitars from "./modules/guitars";
import cart from "./modules/cart";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    guitars,
    cart,
    user
  }
});
