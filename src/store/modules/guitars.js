export default {
  state: {
    guitars: []
  },
  getters: {
    guitars(state) {
      return state.guitars;
    }
  },
  mutations: {
    addToGuitars(state, guitar) {
      state.guitars.push(guitar);
    }
  },
  actions: {
    addGuitar(store, guitar) {
      store.commit("addToGuitars", guitar);
    }
  }
};
