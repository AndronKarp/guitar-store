import { shallowMount } from "@vue/test-utils";
import PageGuitarStore from "@/pages/PageGuitarStore";
import GuitarList from "@/components/GuitarList";

describe("PageGuitarStore.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PageGuitarStore);
  });

  test("accepts GuitarList child component", () => {
    const guitarList = wrapper.findComponent(GuitarList);
    expect(guitarList.exists()).toBe(true);
  });
});
