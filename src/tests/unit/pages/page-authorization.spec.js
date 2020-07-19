import { mount, createLocalVue } from "@vue/test-utils";
import PageAuthorization from "@/pages/PageAuthorization";
import BootstrapVue from "bootstrap-vue";
import { auth } from "@/configs/firebase";

jest.mock("@/configs/firebase", () => {
  return {
    auth: jest.fn().mockReturnValue({
      signInWithEmailAndPassword: jest
        .fn()
        .mockResolvedValueOnce()
        .mockResolvedValueOnce()
        .mockRejectedValueOnce()
    })
  };
});

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe("PageAuthorization.vue", () => {
  let wrapper;
  let $router;

  beforeEach(() => {
    $router = { push: jest.fn() };
    wrapper = mount(PageAuthorization, { localVue, mocks: { $router } });
  });

  test("renders authorization form", () => {
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
    describe("authorize", () => {
      test("authorizes user", async () => {
        await wrapper.vm.authorize();
        expect(auth().signInWithEmailAndPassword).toHaveBeenCalledWith(
          wrapper.vm.form.email,
          wrapper.vm.form.password
        );
      });

      test("invokes moveToHomePage method after successful authorization", async () => {
        const moveToHomePage = jest.spyOn(wrapper.vm, "moveToHomePage");
        await wrapper.vm.authorize();
        expect(moveToHomePage).toHaveBeenCalled();
      });

      test("sets authState value to false if authorization is failed", async () => {
        await wrapper.vm.authorize();
        wrapper.vm.$nextTick(() => {
          expect(wrapper.vm.authState).toBe(false);
        });
      });
    });
  });
});
