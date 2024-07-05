import { fetchProducts } from "../fetchProducts";

const mockProducts = [
  {
    id: 1,
    name: "Pepsi",
    quantity: 2,
    price: 1.5,
  },
  {
    id: 2,
    name: "Coca Cola",
    quantity: 5,
    price: 2,
  },
  {
    id: 3,
    name: "Coca-Cola Zero",
    quantity: 15,
    price: 2.1,
  },
];

describe("fetchProducts", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch products and return the correct data", async () => {
    const products = await fetchProducts();
    expect(products).toEqual(mockProducts);
  });

  it("should call the fetch function with the correct URL", async () => {
    await fetchProducts();
    expect(global.fetch).toHaveBeenCalledWith("/products.json");
  });
});
