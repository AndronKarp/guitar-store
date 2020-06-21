import guitars from "@/store/modules/guitars";

describe("guitarsModule/actions", () => {
  let existingGuitarsItem;
  let state;
  let commit;

  beforeEach(() => {
    existingGuitarsItem = { id: 0, quantity: 1 };
    state = {
      guitars: [existingGuitarsItem]
    };
    commit = jest.fn();
  });

  test("addToGuitars commits pushToGuitars mutation", () => {
    const guitar = {};
    guitars.actions.addToGuitars({ commit }, guitar);
    expect(commit).toHaveBeenCalledWith("pushToGuitars", guitar);
  });

  test("updateGuitarQuantity commits setNewGuitarQuantity mutation", () => {
    const guitarId = existingGuitarsItem.id;
    const extraQuantity = 1;
    guitars.actions.updateGuitarQuantity(
      { state, commit },
      { guitarId, extraQuantity }
    );
    expect(commit).toHaveBeenCalledWith("setNewGuitarQuantity", {
      guitar: existingGuitarsItem,
      value: 2
    });
  });

  test("updateAreGuitarsFetchedStatusToTrue commits setNewAreGuitarsFetchedStatus mutation", () => {
    guitars.actions.updateAreGuitarsFetchedStatusToTrue({ commit });
    expect(commit).toHaveBeenCalledWith("setNewAreGuitarsFetchedStatus", {
      status: true
    });
  });
});
