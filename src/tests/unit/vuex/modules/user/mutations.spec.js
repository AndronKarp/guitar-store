import user from "@/store/modules/user";

describe("userModule/mutations", () => {
  let state;

  beforeEach(() => {
    state = { ...user.state };
  });

  test("setCurrentUser mutation sets state.currentUser a value of passed object", () => {
    const currentUser = {};
    user.mutations.setCurrentUser(state, currentUser);
    expect(state.currentUser).toBe(currentUser);
  });
});
