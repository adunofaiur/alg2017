function sixGraph() {
    var graph = new Graph(500);
    var edgeDict = [];
    for (var i = 0; i < 5000; i++) {
        var node = new Node(i, graph);
        graph.addNode(node);
        edgeDict[node.key] = 0;
    }
    for (var i = 0; i < graph.nodes.length; i++) {
        var node = graph.nodes[i];
        for (var j = 1; j < 5000; j++) {
            if (edgeDict[node.key] > 5) break;
            var targetNodeId = i + j;
            if (targetNodeId >= 5000) break;
            if (edgeDict[targetNodeId] > 5) {
                continue
            }
            else {
                var weight = Math.floor((Math.random() * 500) + 0);
                graph.nodes[i].addEdge(graph.nodes[targetNodeId].key, weight);
                graph.edges.push({
                    a: graph.nodes[targetNodeId]
                    , b: graph.nodes[i]
                    , w: weight
                });
                edgeDict[targetNodeId]++;
                edgeDict[node.key]++;
            }
        }
    }
    return graph;
}

function addPaths(graph, count) {
    var testingPair = [];
    for (var i = 0; i < count; i++) {
        var srcKey = Math.floor((Math.random() * graph.nodes.length) + 0);
        var destKey = Math.floor((Math.random() * graph.nodes.length) + 0);
        addPath(graph, srcKey, destKey)
        testingPair.push({
            src: srcKey
            , dest: destKey
        })
    }
    return testingPair;
}

function isEdge(graph, a, b) {
    for (var i = 0; i < a.adjacencyArray.length; i++) {
        var e = a.adjacencyArray[i];
        if (e.destination == b.key) {
            return true
        }
    }
    return false;
}

function addPath(graph, src, dest) {
    var prev = 0;
    var first = 0;
    var last = 4999;
    if (src == 0) {
        first = 1;
    }
    if (dest = 4999) {
        last = 4998;
    }
    for (var i = 1; i < 5000; i++) {
        if (i == dest) continue
        if (i == src) continue
        var pNode = graph.nodeDictionary[prev];
        var w = graph.nodes[i];
        if (!isEdge(graph, pNode, w)) {
            var weight = Math.floor((Math.random() * 500) + 0);
            pNode.addEdge(w.key, weight);
            graph.edges.push({
                a: w
                , b: pNode
                , w: weight
            });
        }
        prev = i;
    }
    var weight = Math.floor((Math.random() * 500) + 0);
    graph.nodeDictionary[first].addEdge(src, weight);
    graph.edges.push({
        a: graph.nodeDictionary[src]
        , b: graph.nodeDictionary[first]
        , w: weight
    });
    weight = Math.floor((Math.random() * 500) + 0);
    graph.nodeDictionary[last].addEdge(dest, weight);
    graph.edges.push({
        a: graph.nodeDictionary[dest]
        , b: graph.nodeDictionary[last]
        , w: weight
    });
}
var kruskalsHeapSortTimers = [];

function test() {
    var degreeSixGraph = sixGraph();
    var twentyPercentGraph = GenerateGraph(5000, 20, 0, 500);
    var sixTest = addPaths(degreeSixGraph, 5)
    var twentyTest = addPaths(twentyPercentGraph, 5)
        //timers
    var sparseTiming = [];
    var denseTiming = [];
    var endArrayDense = [];
    for (var i = 0; i < sixTest.length; i++) {
        var timing = {};
        var start = performance.now();
        Dijkstra(degreeSixGraph, sixTest[i].src, sixTest[i].dest);
        var elapsed = performance.now() - start;
        timing.dijkstraArray = elapsed;
        start = performance.now();
        DijktraHeap(degreeSixGraph, sixTest[i].src, sixTest[i].dest);
        elapsed = performance.now() - start;
        timing.dijkstraHeap = elapsed;
        start = performance.now();
        kruskal(degreeSixGraph, sixTest[i].src, sixTest[i].dest);
        elapsed = performance.now() - start;
        timing.kruskal = elapsed;
        sparseTiming.push(timing)
    }
    for (var i = 0; i < twentyTest.length; i++) {
        var timing = {};
        var start = performance.now();
        var x = Dijkstra(twentyPercentGraph, twentyTest[i].src, twentyTest[i].dest);
        var elapsed = performance.now() - start;
        timing.dijkstraArray = elapsed;
        console.log(x.length)
        start = performance.now();
        x = DijktraHeap(twentyPercentGraph, twentyTest[i].src, twentyTest[i].dest);
        elapsed = performance.now() - start;
        timing.dijkstraHeap = elapsed;
        console.log(x.length)
        start = performance.now();
        x = kruskal(twentyPercentGraph, twentyTest[i].src, twentyTest[i].dest);
        elapsed = performance.now() - start;
        timing.kruskal = elapsed;
        console.log(x.length)
        denseTiming.push(timing)
    }
    var averageSparseDA = 0;
    var averageSparseDH = 0;
    var averageSparseK = 0;
    for (var i = 0; i < sparseTiming.length; i++) {
        var t = sparseTiming[i];
        averageSparseDA += t.dijkstraArray;
        averageSparseDH += t.dijkstraHeap;
        averageSparseK += t.kruskal;
    }
    averageSparseDA = averageSparseDA / 5;
    averageSparseDH = averageSparseDH / 5;
    averageSparseK = averageSparseK / 5;
    var averageDenseDA = 0;
    var averageDenseDH = 0;
    var averageDenseK = 0;
    for (var i = 0; i < denseTiming.length; i++) {
        var t = denseTiming[i];
        averageDenseDA += t.dijkstraArray;
        averageDenseDH += t.dijkstraHeap;
        averageDenseK += t.kruskal;
    }
    averageDenseDA = averageDenseDA / 5;
    averageDenseDH = averageDenseDH / 5;
    averageDenseK = averageDenseK / 5;
    var avgHeapSparse = 0;
    for (var i = 0; i < 5; i++) {
        avgHeapSparse += kruskalsHeapSortTimers[i].time;
    }
    var avgHeapDense = 0;
    for (var i = 5; i < 10; i++) {
        avgHeapDense += kruskalsHeapSortTimers[i].time;
    }
    avgHeapDense = avgHeapDense / 5;
    avgHeapSparse = avgHeapSparse / 5;
    $('#daSAvg').text(averageSparseDA)
    $('#dhSAvg').text(averageSparseDH)
    $('#kSAvg').text(averageSparseK)
    $('#daDAvg').text(averageDenseDA)
    $('#dhDAvg').text(averageDenseDH)
    $('#kDAvg').text(averageDenseK)
    $('#kSEdge').text(avgHeapSparse)
    $('#kDEdge').text(avgHeapDense)
}