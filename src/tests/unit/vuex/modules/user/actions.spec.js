import user from "@/store/modules/user";

describe("userModule/actions", () => {
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

  test("updateCurrentUser commits setCurrentUser mutation with received object", () => {
    const obj = {};
    user.actions.updateCurrentUser({ state, commit }, obj);
    expect(commit).toHaveBeenCalledWith("setCurrentUser", obj);
  });

  describe("updateUserDisplayName", () => {
    const displayName = "John";

    test("invokes state.currentUser.updateProfile function with object containing passed displayName argument", async () => {
      await user.actions.updateUserDisplayName({ state, commit }, displayName);
      expect(updateProfile).toHaveBeenCalledWith(
        expect.objectContaining({ displayName })
      );
    });

    test("commits setCurrentUser mutation", async () => {
      await user.actions.updateUserDisplayName({ state, commit }, displayName);
      expect(commit).toHaveBeenCalledWith(
        "setCurrentUser",
        expect.objectContaining({ updateProfile, displayName })
      );
    });
  });
});
