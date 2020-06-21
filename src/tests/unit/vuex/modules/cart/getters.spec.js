import cart from "@/store/modules/cart";

describe("cartModule/getters", () => {
  let state;

  beforeEach(() => {
    state = {
      cart: [
        { quantity: 10, price: 123 },
        { quantity: 5, price: 299 },
        { quantity: 2, price: 43 }
      ]
    };
  });

  test("cartTotal counts a sum of all products in the cart", () => {
    const expected = 10 * 123 + 5 * 299 + 2 * 43;
    expect(cart.getters.cartTotal(state)).toBe(expected);
  });
});
