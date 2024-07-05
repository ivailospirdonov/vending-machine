import { formatToFixed } from "../formatToFixed";

describe("formatToFixed", () => {
  it("should format a number to 2 decimal places", () => {
    expect(formatToFixed(1.234)).toBe(1.23);
    expect(formatToFixed(1.2)).toBe(1.2);
    expect(formatToFixed(1)).toBe(1.0);
    expect(formatToFixed(123456789.123456789)).toBe(123456789.12);
    expect(formatToFixed(123456789.987654321)).toBe(123456789.99);
  });
});
