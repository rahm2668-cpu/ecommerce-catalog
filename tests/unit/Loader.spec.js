import { mount } from "@vue/test-utils";
import ProductLoader from "@/components/ProductLoader.vue";

describe("ProductLoader.vue", () => {
  it("renders the loading skeleton", () => {
    const wrapper = mount(ProductLoader);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("skeleton-container");
  });

  it("displays skeleton elements", () => {
    const wrapper = mount(ProductLoader);
    expect(wrapper.find(".skeleton-image").exists()).toBe(true);
    expect(wrapper.find(".skeleton-details").exists()).toBe(true);
    expect(wrapper.findAll(".skeleton-text")).toHaveLength(7);
  });
});
