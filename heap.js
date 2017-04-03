function MaxHeap(dictionary) {
    this.nodes = [];
    this.dictionary = dictionary;
    this.size = 1;
    this.nodes[0] = false;
}
MaxHeap.prototype.insert = function (nodeKey) {
    this.nodes.push(nodeKey);
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
MaxHeap.prototype.upHeap = function (nodeIndex) {
    var myVal = this.dictionary[this.nodes[nodeIndex]]
    var parentVal = this.dictionary[this.nodes[this.parent(nodeIndex)]]
    while (myVal > parentVal) {
        if (nodeIndex <= 1) {
            return;
        }
        this.swap(nodeIndex, this.parent(nodeIndex));
        nodeIndex = this.parent(nodeIndex);
        myVal = this.dictionary[this.nodes[nodeIndex]]
        parentVal = this.dictionary[this.nodes[this.parent(nodeIndex)]]
    }
}
MaxHeap.prototype.downHeap = function (nodeIndex) {
    //if left kid exists
    if (!isNaN(this.nodes[this.leftChild(nodeIndex)])) {
        //if right kid exists
        if (!isNaN(this.nodes[this.rightChild(nodeIndex)])) {
            //if either are greater than node
            var lVal = this.dictionary[this.nodes[this.leftChild(nodeIndex)]];
            var rVal = this.dictionary[this.nodes[this.rightChild(nodeIndex)]];
            var thisVal = this.dictionary[this.nodes[nodeIndex]];
            if (thisVal < lVal || thisVal < rVal) {
                if (lVal > rVal) {
                    this.swap(nodeIndex, this.leftChild(nodeIndex));
                    this.downHeap(this.leftChild(nodeIndex));
                }
                else {
                    this.swap(nodeIndex, this.rightChild(nodeIndex));
                    this.downHeap(this.rightChild(nodeIndex));
                }
            }
            else {
                return;
            }
        }
        else if (this.dictionary[this.nodes[nodeIndex]] < this.dictionary[this.nodes[this.leftChild(nodeIndex)]]) {
            this.swap(nodeIndex, this.leftChild(nodeIndex));
            this.downHeap(this.leftChild(nodeIndex));
        }
    }
    else {
        return;
    }
}
MaxHeap.prototype.increaseKey = function (nodeKey, newVal) {
    if (this.dictionary[nodeKey] > newVal) {
        console.log('death to the kind')
    }
    this.dictionary[nodeKey] = newVal;
    this.upHeap(nodeKey);
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
    var heapDict = []
    var heap = new MaxHeap(heapDict);
    for (var i = 0; i < size; i++) {
        var key = i;
        var val = Math.floor((Math.random() * max) + min);
        heapDict[key] = val;
        heap.insert(key);
    }
    for (var i = 0; i < size; i++) {
        var v = heap.extractMax();
        console.log("Key: " + v + " Val: " + heapDict[v]);
    }
}