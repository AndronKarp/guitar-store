import { mount, createLocalVue } from "@vue/test-utils";
import PageSignIn from "@/pages/PageSignIn";
import BootstrapVue from "bootstrap-vue";
import { auth } from "@/configs/firebase";

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe("PageSignIn.vue", () => {
  let $router;
  let wrapper;

  beforeEach(() => {
    $router = { push: jest.fn() };
    wrapper = mount(PageSignIn, { localVue, mocks: { $router } });
  });

  test("renders sign in form", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("form submit button", () => {
    let submitButton;
    let inputs;

    beforeEach(() => {
      submitButton = wrapper.find("button");
      inputs = wrapper.findAll("input");
    });

    test("disabled if input data is not provided", () => {
      expect(submitButton.element.getAttribute("disabled")).toBe("disabled");
    });

    test("enabled if input data is provided", () => {
      inputs.setValue("value");
      wrapper.vm.$nextTick(() => {
        expect(submitButton.element.getAttribute("disabled")).toBe(null);
      });
    });
  });

  describe("methods", () => {
    describe("signIn", () => {
      beforeAll(() => {
        auth.signInWithEmailAndPassword = jest
          .fn()
          .mockResolvedValueOnce()
          .mockResolvedValueOnce()
          .mockRejectedValueOnce();
      });

      test("invokes auth.signInWithEmailAndPassword function", async () => {
        await wrapper.vm.signIn();
        expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
          wrapper.vm.form.email,
          wrapper.vm.form.password
        );
      });

      test("invokes moveTo method after successful authorization", async () => {
        const moveTo = jest.spyOn(wrapper.vm, "moveTo");
        await wrapper.vm.signIn();
        expect(moveTo).toHaveBeenCalledWith("PageGuitarStore");
      });

      test("sets authState value to false if authorization is failed", async () => {
        await wrapper.vm.signIn();
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.authState).toBe(false);
        });
      });
    });
  });
});
