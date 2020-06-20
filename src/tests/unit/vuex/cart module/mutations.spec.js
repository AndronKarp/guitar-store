import cart from "@/store/modules/cart";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("actions", () => {
  let state;
  let existingCartItem;
  let store;

  beforeEach(() => {
    state = cart.state;
    existingCartItem = { id: 0, quantity: 1 };
    store.state.cart.push(existingCartItem);
    store = new Vuex.Store({
      state: { ...cart.state },
      mutations: { ...cart.mutations }
    });
  });

  describe("pushToCart", () => {
    test("pushes passed object in cart array", () => {
      console.log(store.state.cart);
      const obj = {};
      store.commit("pushToCart", obj);
      expect(store.state.cart).toHaveLength(2);
      expect(store.state.cart).toContain(obj);
    });
  });

  describe("incrementQuantity", () => {
    test("increments quantity of existing cart item", () => {
      console.log(store.state.cart);
      store.commit("incrementQuantity", existingCartItem);
      expect(existingCartItem).toHaveProperty("quantity", 2);
    });
  });

  describe("removeCartItemFromCart", () => {
    test("removes existing cart item by his index", () => {
      console.log(store.state.cart);
      const existingCartItemIndex = store.state.cart.indexOf(existingCartItem);
      store.commit("removeCartItemFromCart", existingCartItemIndex);
      expect(store.state.cart).toHaveLength(0);
      expect(store.state.cart).not.toContain(existingCartItem);
    });
  });
});
