import { createLocalVue, mount } from "@vue/test-utils";
import PageRegistration from "@/pages/PageRegistration";
import { BootstrapVue } from "bootstrap-vue";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import users from "@/store/modules/users";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Vuelidate);
localVue.use(Vuex);

describe("PageRegistration.vue", () => {
  let wrapper;
  let state;
  let actions;
  let store;

  beforeEach(() => {
    state = { currentUser: null, users: [{ email: "e-mail" }] };
    actions = { updateUserDisplayName: jest.fn() };
    store = new Vuex.Store({
      state,
      getters: users.getters,
      actions
    });
    wrapper = mount(PageRegistration, { localVue, store });
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
  });
});
