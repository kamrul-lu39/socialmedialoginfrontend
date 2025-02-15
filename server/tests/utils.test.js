const { isValidItem, itemExists } = require("../utils"); // Import the functions

describe("Unit Tests: Utility Functions", () => {

  // ✅ Tests for `isValidItem()`
  
  it("✅ should return true for a valid item", () => {
    const item = { id: "1", name: "Valid Item" };
    expect(isValidItem(item)).toBe(true);
  });

  it("❌ should return false if ID is missing", () => {
    const item = { name: "No ID" };
    expect(isValidItem(item)).toBe(false);
  });

  it("❌ should return false if name is missing", () => {
    const item = { id: "1" };
    expect(isValidItem(item)).toBe(false);
  });

  it("❌ should return false for a very long name (>100 characters)", () => {
    const item = { id: "1", name: "A".repeat(101) };
    expect(isValidItem(item)).toBe(false);
  });

  it("❌ should return false for non-string names", () => {
    const item = { id: "1", name: 12345 };
    expect(isValidItem(item)).toBe(false);
  });

  // ✅ Tests for `itemExists()`
  
  it("✅ should return true if item exists in the array", () => {
    const items = [{ id: "1", name: "Item 1" }];
    expect(itemExists(items, "1")).toBe(true);
  });

  it("❌ should return false if item does not exist", () => {
    const items = [{ id: "1", name: "Item 1" }];
    expect(itemExists(items, "2")).toBe(false);
  });

});
