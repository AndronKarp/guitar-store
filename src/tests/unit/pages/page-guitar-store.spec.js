import { shallowMount, createLocalVue } from "@vue/test-utils";
import PageGuitarStore from "@/pages/PageGuitarStore";
import GuitarList from "@/components/GuitarList";
import Vuex from "vuex";
import guitars from "@/store/modules/guitars";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("PageGuitarStore.vue", () => {
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = { areGuitarsFetched: true };
    store = new Vuex.Store({
      state,
      getters: guitars.getters
    });
    wrapper = shallowMount(PageGuitarStore, {
      localVue,
      store
    });
  });

  test("renders guitar store after guitars were fetched", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("renders loading spinner while guitars are fetching", () => {
    state.areGuitarsFetched = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  test("accepts GuitarList child component", () => {
    const guitarList = wrapper.findComponent(GuitarList);
    expect(guitarList.exists()).toBe(true);
  });
});
