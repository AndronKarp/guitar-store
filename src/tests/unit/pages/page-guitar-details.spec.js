import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import guitars from "@/store/modules/guitars";
import cart from "@/store/modules/cart";
import user from "@/store/modules/user";
import PageGuitarDetails from "@/pages/PageGuitarDetails";
import BootstrapVue from "bootstrap-vue";
import { guitarsRef } from "@/configs/firebase";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("PageGuitarDetails.vue", () => {
  let wrapper;
  let store;
  let guitar;
  let state;
  let actions;
  let cartItem;

  beforeEach(() => {
    guitar = {
      brand: "Gibson",
      model: "SG",
      description: "Guitar",
      quantity: 1,
      slug: "sg",
      id: "id"
    };
    cartItem = {
      quantity: 2,
      id: "id"
    };
    state = {
      guitars: [guitar],
      cart: [cartItem],
      currentUser: { user: "user" }
    };
    actions = {
      updateCartItemQuantity: jest.fn(),
      addToCart: jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters: { ...guitars.getters, ...cart.getters, ...user.getters },
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

      test("returns false if quantity property of guitar is equal to zero", () => {
        guitar.quantity = 0;
        expect(wrapper.vm.isGuitarInStock(guitar)).toBe(false);
      });
    });
  });

  describe("methods", () => {
    describe("addToCart", () => {
      let dispatch;

      beforeEach(() => {
        wrapper.vm.showNotification = jest.fn();
        guitarsRef.child = jest.fn().mockReturnValue({
          update: jest.fn()
        });
        dispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
      });

      test("invokes updateCartItemQuantity action if passed guitar is already in cart", async () => {
        await wrapper.vm.addToCart(guitar);
        expect(dispatch).toHaveBeenCalledWith(
          "updateCartItemQuantity",
          expect.objectContaining({
            cartItemId: cartItem.id,
            value: cartItem.quantity + 1
          })
        );
      });

      test("invokes addToCart action if passed guitar is not in cart", async () => {
        const anotherGuitar = {};
        await wrapper.vm.addToCart(anotherGuitar);
        expect(dispatch).toHaveBeenCalledWith(
          "addToCart",
          expect.objectContaining(anotherGuitar)
        );
      });

      test("invokes showNotification method", async () => {
        await wrapper.vm.addToCart(guitar);
        expect(wrapper.vm.showNotification).toHaveBeenCalledWith(
          expect.objectContaining({
            message: `${guitar.brand} ${guitar.model} added to cart!`,
            type: "success"
          })
        );
      });

      test("updates guitar quantity in database", async () => {
        await wrapper.vm.addToCart(guitar);
        expect(guitarsRef.child).toHaveBeenCalledWith(guitar.id);
        expect(guitarsRef.child().update).toHaveBeenCalledWith(
          expect.objectContaining({ quantity: guitar.quantity - 1 })
        );
      });
    });
  });
});
