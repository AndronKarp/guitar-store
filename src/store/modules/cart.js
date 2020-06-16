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
        (total, item) => total + item.price * item.quantity,
        0
      );
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
    addToCart(context, { id, brand, model, price }) {
      const cartItem = context.state.cart.find(item => item.id === id);
      cartItem
        ? context.commit("incrementQuantity", cartItem)
        : context.commit("pushToCart", {
            id,
            brand,
            model,
            price,
            quantity: 1
          });
    },
    removeCartItem(context, { id }) {
      const cartItemIndex = context.state.cart.findIndex(
        cartItem => cartItem.id === id
      );
      context.commit("removeCartItemFromCart", cartItemIndex);
    }
  }
};
