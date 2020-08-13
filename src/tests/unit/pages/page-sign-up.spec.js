import { createLocalVue, mount } from "@vue/test-utils";
import PageSignUp from "@/pages/PageSignUp";
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import { auth, unavailableEmailsRef } from "@/configs/firebase";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuelidate);
localVue.use(Vuex);

describe("PageSignUp.vue", () => {
  let wrapper;
  let actions;
  let store;
  let fetchUnavailableEmails;

  beforeEach(() => {
    unavailableEmailsRef.on = jest.fn((eventType, callback) =>
      callback({
        val: () => {
          return { value: "e-mail" };
        }
      })
    );
    actions = { updateUserDisplayName: jest.fn() };
    store = new Vuex.Store({
      actions
    });
    fetchUnavailableEmails = jest.spyOn(
      PageSignUp.methods,
      "fetchUnavailableEmails"
    );
    wrapper = mount(PageSignUp, {
      localVue,
      store
    });
  });

  test("renders registration form", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("computed", () => {
    const exampleField = "name";
    let exampleInput;

    describe("isEmailTaken", () => {
      test("returns true if unavailableEmails array contains passed email", () => {
        expect(wrapper.vm.isEmailTaken("e-mail")).toBe(true);
      });

      test("returns false if unavailableEmails array doesn't contain passed email", () => {
        expect(wrapper.vm.isEmailTaken("unique")).toBe(false);
      });
    });

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
        expect(submitButton.element.getAttribute("disabled")).toBe("disabled");
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

  describe("lifecycle methods", () => {
    test("created invokes fetchUnavailableEmails method", () => {
      expect(fetchUnavailableEmails).toHaveBeenCalled();
    });
  });

  describe("methods", () => {
    beforeEach(() => {
      unavailableEmailsRef.push = jest.fn();
    });

    test("fetchUnavailableEmails sets child added observer on unavailableEmails reference in database which pushes received data to unavailableEmails array", () => {
      expect(wrapper.vm.unavailableEmails).toContainEqual(
        expect.objectContaining({ value: "e-mail" })
      );
      expect(wrapper.vm.unavailableEmails).toHaveLength(1);
    });

    describe("signUp", () => {
      beforeEach(() => {
        auth.createUserWithEmailAndPassword = jest.fn();
        wrapper.vm.moveTo = jest.fn();
      });

      test("invokes auth.createUserWithEmailAndPassword function", async () => {
        await wrapper.vm.signUp();
        expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
          wrapper.vm.form.email.value,
          wrapper.vm.form.password.value
        );
      });

      test("invokes updateUserDisplayName action", async () => {
        const dispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
        await wrapper.vm.signUp();
        expect(dispatch).toHaveBeenCalledWith(
          "updateUserDisplayName",
          wrapper.vm.form.name.value
        );
      });

      test("invokes moveTo method", async () => {
        await wrapper.vm.signUp();
        expect(wrapper.vm.moveTo).toHaveBeenCalledWith("PageGuitarStore");
      });

      test("invokes saveNewUnavailableEmail method", async () => {
        const saveNewUnavailableEmail = jest.spyOn(
          wrapper.vm,
          "saveNewUnavailableEmail"
        );
        await wrapper.vm.signUp();
        expect(saveNewUnavailableEmail).toHaveBeenCalled();
      });
    });

    test("saveNewUnavailableEmail pushes passed object to database unavailableEmails reference", () => {
      wrapper.vm.saveNewUnavailableEmail();
      expect(unavailableEmailsRef.push).toHaveBeenCalledWith(
        expect.objectContaining({ value: wrapper.vm.form.email.value })
      );
    });
  });
});
