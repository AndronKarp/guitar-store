import guitars from "@/store/modules/guitars";

jest.mock("@/configs/firebase", () => {
  const data = { name: "data" };
  const snapshot = [
    { key: 0, val: () => data },
    { key: 1, val: () => data }
  ];
  return {
    guitarsRef: {
      once: jest.fn((eventType, callback) => callback(snapshot)),
      on: jest.fn((eventType, callback) =>
        callback({
          key: 0,
          val: () => {
            return { quantity: 2 };
          }
        })
      )
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
    test("commits setAreGuitarsFetchedStatusToTrue mutation after all objects have been received", () => {
      guitars.actions.fetchGuitars({ state, commit });
      expect(commit).toHaveBeenLastCalledWith(
        "setAreGuitarsFetchedStatusToTrue"
      );
    });
  });

  test("setGuitarsRefChildChangedObserver sets child changed observer on guitars reference in database which commits setGuitarQuantity mutation with every received object", () => {
    guitars.actions.setGuitarsRefChildChangedObserver({ state, commit });
    expect(commit).toHaveBeenCalledWith(
      "setGuitarQuantity",
      expect.objectContaining({ guitar: existingGuitarsItem, value: 2 })
    );
  });
});
