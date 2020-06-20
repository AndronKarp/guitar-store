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
    }
  },
  mutations: {
    pushToGuitars(state, guitar) {
      state.guitars.push(guitar);
    },
    setNewGuitarQuantity(state, { guitar, value }) {
      guitar.quantity = value;
    },
    updateAreGuitarsFetchedStatus(state, { status }) {
      state.areGuitarsFetched = status;
    }
  },
  actions: {
    addToGuitars(store, guitar) {
      store.commit("pushToGuitars", guitar);
    },
    updateGuitarQuantity(context, { guitar, value }) {
      context.commit("setNewGuitarQuantity", { guitar, value });
    },
    setAreGuitarsFetchedStatusToTrue(store) {
      store.commit("updateAreGuitarsFetchedStatus", { status: true });
    }
  }
};
