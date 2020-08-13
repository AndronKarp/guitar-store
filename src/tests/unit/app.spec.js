import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App";
import Vuex from "vuex";
import { BootstrapVue } from "bootstrap-vue";
import TheNavbar from "@/components/TheNavbar";
import { auth } from "@/configs/firebase";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("App.vue", () => {
  let actions;
  let store;
  let wrapper;
  let setAuthObserver;
  let dispatch;

  beforeEach(() => {
    auth.onAuthStateChanged = jest.fn(callback => callback({ uid: "uid " }));
    actions = {
      fetchGuitars: jest.fn(),
      setGuitarsRefChildChangedObserver: jest.fn(),
      updateCurrentUser: jest.fn(),
      updateCartId: jest.fn(),
      fetchCart: jest.fn()
    };
    store = new Vuex.Store({
      actions
    });
    setAuthObserver = jest.spyOn(App.methods, "setAuthObserver");
    dispatch = jest.spyOn(store, "dispatch");
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

  describe("methods", () => {
    describe("setAuthObserver sets auth observer which", () => {
      test("invokes updateCurrentUser action with user object", () => {
        wrapper.vm.setAuthObserver();
        expect(dispatch).toHaveBeenCalledWith(
          "updateCurrentUser",
          auth.onAuthStateChanged(user => user)
        );
      });

      test("invokes loadUserCart method if user is authorized", () => {
        const loadUserCart = jest.spyOn(wrapper.vm, "loadUserCart");
        wrapper.vm.setAuthObserver();
        expect(loadUserCart).toHaveBeenCalledWith(
          expect.objectContaining({
            cartId: auth.onAuthStateChanged(user => user.uid)
          })
        );
      });

      test("doesn't invoke loadUserCart method if user is unauthorized", () => {
        auth.onAuthStateChanged = jest.fn(callback => callback(null));
        const loadUserCart = jest.spyOn(wrapper.vm, "loadUserCart");
        wrapper.vm.setAuthObserver();
        expect(loadUserCart).not.toHaveBeenCalled();
      });
    });

    describe("loadUserCart", () => {
      test("invokes updateCartId action", () => {
        const obj = { cartId: "id" };
        wrapper.vm.loadUserCart(obj);
        expect(dispatch).toHaveBeenCalledWith("updateCartId", obj.cartId);
      });

      test("invokes fetchCart action", () => {
        wrapper.vm.loadUserCart({ cartId: "id" });
        expect(dispatch).toHaveBeenCalledWith("fetchCart");
      });
    });

    describe("lifecycle methods", () => {
      describe("created", () => {
        test("invokes setAuthObserver method", () => {
          expect(setAuthObserver).toHaveBeenCalled();
        });

        test("invokes fetchGuitars action", () => {
          expect(dispatch).toHaveBeenCalledWith("fetchGuitars");
        });

        test("invokes setGuitarsRefChildChangedObserver action", () => {
          expect(dispatch).toHaveBeenCalledWith(
            "setGuitarsRefChildChangedObserver"
          );
        });
      });
    });
  });
});
