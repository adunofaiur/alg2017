//array-based dijkstra
function Dijkstra(graph, srcKey, destKey) {
    var vertexSet = [];
    var INFINITY = graph.max + 1;

    function pathToNode(u, srcKey) {
        var path = [];
        if (u.previous == null) {
            return [-1]
        }
        path.push(u.key);
        var considering = u;
        while (considering.previous != null) {
            path.unshift(considering.previous);
            if (considering.previous == srcKey) {
                return path;
            }
            considering = graph.nodeDictionary[considering.previous]
        }
        return path;
    }
    for (var i = 0; i < graph.nodes.length; i++) {
        //reset all vertices
        var v = graph.nodes[i];
        v.previous = null;
        v.distance = -1;
    }
    var src = graph.nodeDictionary[srcKey];
    src.distance = INFINITY;
    for (var i = 0; i < src.adjacencyArray.length; i++) {
        var w = graph.nodeDictionary[src.adjacencyArray[i].destination];
        w.previous = srcKey;
        w.distance = src.adjacencyArray[i].weight;
        vertexSet.push(w)
    }
    while (vertexSet.length > 0) {
        var u = removeMaxFromArray(vertexSet);
        if (u.key == destKey && u.distance != -1) {
            return pathToNode(graph.nodeDictionary[destKey], srcKey);
        }
        for (var i = 0; i < u.adjacencyArray.length; i++) {
            var dest = graph.nodeDictionary[u.adjacencyArray[i].destination];
            var edgeWeight = u.adjacencyArray[i].weight;
            if (dest.distance == -1) {
                dest.previous = u.key;
                dest.distance = Math.min(u.distance, edgeWeight)
                vertexSet.push(dest);
            }
            else if (dest.distance < Math.min(u.distance, edgeWeight)) {
                dest.distance = Math.min(u.distance, edgeWeight);
                dest.previous = u.key;
            }
        }
    }
    return pathToNode(graph.nodeDictionary[destKey], srcKey);
}

function DijktraHeap(graph, srcKey, destKey) {
    var bandwidthDictionary = [];
    var vertexSet = new MaxHeap(bandwidthDictionary);
    var INFINITY = graph.max + 1;

    function pathToNode(u, srcKey) {
        var path = [];
        if (u.previous == null) {
            return [-1]
        }
        path.push(u.key);
        var considering = u;
        while (considering.previous != null) {
            path.unshift(considering.previous);
            if (considering.previous == srcKey) {
                return path;
            }
            considering = graph.nodeDictionary[considering.previous]
        }
        return path;
    }
    for (var i = 0; i < graph.nodes.length; i++) {
        //reset all vertices
        var v = graph.nodes[i];
        v.previous = null;
        v.distance = -1;
        bandwidthDictionary[v.key] = v.distance;
    }
    var src = graph.nodeDictionary[srcKey];
    src.distance = INFINITY;
    for (var i = 0; i < src.adjacencyArray.length; i++) {
        var w = graph.nodeDictionary[src.adjacencyArray[i].destination];
        w.previous = srcKey;
        w.distance = src.adjacencyArray[i].weight;
        bandwidthDictionary[w.key] = w.distance;
        vertexSet.insert(w)
    }
    while (vertexSet.size > 1) {
        var u = vertexSet.extractMax();
        if (u.key == destKey && u.distance != -1) {
            return pathToNode(graph.nodeDictionary[destKey], srcKey);
        }
        for (var i = 0; i < u.adjacencyArray.length; i++) {
            var dest = graph.nodeDictionary[u.adjacencyArray[i].destination];
            var edgeWeight = u.adjacencyArray[i].weight;
            if (dest.distance == -1) {
                dest.previous = u.key;
                dest.distance = Math.min(u.distance, edgeWeight)
                bandwidthDictionary[dest.key] = dest.distance;
                vertexSet.insert(dest);
            }
            else if (dest.distance < Math.min(u.distance, edgeWeight)) {
                dest.distance = Math.min(u.distance, edgeWeight);
                dest.previous = u.key;
                bandwidthDictionary[dest.key] = dest.distance;
                vertexSet.increaseKey(dest.key, dest.distance)
            }
        }
    }
    return pathToNode(graph.nodeDictionary[destKey], srcKey);
}

function removeMaxFromArray(array) {
    array.sort(function (a, b) {
        if (a.distance < b.distance) {
            return -1;
        }
        else if (a.distance > b.distance) {
            return 1;
        }
        else {
            return 0;
        }
    })
    return array.pop();
}

function testDijkstra(size, percent, min, max) {
    var g = GenerateGraph(size, percent, min, max);
    var src = Math.floor(Math.random() * g.nodes.length);
    var dest = Math.floor(Math.random() * g.nodes.length);
    while (src == dest) {
        dest = Math.floor(Math.random() * g.nodes.length);
    }
    var path = Dijkstra(g, src, dest);
    console.log("SRC: " + src + " " + "Dest: " + dest);
    console.log(g.nodes);
    console.log(path);
}

function testDijkstraHeap(size, percent, min, max) {
    var g = GenerateGraph(size, percent, min, max);
    var src = Math.floor(Math.random() * g.nodes.length);
    var dest = Math.floor(Math.random() * g.nodes.length);
    while (src == dest) {
        dest = Math.floor(Math.random() * g.nodes.length);
    }
    var path = DijktraHeap(g, src, dest);
    console.log("SRC: " + src + " " + "Dest: " + dest);
    console.log(path);
}