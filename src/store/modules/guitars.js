export default {
  state: {
    guitars: [],
    areGuitarsLoaded: false
  },
  getters: {
    guitars(state) {
      return state.guitars;
    },
    areGuitarsLoaded(state) {
      return state.areGuitarsLoaded;
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
    },
    updateAreGuitarsLoadedStatus(state, status) {
      state.areGuitarsLoaded = status;
    }
  },
  actions: {
    addGuitar(store, guitar) {
      store.commit("addToGuitars", guitar);
    },
    updateGuitarQuantity(store, guitarId) {
      store.commit("decrementGuitarQuantity", guitarId);
    },
    setAreGuitarsLoadedStatusToTrue(store) {
      store.commit("updateAreGuitarsLoadedStatus", true);
    }
  }
};
