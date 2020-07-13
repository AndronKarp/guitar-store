import users from "@/store/modules/users";

jest.mock("@/configs/firebase", () => {
  const data = { name: "data" };
  const snapshot = { val: () => data };
  return {
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn(callback => callback(data))
    }),
    usersRef: {
      on: jest.fn((eventType, callback) => callback(snapshot))
    }
  };
});

describe("usersModule/actions", () => {
  let updateProfile;
  let state;
  let commit;

  beforeEach(() => {
    updateProfile = jest.fn();
    state = {
      currentUser: { updateProfile }
    };
    commit = jest.fn();
  });

  test("setAuthObserver commits setCurrentUser mutation with received object", () => {
    users.actions.setAuthObserver({ state, commit });
    expect(commit).toHaveBeenCalledWith(
      "setCurrentUser",
      expect.objectContaining({ name: "data" })
    );
  });

  describe("updateUserDisplayName", () => {
    const displayName = "John";

    test("invokes state.currentUser.updateProfile function with object containing passed displayName argument", async () => {
      await users.actions.updateUserDisplayName({ state, commit }, displayName);
      expect(updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ displayName })
      );
    });

    test("commits setCurrentUser mutation", async () => {
      await users.actions.updateUserDisplayName({ state, commit }, displayName);
      expect(commit).toHaveBeenCalledWith(
        "setCurrentUser",
        expect.objectContaining({ updateProfile, displayName })
      );
    });
  });

  test("fetchUsers commits pushToUsers mutation with every recevied object", () => {
    users.actions.fetchUsers({ state, commit });
    expect(commit).toHaveBeenCalledWith(
      "pushToUsers",
      expect.objectContaining({ name: "data" })
    );
  });
});
