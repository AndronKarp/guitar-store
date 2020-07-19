import { createLocalVue, mount } from "@vue/test-utils";
import PageRegistration from "@/pages/PageRegistration";
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import users from "@/store/modules/users";
import { auth, usersRef } from "@/configs/firebase";

jest.mock("@/configs/firebase", () => {
  return {
    auth: jest.fn().mockReturnValue({
      createUserWithEmailAndPassword: jest.fn()
    }),
    usersRef: {
      child: jest.fn().mockReturnValue({
        set: jest.fn()
      })
    }
  };
});

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuelidate);
localVue.use(Vuex);

describe("PageRegistration.vue", () => {
  let wrapper;
  let state;
  let actions;
  let store;
  let $router;

  beforeEach(() => {
    state = {
      currentUser: { uid: "uid", email: "email", displayName: "name" },
      users: [{ email: "e-mail" }]
    };
    actions = { updateUserDisplayName: jest.fn() };
    store = new Vuex.Store({
      state,
      getters: users.getters,
      actions
    });
    $router = { push: jest.fn() };
    wrapper = mount(PageRegistration, {
      localVue,
      store,
      mocks: {
        $router
      }
    });
  });

  test("renders registration form", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("computed", () => {
    const exampleField = "name";
    let exampleInput;

    describe("validationState", () => {
      beforeEach(() => {
        exampleInput = wrapper.find(`#${exampleField}`);
      });

      test("returns null if input is clear", () => {
        expect(wrapper.vm.validationState(exampleField)).toBe(null);
      });

      test("returns false if input is dirty", () => {
        exampleInput.setValue("a");
        exampleInput.setValue("");
        expect(wrapper.vm.validationState(exampleField)).toBe(false);
      });

      test("returns false if input data is invalid", () => {
        exampleInput.setValue("a");
        expect(wrapper.vm.validationState(exampleField)).toBe(false);
      });

      test("returns true if input data is valid", () => {
        exampleInput.setValue("Andrew");
        expect(wrapper.vm.validationState(exampleField)).toBe(true);
      });
    });

    describe("validationErrorMessage", () => {
      beforeEach(() => {
        exampleInput = wrapper.find(`#${exampleField}`);
      });

      test("returns empty array if input is clear", () => {
        expect(wrapper.vm.validationErrorMessage(exampleField)).toEqual([]);
      });

      test("returns null if input data is valid", () => {
        exampleInput.setValue("Andrew");
        expect(wrapper.vm.validationErrorMessage(exampleField)).toBe(null);
      });

      test("returns error message of failed validation if input data is invalid", () => {
        exampleInput.setValue("a1");
        expect(wrapper.vm.validationErrorMessage(exampleField)).toBe(
          wrapper.vm.form[exampleField].validations.alpha.errorMessage
        );
      });
    });

    describe("form submit button", () => {
      let submitButton;
      let inputs;

      beforeEach(() => {
        submitButton = wrapper.find("button");
        inputs = wrapper.findAll("input");
      });

      test("disabled if form is empty", () => {
        expect(submitButton.element.getAttribute("disabled")).toBe("disabled");
      });

      test("disabled if input data is invalid", () => {
        inputs.setValue("invalid");
        wrapper.vm.$nextTick(() => {
          expect(submitButton.element.getAttribute("disabled")).toBe(
            "disabled"
          );
        });
      });

      test("enabled if input data is valid", () => {
        inputs.wrappers[0].setValue("Andrew");
        inputs.wrappers[1].setValue("andrewkarp00@gmail.com");
        inputs.wrappers[2].setValue("123456");
        inputs.wrappers[3].setValue("123456");
        wrapper.vm.$nextTick(() => {
          expect(submitButton.element.getAttribute("disabled")).toBe(null);
        });
      });
    });

    describe("methods", () => {
      describe("register", () => {
        test("creates a new user", async () => {
          await wrapper.vm.register();
          expect(auth().createUserWithEmailAndPassword).toHaveBeenCalledWith(
            wrapper.vm.form.email.value,
            wrapper.vm.form.password.value
          );
        });

        test("invokes updateUserDisplayName action", async () => {
          const dispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
          await wrapper.vm.register();
          expect(dispatch).toHaveBeenCalledWith(
            "updateUserDisplayName",
            wrapper.vm.form.name.value
          );
        });

        test("invokes moveToHomePage method", async () => {
          const moveToHomePage = jest.spyOn(wrapper.vm, "moveToHomePage");
          await wrapper.vm.register();
          expect(moveToHomePage).toHaveBeenCalled();
        });

        test("invokes addNewUserToDatabase method", async () => {
          const addNewUserToDatabase = jest.spyOn(
            wrapper.vm,
            "addNewUserToDatabase"
          );
          await wrapper.vm.register();
          expect(addNewUserToDatabase).toHaveBeenCalled();
        });
      });

      test("addNewUserToDatabase adds created user to database", () => {
        wrapper.vm.addNewUserToDatabase();
        expect(usersRef.child).toHaveBeenCalledWith(wrapper.vm.currentUser.uid);
        expect(usersRef.child().set).toHaveBeenCalledWith({
          name: wrapper.vm.currentUser.displayName,
          email: wrapper.vm.currentUser.email
        });
      });
    });
  });
});
