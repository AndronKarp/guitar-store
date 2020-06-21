import guitars from "@/store/modules/guitars";

describe("guitarsModule/actions", () => {
  let existingGuitarsItem;
  let state;
  let commit;

  beforeEach(() => {
    existingGuitarsItem = { id: 0 };
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
    const value = 0;
    guitars.actions.updateGuitarQuantity(
      { state, commit },
      { guitarId, value }
    );
    expect(commit).toHaveBeenCalledWith("setNewGuitarQuantity", {
      guitar: existingGuitarsItem,
      value
    });
  });

  test("updateAreGuitarsFetchedStatusToTrue commits setNewAreGuitarsFetchedStatus mutation", () => {
    guitars.actions.updateAreGuitarsFetchedStatusToTrue({ commit });
    expect(commit).toHaveBeenCalledWith("setNewAreGuitarsFetchedStatus", {
      status: true
    });
  });
});
