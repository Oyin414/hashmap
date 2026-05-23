import "./styles.css";
import { Hashmap } from "./hashmap.js";

const hashmap = new Hashmap();
hashmap.set("apple", "green");
hashmap.set("banana", "yellow");
hashmap.set("carrot", "orange");
hashmap.set("dog", "brown");
hashmap.set("elephant", "gray");
hashmap.set("frog", "green");
hashmap.set("grape", "purple");
hashmap.set("hat", "black");
hashmap.set("ice cream", "white");
hashmap.set("jacket", "blue");
hashmap.set("kite", "pink");
hashmap.set("lion", "golden");

test("hashmap set method so if values are changed the length and capacity should still stay the same", () => {
  hashmap.set("apple", "red");
  expect(hashmap.capacity).toBe(16);
  expect(hashmap.length()).toBe(12);
  expect(hashmap.get("apple")).toBe("red");
});

test("hashmap set method so capacity is doubled if load levels exceed load factor", () => {
  hashmap.set("moon", "silver");
  expect(hashmap.capacity).toBe(32);
  expect(hashmap.length()).toBe(13);
  expect(hashmap.get("moon")).toBe("silver");
});

test("hashmap remove method so length decreases by one", () => {
  hashmap.remove("moon");
  expect(hashmap.length()).toBe(12);
  expect(hashmap.has("moon")).toBe(false);
});

test("hashmap clear method should clear all key values", () => {
  hashmap.clear();
  expect(hashmap.length()).toBe(0);
});
