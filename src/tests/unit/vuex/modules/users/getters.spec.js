import users from "@/store/modules/users";

describe("usersModule/getters", () => {
  let state;

  beforeEach(() => {
    state = {
      users: [{ email: "e-mail" }]
    };
  });

  describe("isEmailTaken", () => {
    test("returns true if any of state.users elements has property of email that equals to the passed email argument", () => {
      expect(users.getters.isEmailTaken(state)("e-mail")).toBe(true);
    });

    test("returns false if passed email argument has no matches with email properties of state.users elements", () => {
      expect(users.getters.isEmailTaken(state)("email")).toBe(false);
    });
  });
});
