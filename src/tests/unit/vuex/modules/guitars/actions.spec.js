import guitars from "@/store/modules/guitars";

jest.mock("@/configs/firebase", () => {
  const data = { name: "data" };
  const snapshot = [
    { key: 0, val: () => data },
    { key: 1, val: () => data }
  ];
  return {
    guitarsRef: {
      once: jest.fn((eventType, callback) => callback(snapshot))
    }
  };
});

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

  describe("fetchGuitars", () => {
    test("commits pushToGuitars mutation with every received object", () => {
      guitars.actions.fetchGuitars({ state, commit });
      expect(commit).toHaveBeenNthCalledWith(
        1,
        "pushToGuitars",
        expect.objectContaining({ id: 0, name: "data" })
      );
      expect(commit).toHaveBeenNthCalledWith(
        2,
        "pushToGuitars",
        expect.objectContaining({ id: 1, name: "data" })
      );
    });
    test("commits setAreGuitarsFetchedStatusToTrue mutation after all objects has been received", () => {
      guitars.actions.fetchGuitars({ state, commit });
      expect(commit).toHaveBeenLastCalledWith(
        "setAreGuitarsFetchedStatusToTrue"
      );
    });
  });

  test("updateGuitarQuantity commits setGuitarQuantity mutation", () => {
    const guitarId = existingGuitarsItem.id;
    const extraQuantity = 1;
    guitars.actions.updateGuitarQuantity(
      { state, commit },
      { guitarId, extraQuantity }
    );
    expect(commit).toHaveBeenCalledWith("setGuitarQuantity", {
      guitar: existingGuitarsItem,
      value: 2
    });
  });
});
