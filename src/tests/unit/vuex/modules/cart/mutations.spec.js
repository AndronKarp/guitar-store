import cart from "@/store/modules/cart";

describe("cartModule/mutations", () => {
  let existingCartItem;
  let state;

  beforeEach(() => {
    existingCartItem = { id: 0 };
    state = {
      cartId: null,
      cart: [existingCartItem],
      isCartFetched: false
    };
  });

  test("setCartId sets state.cartId a value of argument", () => {
    const value = "value";
    cart.mutations.setCartId(state, value);
    expect(state.cartId).toBe(value);
  });

  test("pushToCart pushes passed object to state.cart", () => {
    const obj = {};
    cart.mutations.pushToCart(state, obj);
    expect(state.cart).toHaveLength(2);
    expect(state.cart).toContain(obj);
  });

  test("setIsCartFetchedStatusToTrue sets state.isCartFetched a value of true", () => {
    cart.mutations.setIsCartFetchedStatusToTrue(state);
    expect(state.isCartFetched).toBe(true);
  });

  test("setCartItemQuantity sets a new value of quantity property of object which has id that equals to value of passed id argument", () => {
    const value = 5;
    cart.mutations.setCartItemQuantity(state, {
      cartItemId: existingCartItem.id,
      value
    });
    expect(existingCartItem).toHaveProperty("quantity", value);
  });

  test("removeCartItemFromCart removes existing cart item from state.cart by his index", () => {
    const existingCartItemIndex = state.cart.indexOf(existingCartItem);
    cart.mutations.removeCartItemFromCart(state, existingCartItemIndex);
    expect(state.cart).toHaveLength(0);
    expect(state.cart).not.toContain(existingCartItem);
  });

  test("resetCart sets state.cart a value of empty array", () => {
    cart.mutations.resetCart(state);
    expect(state.cart).toEqual([]);
  });
});
