import { shallowMount, createLocalVue } from "@vue/test-utils";
import TheNavbar from "@/components/TheNavbar";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import { auth } from "@/configs/firebase";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuex);

describe("TheNavbar.vue", () => {
  let state;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    state = { currentUser: { displayName: "John" } };
    actions = { clearCart: jest.fn() };
    store = new Vuex.Store({ state, getters: user.getters, actions });
    wrapper = shallowMount(TheNavbar, {
      localVue,
      store
    });
  });

  test("renders navigation with cart icon and dropdown for authorized user", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("renders navigation with sign up and sign in buttons for unauthorized user", () => {
    state.currentUser = null;
    wrapper.vm.$nextTick(() => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  test("brand link has correct path", () => {
    const brandLink = wrapper.find(".guitar-store-page-link");
    const path = brandLink.attributes("to");
    expect(path).toBe("/");
  });

  test("cart icon link has correct path", () => {
    const cartIconLink = wrapper.find(".shopping-cart-page-link");
    const path = cartIconLink.attributes("to");
    expect(path).toBe("/cart");
  });

  test("sign up button has correct link", () => {
    state.currentUser = null;
    wrapper.vm.$nextTick(() => {
      const signUpButton = wrapper.find(".sign-up-button");
      const link = signUpButton.attributes("to");
      expect(link).toBe("/join");
    });
  });

  test("sign in button has correct link", () => {
    state.currentUser = null;
    wrapper.vm.$nextTick(() => {
      const signInButton = wrapper.find(".sign-in-button");
      const link = signInButton.attributes("to");
      expect(link).toBe("/login");
    });
  });

  describe("methods", () => {
    describe("signOut", () => {
      beforeEach(() => {
        auth.signOut = jest.fn();
        wrapper.vm.moveTo = jest.fn();
      });

      test("invokes auth.signOut function", async () => {
        await wrapper.vm.signOut();
        expect(auth.signOut).toHaveBeenCalled();
      });

      test("invokes moveTo method", async () => {
        await wrapper.vm.signOut();
        expect(wrapper.vm.moveTo).toHaveBeenCalledWith("PageSignIn");
      });

      test("invokes clearCart action", async () => {
        const dispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
        await wrapper.vm.signOut();
        expect(dispatch).toHaveBeenCalledWith("clearCart");
      });
    });
  });
});
