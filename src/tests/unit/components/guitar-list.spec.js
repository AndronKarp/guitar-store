import { shallowMount, createLocalVue } from "@vue/test-utils";
import GuitarList from "@/components/GuitarList";
import Vuex from "vuex";
import guitars from "@/store/modules/guitars";
import BootstrapVue from "bootstrap-vue";
import GuitarListItem from "@/components/GuitarListItem";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("GuitarList.vue", () => {
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      guitars: [{ id: 0 }, { id: 1 }, { id: 2 }]
    };
    store = new Vuex.Store({
      modules: {
        guitars: {
          state,
          getters: guitars.getters
        }
      }
    });
    wrapper = shallowMount(GuitarList, { localVue, store });
  });
  test("renders list of guitars", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("accepts child GuitarListItem components", () => {
    const guitarListItems = wrapper.findAllComponents(GuitarListItem);
    expect(guitarListItems.exists()).toBe(true);
  });

  test("passes a binded guitar prop to GuitarListItem component", () => {
    const guitarListItem = wrapper.findComponent(GuitarListItem);
    expect(state.guitars).toContain(guitarListItem.vm.guitar);
  });
});
