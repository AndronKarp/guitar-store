import { auth, usersRef } from "@/configs/firebase";

export default {
  state: {
    currentUser: null,
    users: []
  },
  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    isEmailTaken(state) {
      return email => !!state.users.find(user => user.email === email);
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    pushToUsers(state, user) {
      state.users.push(user);
    }
  },
  actions: {
    setAuthObserver(store) {
      auth.onAuthStateChanged(user => {
        store.commit("setCurrentUser", user);
      });
    },
    async updateUserDisplayName({ state, commit }, displayName) {
      await state.currentUser.updateProfile({ displayName });
      commit("setCurrentUser", { ...state.currentUser, displayName });
    },
    fetchUsers(store) {
      usersRef.on("child_added", snapshot => {
        store.commit("pushToUsers", snapshot.val());
      });
    }
  }
};
