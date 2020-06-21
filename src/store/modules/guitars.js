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
    setNewAreGuitarsFetchedStatus(state, { status }) {
      state.areGuitarsFetched = status;
    }
  },
  actions: {
    addToGuitars(store, guitar) {
      store.commit("pushToGuitars", guitar);
    },
    updateGuitarQuantity({ state, commit }, { guitarId, extraQuantity }) {
      const guitar = state.guitars.find(guitar => guitar.id === guitarId);
      commit("setNewGuitarQuantity", {
        guitar,
        value: guitar.quantity + extraQuantity
      });
    },
    updateAreGuitarsFetchedStatusToTrue(store) {
      store.commit("setNewAreGuitarsFetchedStatus", { status: true });
    }
  }
};
