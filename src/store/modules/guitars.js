import { guitarsRef } from "@/configs/firebase";

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
    setGuitarQuantity(state, { guitar, value }) {
      guitar.quantity = value;
    },
    setAreGuitarsFetchedStatusToTrue(state) {
      state.areGuitarsFetched = true;
    }
  },
  actions: {
    fetchGuitars(store) {
      guitarsRef.once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          const guitar = childSnapshot.val();
          const id = childSnapshot.key;
          store.commit("pushToGuitars", {
            ...guitar,
            id
          });
        });
        store.commit("setAreGuitarsFetchedStatusToTrue");
      });
    },
    updateGuitarQuantity({ state, commit }, { guitarId, extraQuantity }) {
      const guitar = state.guitars.find(guitar => guitar.id === guitarId);
      commit("setGuitarQuantity", {
        guitar,
        value: guitar.quantity + extraQuantity
      });
    }
  }
};
