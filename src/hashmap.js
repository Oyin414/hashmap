/*
keys()
returns an array containing all the keys in the hashmap
  set an empty array 
- first we need to loop through the this.buckets array 
- and we need to check if the headnodes are empty for each item in the array
- if the headnodes isn't empty then we need to loop through the linked list
and for every key in the linked list add it to the array
then return the array

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
  get(key) {
    let result = this.hash(key);
    if (this.buckets[result].headNode === null) {
      return null;
    }
    let currentNode = this.buckets[result].headNode;
    while (currentNode.next !== null && currentNode.data["keyProp"] !== key) {
      currentNode = currentNode.next;
    }
    if (currentNode.data["keyProp"] !== key) {
      return null;
    }
    return currentNode.data["valueProp"];
  }
  has(key) {
    let result = this.hash(key);
    if (this.buckets[result].headNode === null) {
      return false;
    }
    let currentNode = this.buckets[result].headNode;
    while (currentNode.next !== null && currentNode.data["keyProp"] !== key) {
      currentNode = currentNode.next;
    }
    if (currentNode.data["keyProp"] !== key) {
      return false;
    }
    return true;
  }
  remove(key) {
    let result = this.hash(key);
    if (this.buckets[result].headNode === null) {
      return false;
    }
    let currentNode = this.buckets[result].headNode;
    while (currentNode.next !== null && currentNode.data["keyProp"] !== key) {
      currentNode = currentNode.next;
    }
    if (currentNode.data["keyProp"] === key) {
      let afterNode;
      if (currentNode.next !== null) {
        afterNode = currentNode.next;
      } else {
        afterNode = null;
      }
      if (currentNode === this.buckets[result].headNode) {
        this.buckets[result].headNode = afterNode;
        return true;
      }
      let beforeNode = this.buckets[result].headNode;
      while (beforeNode.next !== currentNode) {
        beforeNode = beforeNode.next;
      }
      beforeNode.next = afterNode;
      return true;
    }
    return false;
  }
  length() {
    let len = [];
    this.buckets.forEach((item) => {
      if (item.headNode !== null) {
        let currentNode = item.headNode;
        len.push(currentNode);
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          len.push(currentNode);
        }
      }
    });
    return len.length;
  }
  clear() {
    this.buckets.forEach((item) => {
      if (item.headNode !== null) {
        item.headNode = null;
      }
    });
  }
  keys() {
    let array = [];
    this.buckets.forEach((item) => {
      if (item.headNode !== null) {
        let currentNode = item.headNode;
        array.push(currentNode);
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          array.push(currentNode);
        }
      }
    });
    return array;
  }
}
