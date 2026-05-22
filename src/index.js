import "./styles.css";
import { Hashmap } from "./hashmap.js";

let test = new Hashmap();

console.log(test.set("Aa", "b"));
console.log(test.set("Bb", "b"));
console.log(test.set("pp", "p"));
console.log(test.set("AA", "p"));

console.log(test.has("Aa"));
console.log(test.has("Bb"));
console.log(test.has("pp"));
console.log(test.has("AA"));

console.log(test.remove("AA"));
console.log(test.has("Aa"));
console.log(test.has("Bb"));
console.log(test.has("pp"));
console.log(test.has("AA"));
