import cart from "@/store/modules/cart";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("getters", () => {
  let store;
  let state;

  beforeEach(() => {
    state = {
      cart: [
        { quantity: 10, price: 123 },
        { quantity: 5, price: 299 },
        { quantity: 2, price: 43 }
      ]
    };
    store = new Vuex.Store({ state, getters: cart.getters });
  });

  describe("cartTotal", () => {
    test("counts a sum of all products in the cart", () => {
      const expected = 10 * 123 + 5 * 299 + 2 * 43;
      expect(store.getters.cartTotal).toBe(expected);
    });
  });
});
