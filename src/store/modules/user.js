import { auth } from "@/configs/firebase";

export default {
  state: {
    currentUser: null
  },
  getters: {},
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    setAuthObserver(store) {
      auth().onAuthStateChanged(user => {
        store.commit("setCurrentUser", user);
      });
    }
  }
};
