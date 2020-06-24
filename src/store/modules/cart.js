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
    incrementQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    removeCartItemFromCart(state, cartItemIndex) {
      state.cart.splice(cartItemIndex, 1);
    }
  },
  actions: {
    addToCart({ state, commit }, { id, brand, model, price }) {
      const cartItem = state.cart.find(cartItem => cartItem.id === id);
      cartItem
        ? commit("incrementQuantity", cartItem)
        : commit("pushToCart", {
            id,
            brand,
            model,
            price,
            quantity: 1
          });
    },
    removeCartItem({ state, commit }, { id }) {
      const cartItemIndex = state.cart.findIndex(
        cartItem => cartItem.id === id
      );
      commit("removeCartItemFromCart", cartItemIndex);
    }
  }
};
