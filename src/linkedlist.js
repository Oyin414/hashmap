class LinkedList {
  constructor() {
    this.headNode = null;
  }
}

class Node {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

export { LinkedList, Node };
