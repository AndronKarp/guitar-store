import cart from "@/store/modules/cart";

describe("cartModule/actions", () => {
  let existingCartItem;
  let state;

  beforeEach(() => {
    existingCartItem = {};
    state = {
      cart: [existingCartItem]
    };
  });

  test("pushToCart pushes passed object to state.cart", () => {
    const obj = {};
    cart.mutations.pushToCart(state, obj);
    expect(state.cart).toHaveLength(2);
    expect(state.cart).toContain(obj);
  });

  test("incrementQuantity increments quantity property of passed object", () => {
    const obj = { quantity: 1 };
    cart.mutations.incrementQuantity(state, obj);
    expect(obj).toHaveProperty("quantity", 2);
  });

  test("removeCartItemFromCart removes existing cart item from state.cart by his index", () => {
    const existingCartItemIndex = state.cart.indexOf(existingCartItem);
    cart.mutations.removeCartItemFromCart(state, existingCartItemIndex);
    expect(state.cart).toHaveLength(0);
    expect(state.cart).not.toContain(existingCartItem);
  });
});
