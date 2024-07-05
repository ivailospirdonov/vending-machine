import { isCoinValid } from "../isCoinValid";
import { CoinDenomination } from "../../types/coin";

describe("isCoinValid", () => {
  it("should return true for valid coin denominations", () => {
    expect(isCoinValid(CoinDenomination.TenCents)).toBe(true);
    expect(isCoinValid(CoinDenomination.TwentyCents)).toBe(true);
    expect(isCoinValid(CoinDenomination.FiftyCents)).toBe(true);
    expect(isCoinValid(CoinDenomination.OneDollar)).toBe(true);
    expect(isCoinValid(CoinDenomination.TwoDollars)).toBe(true);
  });

  it("should return false for invalid coin denominations", () => {
    expect(isCoinValid(0.25)).toBe(false);
    expect(isCoinValid(5)).toBe(false);
    expect(isCoinValid(-1)).toBe(false);
  });

  it("should return false for non-numeric values", () => {
    expect(isCoinValid(NaN)).toBe(false);
    expect(isCoinValid(Infinity)).toBe(false);
  });
});
