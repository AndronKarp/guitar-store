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
    setGuitarsRefChildChangedObserver({ state, commit }) {
      guitarsRef.on("child_changed", snapshot => {
        const updatedGuitar = state.guitars.find(
          guitar => guitar.id === snapshot.key
        );
        const { quantity } = snapshot.val();
        commit("setGuitarQuantity", { guitar: updatedGuitar, value: quantity });
      });
    }
  }
};
