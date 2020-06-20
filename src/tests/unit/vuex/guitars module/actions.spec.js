import guitars from "@/store/modules/guitars";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("actions", () => {
  let state;
  let mutations;
  let store;

  beforeEach(() => {
    state = {};
    mutations = {
      pushToGuitars: jest.fn(),
      setNewGuitarQuantity: jest.fn(),
      updateAreGuitarsFetchedStatus: jest.fn()
    };
    store = new Vuex.Store({
      state,
      mutations,
      actions: guitars.actions
    });
  });

  describe("addToGuitars", () => {
    test("commits pushToGuitars mutation", () => {
      store.dispatch("addToGuitars", {});
      expect(mutations.pushToGuitars).toHaveBeenCalledWith(
        state,
        expect.any(Object)
      );
    });
  });

  describe("updateGuitarQuantity", () => {
    test("commits setNewGuitarQuantity mutation", () => {
      store.dispatch("updateGuitarQuantity", { guitar: {}, value: 0 });
      expect(mutations.setNewGuitarQuantity).toHaveBeenCalledWith(state, {
        guitar: expect.any(Object),
        value: expect.any(Number)
      });
    });
  });

  describe("setAreGuitarsFetchedStatusToTrue", () => {
    test("commits updateAreGuitarsFetchedStatus mutation", () => {
      store.dispatch("setAreGuitarsFetchedStatusToTrue");
      expect(mutations.updateAreGuitarsFetchedStatus).toHaveBeenCalledWith(
        state,
        { status: true }
      );
    });
  });
});
