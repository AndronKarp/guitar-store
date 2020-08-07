import { cartsRef } from "@/configs/firebase";

export default {
  state: {
    cart: []
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
    isCartEmpty(state) {
      return !state.cart.length;
    }
  },
  mutations: {
    pushToCart(state, guitar) {
      state.cart.push(guitar);
    },
    setCartItemQuantity(state, { cartItemId, quantity }) {
      const cartItem = state.cart.find(cartItem => cartItem.id === cartItemId);
      cartItem.quantity = quantity;
    },
    removeCartItemFromCart(state, cartItemIndex) {
      state.cart.splice(cartItemIndex, 1);
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    setCartChildAddedListener(store, userId) {
      cartsRef.child(userId).on("child_added", snapshot => {
        store.commit("pushToCart", { ...snapshot.val(), id: snapshot.key });
      });
    },
    setCartChildUpdatedListener(store, userId) {
      cartsRef.child(userId).on("child_changed", snapshot => {
        store.commit("setCartItemQuantity", {
          cartItemId: snapshot.key,
          quantity: snapshot.val().quantity
        });
      });
    },
    setCartChildRemovedListener({ state, commit }, userId) {
      cartsRef.child(userId).on("child_removed", snapshot => {
        const removedCartItemIndex = state.cart.findIndex(
          cartItem => cartItem.id === snapshot.key
        );
        commit("removeCartItemFromCart", removedCartItemIndex);
      });
    },
    resetCart(store, userId) {
      cartsRef.child(userId).off();
      store.commit("clearCart");
    }
  }
};
