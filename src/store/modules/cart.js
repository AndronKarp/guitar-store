import { cartsRef } from "@/configs/firebase";

export default {
  state: {
    cartId: null,
    cart: [],
    isCartFetched: false
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    cartTotal(state) {
      return state.cart.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );
    },
    isCartFetched(state) {
      return state.isCartFetched;
    },
    isCartEmpty(state) {
      return state.cart.length === 0;
    }
  },
  mutations: {
    setCartId(state, value) {
      state.cartId = value;
    },
    pushToCart(state, guitar) {
      state.cart.push(guitar);
    },
    setIsCartFetchedStatusToTrue(state) {
      state.isCartFetched = true;
    },
    setCartItemQuantity(state, { cartItemId, value }) {
      const cartItem = state.cart.find(cartItem => cartItem.id === cartItemId);
      cartItem.quantity = value;
    },
    removeCartItemFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    resetCart(state) {
      state.cart = [];
    }
  },
  actions: {
    updateCartId(store, value) {
      store.commit("setCartId", value);
    },
    fetchCart({ state, commit }) {
      cartsRef.child(state.cartId).once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          commit("pushToCart", {
            ...childSnapshot.val(),
            id: childSnapshot.key
          });
        });
        commit("setIsCartFetchedStatusToTrue");
      });
    },
    async addToCart({ state, commit }, { id, brand, model, price }) {
      const cartItem = { brand, model, price, quantity: 1 };
      await cartsRef
        .child(state.cartId)
        .child(id)
        .set(cartItem);
      commit("pushToCart", { ...cartItem, id });
    },
    async updateCartItemQuantity({ state, commit }, { cartItemId, value }) {
      await cartsRef
        .child(state.cartId)
        .child(cartItemId)
        .update({ quantity: value });
      commit("setCartItemQuantity", { cartItemId, value });
    },
    removeFromCart({ state, commit }, cartItem) {
      cartsRef
        .child(state.cartId)
        .child(cartItem.id)
        .remove();
      const cartItemIndex = state.cart.indexOf(cartItem);
      commit("removeCartItemFromCart", cartItemIndex);
    },
    clearCart(store) {
      store.commit("resetCart");
    }
  }
};
