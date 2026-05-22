/*
set(key,value)
- let's make a final variable count that is loadFactor * capacity
first check if key already exists , to do that
- first get the index of the key by calling the hash(key) method
- then using the index check if the headnode is null for that index 
- it it's null then add the key as the headnode
- if it's not then check in the linked list for that key and if it doesn't exist then add the key to the list
- however if the key does exist then change the value to be the inputted value

*/
import { LinkedList, Node } from "./linkedlist.js";

export class Hashmap {
  constructor(capacity = 16, count = 0) {
    this.loadFactor = 0.75;
    this.capacity = capacity;
    this.count = count;
    this.buckets = Array.from({ length: capacity }, () => new LinkedList());
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }
  set(key, value) {
    let finalCount = this.capacity * this.loadFactor;
    let result = this.hash(key);

    if (result < 0 || result >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[result].headNode === null) {
      this.buckets[result].headNode = new Node(
        { keyProp: key, valueProp: value },
        null,
      );
      this.count += 1;
    } else {
      let currentNode = this.buckets[result].headNode;
      while (currentNode.next !== null && currentNode.data["keyProp"] !== key) {
        currentNode = currentNode.next;
      }
      if (currentNode.data["keyProp"] === key) {
        currentNode.data["valueProp"] = value;
      } else {
        currentNode.next = new Node({ keyProp: key, valueProp: value }, null);
        this.count += 1;
      }
    }
    if (this.count > finalCount) {
      this.capacity *= 2;
      let items = [];
      this.buckets.forEach((list) => {
        if (list.headNode !== null) {
          let currentNode = list.headNode;
          items.push(currentNode);
          while (currentNode.next !== null) {
            currentNode = currentNode.next;
            items.push(currentNode);
          }
        }
      });
      this.buckets = Array.from(
        { length: this.capacity },
        () => new LinkedList(),
      );
      this.count = 0;
      items.forEach((item) => {
        this.set(item.data["keyProp"], item.data["valueProp"]);
      });
    }
  }
}
