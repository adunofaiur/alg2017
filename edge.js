function AdjacencyEntry(src, destination, weight) {
    this.destination = destination;
    this.src = src;
    this.weight = weight;
}

function Node(key, graph) {
    this.key = key;
    this.adjacencyArray = [];
    this.previous = null;
    this.distance = -1;
    this.graph = graph;
    this.graph.nodeDictionary[key] = this;
}
Node.prototype.addEdge = function (key, weight) {
    this.adjacencyArray.push(new AdjacencyEntry(this.key, key, weight));
    this.graph.nodeDictionary[key].adjacencyArray.push(new AdjacencyEntry(key, this.key, weight));
    return true;
}
Node.prototype.hasEdge = function (dest) {
    for (var i = 0; i < this.adjacencyArray.length; i++) {
        if (this.adjacencyArray[i].destination == dest.key) {
            return true;
        }
    }
    return false;
}

function Graph(max) {
    this.nodes = [];
    this.max = max;
    this.nodeDictionary = [];
    this.edges = [];
}
Graph.prototype.addNode = function (node) {
    this.nodes.push(node);
}

function GenerateGraph(size, connectedPercent, weightMin, weightMax) {
    var graph = new Graph(weightMax);
    var key = 0;
    for (var i = 0; i < size; i++) {
        var node = new Node(key, graph);
        key++;
        graph.addNode(node);
    }
    for (var i = 0; i < graph.nodes.length; i++) {
        var localPercent = connectedPercent - graph.nodes[i].adjacencyArray.length * 100 / size;
        for (var j = 0; j < graph.nodes.length; j++) {
            var addEdge = Math.floor((Math.random() * 100) + 1);
            if (addEdge <= localPercent && i != j && !graph.nodes[i].hasEdge(graph.nodes[j])) {
                var weight = Math.floor((Math.random() * weightMax) + weightMin);
                graph.nodes[i].addEdge(graph.nodes[j].key, weight);
                graph.edges.push({
                    a: graph.nodes[j]
                    , b: graph.nodes[i]
                    , w: weight
                });
            }
        }
    }
    return graph;
}

function connectedPercent(graph) {
    var size = graph.nodes.length;
    var total = 0;
    for (var i = 0; i < graph.nodes.length; i++) {
        var percent = graph.nodes[i].adjacencyArray.length * 100 / graph.nodes.length;
        total = total + percent;
    }
    var avg = total / size;
    return avg;
}

function averageConnectedness(size, connect, min, max, trialNumbers) {
    var total = 0;
    for (var i = 0; i < trialNumbers; i++) {
        total = total + connectedPercent(GenerateGraph(size, connect, min, max))
    }
    var avg = total / trialNumbers
    return avg;
}