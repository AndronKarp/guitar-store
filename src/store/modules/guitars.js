export default {
  state: {
    guitars: [],
    areGuitarsFetched: false
  },
  getters: {
    guitars(state) {
      return state.guitars;
    },
    areGuitarsFetched(state) {
      return state.areGuitarsFetched;
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
    updateAreGuitarsFetchedStatus(state, status) {
      state.areGuitarsFetched = status;
    }
  },
  actions: {
    addGuitar(store, guitar) {
      store.commit("addToGuitars", guitar);
    },
    updateGuitarQuantity(store, guitarId) {
      store.commit("decrementGuitarQuantity", guitarId);
    },
    setAreGuitarsFetchedStatusToTrue(store) {
      store.commit("updateAreGuitarsFetchedStatus", true);
    }
  }
};
