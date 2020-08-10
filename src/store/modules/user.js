export default {
  state: {
    currentUser: null
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    updateCurrentUser(store, user) {
      store.commit("setCurrentUser", user);
    },
    async updateUserDisplayName({ state, commit }, displayName) {
      await state.currentUser.updateProfile({ displayName });
      commit("setCurrentUser", { ...state.currentUser, displayName });
    }
  }
};
