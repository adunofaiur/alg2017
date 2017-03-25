function MaxHeap() {
    this.nodes = [];
    this.size = 1;
    this.nodes[0] = false;
}
MaxHeap.prototype.insert = function (node) {
    this.nodes.push(node);
    var index = this.size;
    this.size = this.size + 1;
    this.upHeap(index);
}
MaxHeap.prototype.extractMax = function () {
    var key = this.nodes[1];
    this.size = this.size - 1;
    this.nodes[1] = this.nodes.pop();
    this.downHeap(1);
    return key;
}
MaxHeap.prototype.delete = function (key) {}
MaxHeap.prototype.upHeap = function (node) {
    while (this.nodes[node] > this.nodes[this.parent(node)]) {
        if (node == 1) {
            return;
        }
        this.swap(node, this.parent(node));
        node = this.parent(node);
    }
}
MaxHeap.prototype.downHeap = function (node) {
    if (!this.isLeaf(node)) {
        if (this.nodes[node] < (this.nodes[this.leftChild(node)] && !isNaN(this.nodes[this.rightChild(node)])) || ((this.nodes[node] < this.nodes[this.rightChild(node)]) && !isNaN(this.nodes[this.rightChild(node)]))) {
            if (this.nodes[this.leftChild(node)] < this.nodes[this.rightChild(node)]) {
                this.swap(node, this.leftChild(node));
                this.downHeap(this.leftChild(node));
            }
            else {
                this.swap(node, this.rightChild(node));
                this.downHeap(this.rightChild(node));
            }
        }
    }
}
MaxHeap.prototype.swap = function (a, b) {
    var intermediate = this.nodes[a];
    this.nodes[a] = this.nodes[b];
    this.nodes[b] = intermediate;
}
MaxHeap.prototype.leftChild = function (parent) {
    return parent * 2;
}
MaxHeap.prototype.rightChild = function (parent) {
    return ((parent * 2) + 1);
}
MaxHeap.prototype.parent = function (kid) {
    return Math.floor(kid / 2);
}
MaxHeap.prototype.isLeaf = function (kid) {
    if (kid >= (this.size / 2) && kid <= this.size) {
        return true;
    }
    return false;
}

function testHeap(size, min, max) {
    var heap = new MaxHeap();
    var keyArray = [];
    for (var i = 0; i < size; i++) {
        var key = Math.floor((Math.random() * max) + min);
        while (!(keyArray[key] === undefined)) {
            key = Math.floor((Math.random() * max) + min);
        }
        keyArray[key] = true;
        heap.insert(key);
    }
    console.log(heap);
    for (var i = 0; i < size; i++) {
        var v = heap.extractMax();
        console.log(v);
    }
}