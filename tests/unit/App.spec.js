import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import App from "@/App.vue";

// Mock fetch globally
global.fetch = jest.fn();

describe("App.vue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ProductLoader initially when loading", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Test Product",
          category: "men's clothing",
          rating: { rate: 4.5, count: 10 },
          description: "Test description",
          image: "test.jpg",
          price: 29.99,
        }),
    });

    const wrapper = mount(App);
    await nextTick();

    expect(wrapper.findComponent({ name: "ProductLoader" }).exists()).toBe(
      true
    );
  });

  it("renders ProductDisplay when product is loaded and category is valid", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Test Product",
          category: "men's clothing",
          rating: { rate: 4.5, count: 10 },
          description: "Test description",
          image: "test.jpg",
          price: 29.99,
        }),
    });

    const wrapper = mount(App);
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.findComponent({ name: "ProductDisplay" }).exists()).toBe(
      true
    );
  });

  it("renders ProductUnavailable when product category is invalid", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          title: "Test Product",
          category: "electronics",
          rating: { rate: 4.5, count: 10 },
          description: "Test description",
          image: "test.jpg",
          price: 29.99,
        }),
    });

    const wrapper = mount(App);
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    expect(wrapper.findComponent({ name: "ProductUnavailable" }).exists()).toBe(
      true
    );
  });

  it("handles fetch error and shows ProductUnavailable", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const wrapper = mount(App);
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick(); // Wait for loading to finish

    expect(wrapper.findComponent({ name: "ProductUnavailable" }).exists()).toBe(
      true
    );
  });
});
