function kruskal(graph, src, dest) {
    //instead of creating a new data structure for the forest
    //I somewhat sloppily just add new data fields for the MST 
    //to my original graph 
    //get all edges in g
    var edges = graph.edges;
    edges.sort(function (a, b) {
        if (a.w > b.w) {
            return -1;
        }
        else if (a.w < b.w) {
            return 1;
        }
        else {
            return 0;
        }
    })
    for (var i = 0; i < graph.nodes.length; i++) {
        makeSet(graph.nodes[i]);
        //
        graph.nodes[i].kruskalEdges = []
    }
    var edgeCount = 0;
    for (var i = 0; i < edges.length; i++) {
        var u = edges[i].a;
        var v = edges[i].b;
        if (find(u).key != find(v).key) {
            u.kruskalEdges.push(edges[i]);
            v.kruskalEdges.push(edges[i]);
            edgeCount++;
            union(u, v);
        }
    }
    for (var i = 0; i < graph.nodes.length; i++) {
        graph.nodes[i].kVisited = false;
    }
    var path = dfsK(graph, graph.nodeDictionary[src], graph.nodeDictionary[dest])
    return path;
}

function dfsK(graph, src, dest) {
    if (src.key == dest.key) {
        return [dest.key];
    }
    else {
        src.kVisited = true;
        for (var i = 0; i < src.kruskalEdges.length; i++) {
            var edge = src.kruskalEdges[i];
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
                    maybePath.unshift(src.key);
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
    console.log("Kruskal: ")
    console.log(path);
    console.log("Dijkstra Array: ")
    console.log(path2)
    console.log("Dijkstra Heap: ")
    console.log(path3)
    if (path.length != path2.length) {
        console.log('fuck')
    }
}

function simpleTest() {
    var graph = new Graph(20);
    var n1 = new Node(1, graph);
    graph.addNode(n1);
    var n2 = new Node(2, graph);
    graph.addNode(n2);
    var n3 = new Node(3, graph);
    graph.addNode(n3);
    var n4 = new Node(4, graph);
    graph.addNode(n4);
    var n5 = new Node(5, graph);
    graph.addNode(n5);
    var n6 = new Node(6, graph);
    graph.addNode(n6);
    n1.addEdge(2, 7);
    graph.edges.push({
        a: n1
        , b: n2
        , w: 8
    });
    n1.addEdge(3, 9);
    graph.edges.push({
        a: n1
        , b: n3
        , w: 9
    });
    n1.addEdge(6, 14);
    graph.edges.push({
        a: n1
        , b: n6
        , w: 14
    });
    n2.addEdge(3, 10);
    graph.edges.push({
        a: n2
        , b: n3
        , w: 10
    });
    n2.addEdge(4, 15);
    graph.edges.push({
        a: n2
        , b: n4
        , w: 15
    });
    n3.addEdge(6, 2);
    graph.edges.push({
        a: n3
        , b: n6
        , w: 2
    });
    n3.addEdge(4, 11);
    graph.edges.push({
        a: n3
        , b: n4
        , w: 11
    });
    n4.addEdge(5, 6);
    graph.edges.push({
        a: n4
        , b: n5
        , w: 6
    });
    n5.addEdge(6, 9);
    graph.edges.push({
        a: n5
        , b: n6
        , w: 9
    });
    var path = kruskal(graph, 1, 5);
    var path2 = Dijkstra(graph, 1, 5);
    console.log("Kruskal: ")
    console.log(path);
    console.log("Dijkstra: ")
    console.log(path2)
}