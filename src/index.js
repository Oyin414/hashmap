import "./styles.css";
import { Hashmap } from "./hashmap.js";

let test = new Hashmap();

console.log(test.set("Aa", "A"));
console.log(test.set("Bb", "b"));
console.log(test.set("pp", "p"));
console.log(test.set("AA", "a"));
console.log(test.set("animal", "people"));
console.log(test.set("nonani", "armani"));
console.log(test.set("loveee", "love"));
console.log(test.length());
console.log(test.entries());
console.log(test.length());
