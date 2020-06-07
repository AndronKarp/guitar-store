export default {
  state: {
    guitars: []
  },
  getters: {
    guitars(state) {
      return state.guitars;
    },
    isGuitarInStock: state => guitarId =>
      state.guitars.find(item => item.id === guitarId).quantity > 0
  },
  mutations: {
    addToGuitars(state, guitar) {
      state.guitars.push(guitar);
    },
    decrementGuitarQuantity(state, guitarId) {
      state.guitars.find(item => item.id === guitarId).quantity--;
    }
  },
  actions: {
    addGuitar(store, guitar) {
      store.commit("addToGuitars", guitar);
    },
    updateGuitarQuantity(store, guitarId) {
      store.commit("decrementGuitarQuantity", guitarId);
    }
  }
};
