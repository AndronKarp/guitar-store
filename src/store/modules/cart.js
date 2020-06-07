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
    pushGuitarToCart(state, guitar) {
      state.cart.push(guitar);
    },
    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    }
  },
  actions: {
    addGuitarToCart(context, guitar) {
      const cartItem = context.state.cart.find(item => item.id === guitar.id);
      cartItem
        ? context.commit("incrementCartItemQuantity", cartItem)
        : context.commit("pushGuitarToCart", {
            id: guitar.id,
            brand: guitar.brand,
            model: guitar.model,
            price: guitar.price,
            quantity: 1
          });
    }
  }
};
