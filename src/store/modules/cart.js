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
    }
  },
  actions: {
    addToCart(context, guitar) {
      const cartItem = context.state.cart.find(item => item.id === guitar.id);
      cartItem
        ? context.commit("incrementQuantity", cartItem)
        : context.commit("pushToCart", {
            id: guitar.id,
            brand: guitar.brand,
            model: guitar.model,
            price: guitar.price,
            quantity: 1
          });
    }
  }
};
