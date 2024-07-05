import React from "react";
import { validateInputLength } from "../validateInputLength";

describe("validateInputLength", () => {
  let inputRef: React.RefObject<HTMLInputElement>;

  beforeEach(() => {
    inputRef = { current: document.createElement("input") };
  });

  it("should truncate the input value if it exceeds the specified length", () => {
    inputRef.current!.value = "1234567890";
    validateInputLength(inputRef, 3);
    expect(inputRef.current!.value).toBe("123");
  });

  it("should not modify the input value if it does not exceed the specified length", () => {
    inputRef.current!.value = "12";
    validateInputLength(inputRef, 3);
    expect(inputRef.current!.value).toBe("12");
  });

  it("should not modify the input value if it is equal to the specified length", () => {
    inputRef.current!.value = "123";
    validateInputLength(inputRef, 3);
    expect(inputRef.current!.value).toBe("123");
  });

  it("should handle empty input value correctly", () => {
    inputRef.current!.value = "";
    validateInputLength(inputRef, 5);
    expect(inputRef.current!.value).toBe("");
  });
});
