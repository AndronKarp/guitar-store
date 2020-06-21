import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import GuitarListItem from "@/components/GuitarListItem";
import BootstrapVue from "bootstrap-vue";
import VueCurrencyFilter from "vue-currency-filter";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(VueCurrencyFilter);

describe("GuitarListItem.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(GuitarListItem, {
      localVue,
      propsData: {
        guitar: {
          brand: "Gibson",
          model: "SG",
          image: "Gibson SG.png",
          price: 100,
          slug: "sg"
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
  });

  test("renders guitar card", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("router link has correct path", () => {
    const routerLinkStub = wrapper.findComponent(RouterLinkStub);
    const path = routerLinkStub.props().to.name;
    expect(path).toBe("PageGuitarDescription");
  });

  test("router link passes slug param to the route", () => {
    const routerLinkStub = wrapper.findComponent(RouterLinkStub);
    const { slug } = routerLinkStub.props().to.params;
    expect(slug).toBe(wrapper.vm.guitar.slug);
  });
});
