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
    increaseGuitarQuantity(state, { guitar, value }) {
      guitar.quantity += value;
    },
    updateAreGuitarsFetchedStatus(state, status) {
      state.areGuitarsFetched = status;
    }
  },
  actions: {
    addToGuitars(store, guitar) {
      store.commit("pushToGuitars", guitar);
    },
    updateGuitarQuantity(context, { guitarId, value }) {
      const guitar = context.state.guitars.find(
        guitar => guitar.id === guitarId
      );
      context.commit("increaseGuitarQuantity", { guitar, value });
    },
    setAreGuitarsFetchedStatusToTrue(store) {
      store.commit("updateAreGuitarsFetchedStatus", true);
    }
  }
};
