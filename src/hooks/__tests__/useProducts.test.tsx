import { act } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "../useProducts";
import { fetchProducts } from "../../services/fetchProducts";
import { formatToFixed } from "../../utils/formatToFixed";
import { isCoinValid } from "../../utils/isCoinValid";
import React from "react";

jest.mock("../../services/fetchProducts");
jest.mock("../../utils/formatToFixed");
jest.mock("../../utils/isCoinValid");

const mockProducts = [
  { id: 1, name: "Pepsi", quantity: 2, price: 1.5 },
  { id: 2, name: "Coca Cola", quantity: 5, price: 2 },
  { id: 3, name: "Fanta", quantity: 0, price: 1 },
];

describe("useProducts", () => {
  beforeEach(() => {
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
    (formatToFixed as jest.Mock).mockImplementation((value: number) =>
      value.toFixed(2)
    );
    (isCoinValid as jest.Mock).mockReturnValue(true);
    jest.spyOn(React, "useRef").mockReturnValue({ current: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch products and initialize correctly", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.products).toEqual(mockProducts));
    expect(result.current.notification).toBe("Please, insert coins!");
    expect(result.current.totalInserted).toBe(0);
    expect(result.current.insertedCoin.current).toBeDefined();
    expect(result.current.insertedProductId.current).toBeDefined();
  });

  it("should handle coin insertion correctly", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.insertedCoin.current!.value = "1";
      result.current.handleInsertCoin();
    });

    expect(result.current.totalInserted).toBe("1.00");
    expect(result.current.notification).toBe("Select a product!");
  });

  it("should handle incorrect coin insertion", async () => {
    jest.spyOn(React, "useRef").mockReturnValue({ current: {} });
    (isCoinValid as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.insertedCoin.current!.value = "3";
      result.current.handleInsertCoin();
    });

    expect(result.current.notification).toBe("Insert a correct coin!");
    expect(result.current.totalInserted).toBe(0);
  });

  it("should handle empty coin", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.insertedCoin.current!.value = "";
      result.current.handleInsertCoin();
    });

    expect(result.current.notification).toBe("Insert a coin!");
    expect(result.current.totalInserted).toBe(0);
  });

  it("should handle product purchase correctly", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.products).toEqual(mockProducts));

    act(() => {
      result.current.insertedCoin.current!.value = "2";
      result.current.handleInsertCoin();
    });

    act(() => {
      result.current.insertedProductId.current!.value = "1";
      result.current.handleBuyProduct();
    });

    await waitFor(() =>
      expect(result.current.products.find((p) => p.id === 1)!.quantity).toBe(1)
    );
    expect(result.current.notification).toBe("Change: 0.50!");
    expect(result.current.totalInserted).toBe(0);
  });

  it("should handle incorrect product number", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.insertedProductId.current!.value = "4";
      result.current.handleBuyProduct();
    });

    expect(result.current.notification).toBe("Wrong product number!");
  });

  it("should handle not enough product quantity", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.products).toEqual(mockProducts));

    act(() => {
      result.current.insertedCoin.current!.value = "2";
      result.current.handleInsertCoin();
    });

    act(() => {
      result.current.insertedProductId.current!.value = "3";
      result.current.handleBuyProduct();
    });

    expect(result.current.notification).toBe("Product is out of stock!");
  });

  it("should handle purchase over correctly", async () => {
    let { result } = renderHook(() => useProducts());

    act(() => {
      result.current.insertedCoin.current!.value = "2";
      result.current.handleInsertCoin();
      result.current.setHasPurchased(true);
    });

    expect(result.current.notification).toBe("Change: 2.00!");
    expect(result.current.totalInserted).toBe(0);
  });
});
