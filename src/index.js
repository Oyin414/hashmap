import "./styles.css";
import { Hashmap } from "./hashmap.js";

let test = new Hashmap();

console.log(test.set("Aa", "b"));
console.log(test.set("Bb", "b"));
console.log(test.set("pp", "p"));
console.log(test.set("AA", "p"));
console.log(test.set("animal", "p"));
console.log(test.set("nonani", "p"));
console.log(test.set("loveee", "p"));
console.log(test.length());
console.log(test.keys());
console.log(test.length());
