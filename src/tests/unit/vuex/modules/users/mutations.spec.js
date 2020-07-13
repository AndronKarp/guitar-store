import users from "@/store/modules/users";

describe("usersModule/mutations", () => {
  let state;

  beforeEach(() => {
    state = { ...users.state };
  });

  test("setCurrentUser mutation sets state.currentUser a value of passed object", () => {
    const currentUser = {};
    users.mutations.setCurrentUser(state, currentUser);
    expect(state.currentUser).toBe(currentUser);
  });

  test("pushToUsers mutation pushes passed object to state.users", () => {
    const user = {};
    users.mutations.pushToUsers(state, user);
    expect(state.users).toHaveLength(1);
    expect(state.users).toContain(user);
  });
});
