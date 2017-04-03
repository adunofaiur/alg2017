//for all this is a set of id's
function makeSet(node) {
    node.rank = 0;
    node.parent = node;
}

function makeSetPrime(key) {
    this.key = key;
    this.rank = 0;
}

function MakeSetPrime() {}

function find(x) {
    //    if(x.parent.key == x.key){
    //        return x;
    //    }else{
    //        return find(x.parent)
    //    }
    if (x.parent.key != x.key) {
        x.parent = find(x.parent)
    }
    return x.parent
}

function union(x, y) {
    var xRoot = find(x)
    var yRoot = find(y)
    if (xRoot.key == yRoot.key) {
        return true;
    }
    if (xRoot.rank < yRoot.rank) {
        xRoot.parent = yRoot;
    }
    else if (xRoot.rank > yRoot.rank) {
        yRoot.parent = xRoot;
    }
    else {
        yRoot.parent = xRoot;
        xRoot.rank = xRoot.rank + 1
    }
}