function kMaxHeap(dictionary) {
    this.nodes = [];
    this.dictionary = dictionary;
    this.size = 1;
    this.nodes[0] = false;
}
kMaxHeap.prototype.insert = function (nodeKey) {
    this.nodes.push(nodeKey);
    var index = this.size;
    this.size = this.size + 1;
    this.upHeap(index);
}
kMaxHeap.prototype.extractMax = function () {
    var key = this.nodes[1];
    this.size = this.size - 1;
    this.nodes[1] = this.nodes.pop();
    this.downHeap(1);
    return key;
}
kMaxHeap.prototype.upHeap = function (nodeIndex) {
    if (nodeIndex == 1) return
    var myVal = this.dictionary[this.nodes[nodeIndex]].w
    var parentVal = this.dictionary[this.nodes[this.parent(nodeIndex)]].w
    while (myVal > parentVal) {
        if (nodeIndex <= 1) {
            return;
        }
        this.swap(nodeIndex, this.parent(nodeIndex));
        nodeIndex = this.parent(nodeIndex);
        myVal = this.dictionary[this.nodes[nodeIndex]].w
        if (nodeIndex == 1) return
        parentVal = this.dictionary[this.nodes[this.parent(nodeIndex)]].w
    }
}
kMaxHeap.prototype.downHeap = function (nodeIndex) {
    //if left kid exists
    if (!isNaN(this.nodes[this.leftChild(nodeIndex)])) {
        //if right kid exists
        if (!isNaN(this.nodes[this.rightChild(nodeIndex)])) {
            //if either are greater than node
            var lVal = this.dictionary[this.nodes[this.leftChild(nodeIndex)]].w;
            var rVal = this.dictionary[this.nodes[this.rightChild(nodeIndex)]].w;
            var thisVal = this.dictionary[this.nodes[nodeIndex]].w;
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
        else if (this.dictionary[this.nodes[nodeIndex]].w < this.dictionary[this.nodes[this.leftChild(nodeIndex)].w]) {
            this.swap(nodeIndex, this.leftChild(nodeIndex));
            this.downHeap(this.leftChild(nodeIndex));
        }
    }
    else {
        return;
    }
}
kMaxHeap.prototype.increaseKey = function (nodeKey, newVal) {
    if (this.dictionary[nodeKey].w > newVal) {
        console.log('death to the kind')
    }
    this.dictionary[nodeKey].w = newVal;
    this.upHeap(nodeKey);
}
kMaxHeap.prototype.swap = function (a, b) {
    var intermediate = this.nodes[a];
    this.nodes[a] = this.nodes[b];
    this.nodes[b] = intermediate;
}
kMaxHeap.prototype.leftChild = function (parent) {
    return parent * 2;
}
kMaxHeap.prototype.rightChild = function (parent) {
    return ((parent * 2) + 1);
}
kMaxHeap.prototype.parent = function (kid) {
    return Math.floor(kid / 2);
}
kMaxHeap.prototype.isLeaf = function (kid) {
    if (kid >= (this.size / 2) && kid <= this.size) {
        return true;
    }
    return false;
}

function testHeap(size, min, max) {
    var heapDict = []
    var heap = new kMaxHeap(heapDict);
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