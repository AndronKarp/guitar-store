import guitars from "@/store/modules/guitars";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("mutations", () => {
  let existingGuitarsItem;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: { ...guitars.state },
      mutations: { ...guitars.mutations }
    });
    existingGuitarsItem = { id: 0, quantity: 1 };
    store.state.guitars.push(existingGuitarsItem);
  });

  describe("pushToGuitars", () => {
    test("pushes passed object to guitars array", () => {
      const obj = {};
      store.commit("pushToGuitars", obj);
      expect(store.state.guitars).toHaveLength(2);
      expect(store.state.guitars).toContain(obj);
    });
  });

  describe("setNewGuitarQuantity", () => {
    test("sets a new value of quantity property of existing guitars array item", () => {
      store.commit("setNewGuitarQuantity", {
        guitar: existingGuitarsItem,
        value: 2
      });
      expect(existingGuitarsItem).toHaveProperty("quantity", 2);
    });
  });

  describe("updateAreGuitarsFetchedStatus", () => {
    test("updates areGuitaresFetched status with passed status value", () => {
      const status = true;
      store.commit("updateAreGuitarsFetchedStatus", { status });
      expect(store.state.areGuitarsFetched).toBe(status);
    });
  });
});
