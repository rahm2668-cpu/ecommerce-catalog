import { mount } from "@vue/test-utils";
import ProductDisplay from "@/components/ProductDisplay.vue";

describe("ProductDisplay.vue", () => {
  const mockProduct = {
    title: "Test Product",
    category: "men's clothing",
    rating: { rate: 4.5, count: 10 },
    description: "This is a test product.",
    image: "test-image.jpg",
    price: 29.99,
  };

  it("renders product details correctly", () => {
    const wrapper = mount(ProductDisplay, {
      props: { product: mockProduct },
    });

    expect(wrapper.find(".product-name").text()).toBe("Test Product");
    expect(wrapper.find(".subcategory").text()).toBe("men's clothing");
    expect(wrapper.find(".rating").text()).toContain("4.5/5");
    expect(wrapper.find(".product-description").text()).toBe(
      "This is a test product."
    );
    expect(wrapper.find(".price").text()).toBe("$29.99");
  });

  it("emits next event when next button is clicked", async () => {
    const wrapper = mount(ProductDisplay, {
      props: { product: mockProduct },
    });

    await wrapper.find(".next-button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("next");
  });

  it("applies correct classes for men's clothing", () => {
    const wrapper = mount(ProductDisplay, {
      props: { product: mockProduct },
    });

    expect(wrapper.find(".product-name").classes()).not.toContain(
      "title-womens"
    );
  });
});
