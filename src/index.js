import "./styles.css";
import { Hashmap } from "./hashmap.js";

let test = new Hashmap();

console.log(test.hash("apple"));

console.log(test.set("apple", "red"));

console.log(test.has("apple"));
