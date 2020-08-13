import cart from "@/store/modules/cart";
import { cartsRef } from "@/configs/firebase";

describe("cartModule/actions", () => {
  let state;
  let commit;
  let cartItems;
  let existingCartItem;

  beforeEach(() => {
    existingCartItem = { id: "id" };
    cartItems = [
      {
        key: 0,
        val: () => {
          return { data: "data" };
        }
      },
      {
        key: 1,
        val: () => {
          return { data: "data" };
        }
      }
    ];
    cartsRef.child = jest.fn().mockReturnValue({
      once: jest.fn((eventType, callback) => callback(cartItems)),
      child: jest.fn().mockReturnValue({
        set: jest.fn(),
        update: jest.fn(),
        remove: jest.fn()
      })
    });
    state = {
      cartId: "id",
      cart: []
    };
    commit = jest.fn();
  });

  test("updateCartId commits setCartId mutation with passed value argument", () => {
    const value = "id";
    cart.actions.updateCartId({ state, commit }, value);
    expect(commit).toHaveBeenCalledWith("setCartId", value);
  });

  describe("fetchCart", () => {
    test("commits pushToCart mutation with every received object", () => {
      cart.actions.fetchCart({ state, commit });
      expect(commit).toHaveBeenNthCalledWith(
        1,
        "pushToCart",
        expect.objectContaining({ id: 0, data: "data" })
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        "pushToCart",
        expect.objectContaining({ id: 1, data: "data" })
      );
    });

    test("commits setIsCartFetchedStatusToTrue mutation after all objects have been received", () => {
      cart.actions.fetchCart({ state, commit });
      expect(commit).toHaveBeenCalledWith("setIsCartFetchedStatusToTrue");
    });
  });

  describe("addToCart", () => {
    const obj = { id: 0, brand: "s", model: "a", price: 1 };

    test("sets passed object in the database cart reference under its id property", async () => {
      await cart.actions.addToCart({ state, commit }, obj);
      expect(cartsRef.child).toHaveBeenCalledWith(state.cartId);
      expect(cartsRef.child().child).toHaveBeenCalledWith(obj.id);
      expect(cartsRef.child().child().set).toHaveBeenCalledWith(
        expect.objectContaining({
          brand: obj.brand,
          model: obj.model,
          price: obj.price,
          quantity: 1
        })
      );
    });

    test("commits pushToCart mutation", async () => {
      await cart.actions.addToCart({ state, commit }, obj);
      expect(commit).toHaveBeenCalledWith(
        "pushToCart",
        expect.objectContaining({ ...obj, quantity: 1 })
      );
    });
  });

  describe("updateCartItemQuantity", () => {
    const obj = { cartItemId: "id", value: 1 };

    test("updates quantity of cartItem which id equals to value of passed cartItemId argument in the database cart reference", async () => {
      await cart.actions.updateCartItemQuantity({ state, commit }, obj);
      expect(cartsRef.child).toHaveBeenCalledWith(state.cartId);
      expect(cartsRef.child().child).toHaveBeenCalledWith(obj.cartItemId);
      expect(cartsRef.child().child().update).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: obj.value })
      );
    });

    test("commits setCartItemQuantity mutation", async () => {
      await cart.actions.updateCartItemQuantity({ state, commit }, obj);
      expect(commit).toHaveBeenCalledWith(
        "setCartItemQuantity",
        expect.objectContaining(obj)
      );
    });
  });

  describe("removeFromCart", () => {
    test("removes passed cartItem from database cart reference", () => {
      cart.actions.removeFromCart({ state, commit }, existingCartItem);
      expect(cartsRef.child).toHaveBeenCalledWith(state.cartId);
      expect(cartsRef.child().child).toHaveBeenCalledWith(existingCartItem.id);
      expect(cartsRef.child().child().remove).toHaveBeenCalled();
    });

    test("commits removeCartItemFromCart mutation with index of passed cartItem in state.cart array", () => {
      cart.actions.removeFromCart({ state, commit }, existingCartItem);
      expect(commit).toHaveBeenCalledWith(
        "removeCartItemFromCart",
        state.cart.indexOf(existingCartItem)
      );
    });
  });

  test("clearCart commits resetCart mutation", () => {
    cart.actions.clearCart({ state, commit });
    expect(commit).toHaveBeenCalledWith("resetCart");
  });
});
