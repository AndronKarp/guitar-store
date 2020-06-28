import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import guitars from "@/store/modules/guitars";
import PageGuitarDetails from "@/pages/PageGuitarDetails";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("PageGuitarDetails.vue", () => {
  let wrapper;
  let store;
  let guitar;
  let state;
  let actions;

  beforeEach(() => {
    guitar = {
      brand: "Gibson",
      model: "SG",
      description: "Guitar",
      quantity: 1,
      slug: "sg"
    };
    state = { guitars: [guitar] };
    actions = {
      updateGuitarQuantity: jest.fn(),
      addToCart: jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters: guitars.getters,
      actions
    });
    wrapper = shallowMount(PageGuitarDetails, {
      localVue,
      store,
      propsData: {
        slug: "sg"
      }
    });
  });

  test("renders guitar details", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("computed", () => {
    test("guitar returns guitars item finded by its slug", () => {
      expect(wrapper.vm.guitar).toEqual(guitar);
    });

    describe("isGuitarInStock", () => {
      test("returns true if quantity property of guitar is greater than zero", () => {
        expect(wrapper.vm.isGuitarInStock(guitar)).toBe(true);
      });

      test("returns false if quantiy property of guitar is equal to zero", () => {
        guitar.quantity = 0;
        expect(wrapper.vm.isGuitarInStock(guitar)).toBe(false);
      });
    });
  });

  describe("methods", () => {
    describe("addToCart", () => {
      test("calls addToCart and updateGuitarQuantity actions", () => {
        wrapper.vm.addToCart(guitar);
        expect(actions.addToCart).toHaveBeenCalled();
        expect(actions.updateGuitarQuantity).toHaveBeenCalled();
      });
    });
  });
});
