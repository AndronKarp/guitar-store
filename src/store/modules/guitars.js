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
      state.guitars.find(guitar => guitar.id === guitarId).quantity > 0
  },
  mutations: {
    pushToGuitars(state, guitar) {
      state.guitars.push(guitar);
    },
    decrementGuitarQuantity(state, guitarId) {
      state.guitars.find(guitar => guitar.id === guitarId).quantity--;
    },
    updateAreGuitarsFetchedStatus(state, status) {
      state.areGuitarsFetched = status;
    }
  },
  actions: {
    addToGuitars(store, guitar) {
      store.commit("pushToGuitars", guitar);
    },
    updateGuitarQuantity(store, guitarId) {
      store.commit("decrementGuitarQuantity", guitarId);
    },
    setAreGuitarsFetchedStatusToTrue(store) {
      store.commit("updateAreGuitarsFetchedStatus", true);
    }
  }
};
