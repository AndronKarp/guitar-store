import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App";
import Vuex from "vuex";
import { BootstrapVue } from "bootstrap-vue";
import guitars from "@/store/modules/guitars";
import TheNavbar from "@/components/TheNavbar";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("App.vue", () => {
  let state;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    state = { areGuitarsFetched: true };
    actions = {
      fetchGuitars: jest.fn(),
      setAuthObserver: jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters: guitars.getters,
      actions
    });
    wrapper = shallowMount(App, {
      localVue,
      store,
      stubs: ["router-view"]
    });
  });

  test("renders app", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("accepts TheNavbar child component", () => {
    const theNavbar = wrapper.findComponent(TheNavbar);
    expect(theNavbar.exists()).toBe(true);
  });

  describe("lifecycle methods", () => {
    describe("created", () => {
      test("invokes fetchGuitars vuex action", () => {
        expect(actions.fetchGuitars).toHaveBeenCalled();
      });

      test("invokes setAuthObserver vuex action", () => {
        expect(actions.setAuthObserver).toHaveBeenCalled();
      });
    });
  });
});
