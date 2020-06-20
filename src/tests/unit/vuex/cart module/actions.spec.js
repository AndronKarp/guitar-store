import cart from "@/store/modules/cart";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("actions", () => {
  let existingCartItem;
  let state;
  let mutations;
  let store;

  beforeEach(() => {
    existingCartItem = {
      id: 0,
      quantity: 1
    };
    state = {
      cart: [existingCartItem]
    };
    mutations = {
      pushToCart: jest.fn(),
      incrementQuantity: jest.fn(),
      removeCartItemFromCart: jest.fn()
    };
    store = new Vuex.Store({
      state,
      mutations,
      actions: cart.actions
    });
  });

  describe("addToCart", () => {
    test("commits pushToCart mutation if passed object has unique for cart array ID property", () => {
      const uniqueCartItem = { id: "unique" };
      store.dispatch("addToCart", uniqueCartItem);
      expect(mutations.pushToCart).toHaveBeenCalledWith(
        state,
        expect.objectContaining(uniqueCartItem)
      );
    });

    test("commits incrementQuantity mutation for cart item which ID equals to ID of passed object", () => {
      store.dispatch("addToCart", existingCartItem);
      expect(mutations.incrementQuantity).toHaveBeenCalledWith(
        state,
        existingCartItem
      );
    });
  });

  describe("removeCartItem", () => {
    test("commits removeCartItemFromCart mutation", () => {
      store.dispatch("removeCartItem", existingCartItem);
      expect(mutations.removeCartItemFromCart).toHaveBeenCalledWith(
        state,
        state.cart.indexOf(existingCartItem)
      );
    });
  });
});
