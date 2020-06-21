import { shallowMount, createLocalVue } from "@vue/test-utils";
import TheNavbar from "@/components/TheNavbar";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

describe("TheNavbar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TheNavbar, {
      localVue
    });
  });

  test("renders navigation bar", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
