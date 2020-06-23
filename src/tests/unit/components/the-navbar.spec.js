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

  test("brand link has correct path", () => {
    const brandLink = wrapper.find(".guitar-store-page-link");
    const path = brandLink.attributes("to");
    expect(path).toBe("/");
  });

  test("cart icon link has correct path", () => {
    const cartIconLink = wrapper.find(".cart-page-link");
    const path = cartIconLink.attributes("to");
    expect(path).toBe("/cart");
  });
});
