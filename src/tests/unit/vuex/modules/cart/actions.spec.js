import cart from "@/store/modules/cart";

describe("cartModule/actions", () => {
  let existingCartItem;
  let state;
  let commit;

  beforeEach(() => {
    existingCartItem = { id: 0, quantity: 1 };
    state = {
      cart: [existingCartItem]
    };
    commit = jest.fn();
  });

  describe("addToCart", () => {
    test("commits pushToCart mutation if passed object has unique for cart array id property", () => {
      const uniqueCartItem = { id: "unique" };
      cart.actions.addToCart({ state, commit }, uniqueCartItem);
      expect(commit).toHaveBeenCalledWith(
        "pushToCart",
        expect.objectContaining(uniqueCartItem)
      );
    });

    test("commits incrementQuantity mutation for cart item which id equals to id of passed object", () => {
      cart.actions.addToCart({ state, commit }, existingCartItem);
      expect(commit).toHaveBeenCalledWith(
        "incrementQuantity",
        existingCartItem
      );
    });
  });

  test("removeCartItem commits removeCartItemFromCart mutation", () => {
    cart.actions.removeCartItem({ state, commit }, existingCartItem);
    expect(commit).toHaveBeenCalledWith(
      "removeCartItemFromCart",
      state.cart.indexOf(existingCartItem)
    );
  });
});
