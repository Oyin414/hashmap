/*
remove(key)
returns either true while removing key or false
- first we need to get the hashcode for the key
- then using the index , we need to go to the bucket at that index 
- then we check if the headnode at that index is null and if it is return false
- otherwise we should loop through the nodes at that index using a while loop
    - stop when currentNode.next equals null or when the curentNode key equals key 
    - if current Node equals key , we need to get headnode again in another variable
      loop until the before node equals node before the current node 
      - then we need to check if the node after the current node is null 
         if it's null then change the before node's next node to null
         if it's not then change the before node's next node to the after node
         - then return true
      - otherwise return false
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
}
