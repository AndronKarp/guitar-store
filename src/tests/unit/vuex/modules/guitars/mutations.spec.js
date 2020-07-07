import guitars from "@/store/modules/guitars";

describe("guitarsModule/mutations", () => {
  let state;

  beforeEach(() => {
    state = { ...guitars.state };
  });

  test("pushToGuitars pushes passed object to state.guitars", () => {
    const guitar = {};
    guitars.mutations.pushToGuitars(state, guitar);
    expect(state.guitars).toHaveLength(1);
    expect(state.guitars).toContain(guitar);
  });

  test("setGuitarQuantity sets a new value of quantity property of passed object", () => {
    const guitar = { quantity: 0 };
    const value = 1;
    guitars.mutations.setGuitarQuantity(state, { guitar, value });
    expect(guitar).toHaveProperty("quantity", value);
  });

  test("setAreGuitarsFetchedStatusToTrue sets state.areGuitarsFetched a value of true", () => {
    guitars.mutations.setAreGuitarsFetchedStatusToTrue(state);
    expect(state.areGuitarsFetched).toBe(true);
  });
});
