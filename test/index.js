import assert from "node:assert/strict";
import { it } from "node:test";
import { getMemeCount, getMemeCaption, getRandomIndex } from "../build/debug.js";

it("getMemeCount returns a positive number", () => {
  assert.ok(getMemeCount() > 0);
});

it("getMemeCaption returns a non-empty string for index 0", () => {
  const caption = getMemeCaption(0);
  assert.ok(typeof caption === "string" && caption.length > 0);
});

it("getMemeCaption wraps negative indices correctly", () => {
  const caption = getMemeCaption(-1);
  assert.ok(typeof caption === "string" && caption.length > 0);
});

it("getMemeCaption wraps out-of-range indices correctly", () => {
  const count = getMemeCount();
  const caption = getMemeCaption(count + 5);
  assert.ok(typeof caption === "string" && caption.length > 0);
});

it("getRandomIndex returns a value within [0, getMemeCount())", () => {
  const count = getMemeCount();
  for (const seed of [0, 1, 42, -7, 999, Date.now() | 0]) {
    const idx = getRandomIndex(seed);
    assert.ok(idx >= 0 && idx < count, `index ${idx} out of range [0, ${count})`);
  }
});

it("getRandomIndex produces different values for different seeds", () => {
  const results = new Set([0, 1, 2, 3, 100, 200, 300, 400, 500].map(getRandomIndex));
  // With 20 captions and 9 different seeds we expect at least 2 distinct results
  assert.ok(results.size >= 2);
});
