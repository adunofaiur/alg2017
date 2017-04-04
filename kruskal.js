function heapSort(edgeArray) {
    var dictOfWeight = [];
    var dictOfEdges = [];
    var heap = new MaxHeap(dictOfWeight);
    for (var i = 0; i < edgeArray.length; i++) {
        dictOfWeight[i] = edgeArray[i].w;
        dictOfEdges[i] = edgeArray[i];
        edgeArray[i].heapSortKey = i;
        heap.insert(i);
    }
    var sortedArrayOfIndices = []
    for (var i = 0; i < edgeArray.length; i++) {
        sortedArrayOfIndices.push(heap.extractMax());
    }
    var sortedArray = [];
    for (var i = 0; i < sortedArrayOfIndices.length; i++) {
        sortedArray.push(dictOfEdges[sortedArrayOfIndices[i]]);
    }
    return sortedArray;
}

function kruskal(graph, src, dest) {
    //instead of creating a new data structure for the forest
    //I somewhat sloppily just add new data fields for the MST 
    //to my original graph 
    //get all edges in g
    var start = performance.now();
    graph.edges = heapSort(graph.edges)
        //    edges.sort(function (a, b) {
        //        if (a.w < b.w) {
        //            return 1;
        //        }
        //        else if (a.w > b.w) {
        //            return -1;
        //        }
        //        else {
        //            return 0;
        //        }
        //    })
    var duration = performance.now() - start;
    kruskalsHeapSortTimers.push({
        time: duration
    });
    for (var i = 0; i < graph.nodes.length; i++) {
        makeSet(graph.nodes[i]);
        graph.nodes[i].kEdges = [];
    }
    var edgeCount = 0;
    for (var i = 0; i < graph.edges.length; i++) {
        var u = graph.edges[i].a;
        var v = graph.edges[i].b;
        if (find(u).key != find(v).key) {
            graph.nodeDictionary[u.key].kEdges.push(graph.edges[i]);
            graph.nodeDictionary[v.key].kEdges.push(graph.edges[i]);
            edgeCount++;
            union(u, v);
        }
    }
    console.log(edgeCount)
    var path = dfsK(graph.nodes, graph.nodeDictionary[src], graph.nodeDictionary[dest], graph.max)
    return path;
}

function dfsK(graph, src, dest, max) {
    if (src.key == dest.key) {
        return [{
            key: dest.key
            , dist: max + 1
        }];
    }
    else {
        src.kVisited = true;
        for (var i = 0; i < src.kEdges.length; i++) {
            var edge = src.kEdges[i];
            var nodeToLookAt;
            if (edge.a.key == src.key) {
                nodeToLookAt = edge.b;
            }
            else {
                nodeToLookAt = edge.a;
            }
            if (nodeToLookAt.kVisited != true) {
                var maybePath = dfsK(graph, nodeToLookAt, dest);
                if (maybePath.length > 0) {
                    maybePath.unshift({
                        key: src.key
                        , dist: edge.w
                    });
                    return maybePath;
                }
            }
        }
        return [];
    }
}

function testKruskal(size, percent, min, max) {
    var g = GenerateGraph(size, percent, min, max);
    var src = Math.floor(Math.random() * g.nodes.length);
    var dest = Math.floor(Math.random() * g.nodes.length);
    while (src == dest) {
        dest = Math.floor(Math.random() * g.nodes.length);
    }
    var path = kruskal(g, src, dest);
    console.log(path);
}

function testBoth(size, percent, min, max) {
    var g = GenerateGraph(size, percent, min, max);
    var src = Math.floor(Math.random() * g.nodes.length);
    var dest = Math.floor(Math.random() * g.nodes.length);
    while (src == dest) {
        dest = Math.floor(Math.random() * g.nodes.length);
    }
    var path = kruskal(g, src, dest);
    var path2 = Dijkstra(g, src, dest);
    console.log("Kruskal: ")
    console.log(path);
    console.log("Dijkstra: ")
    console.log(path2)
    if (path.length != path2.length) {
        console.log('fuck')
    }
}

function testAll(size, percent, min, max) {
    var g = GenerateGraph(size, percent, min, max);
    var src = Math.floor(Math.random() * g.nodes.length);
    var dest = Math.floor(Math.random() * g.nodes.length);
    while (src == dest) {
        dest = Math.floor(Math.random() * g.nodes.length);
    }
    var path = kruskal(g, src, dest);
    var path2 = Dijkstra(g, src, dest);
    var path3 = DijktraHeap(g, src, dest);
    var min1 = max + 6;
    for (var i = 0; i < path.length; i++) {
        if (path[i].dist < min1) {
            min1 = path[i].dist;
        }
    }
    var min2 = max + 1;
    for (var i = 0; i < path2.length; i++) {
        if (path2[i].dist < min2) {
            min2 = path2[i].dist;
        }
    }
    var min3 = max + 1;
    for (var i = 0; i < path3.length; i++) {
        if (path3[i].dist < min3) {
            min3 = path3[i].dist;
        }
    }
    console.log("Kruskal Length: " + path.length + " Min: " + min1)
    console.log(path);
    console.log("Dijkstra Length: " + path2.length + " Min: " + min2)
    console.log(path2)
    console.log("Dijkstra Heap Length: " + path3.length + " Min: " + min3)
    console.log(path3)
    if (path.length != path2.length) {
        console.log('fuck')
    }
}