function dijkstraWithMetrics(graph, start) {
    const startTime = performance.now();
  
    const distances = {};
    const visited = new Set();
    const nodes = Object.keys(graph);
  
    // Initialize distances
    for (const node of nodes) {
      distances[node] = Infinity;
    }
    distances[start] = 0;
  
    while (visited.size < nodes.length) {
      // Select the unvisited node with the smallest distance
      let currentNode = null;
      let minDistance = Infinity;
  
      for (const node of nodes) {
        if (!visited.has(node) && distances[node] < minDistance) {
          minDistance = distances[node];
          currentNode = node;
        }
      }
  
      if (currentNode === null) break; // Remaining nodes are unreachable
  
      visited.add(currentNode);
  
      // Update distances to neighbors
      for (const neighbor in graph[currentNode]) {
        const newDist = distances[currentNode] + graph[currentNode][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
        }
      }
    }
  
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
  
    const estimatedSpace = nodes.length * 8; // Very rough estimate (2 variables per node)
  
    return {
      distances,
      timeMs: timeTaken,
      estimatedSpaceBytes: estimatedSpace,
      timeComplexity: "O(n^2) (without priority queue)",
      spaceComplexity: "O(n)"
    };
  }
  
  // Step 1: Input the nodes
  const nodesInput = prompt("Enter nodes as a comma-separated list (e.g., A,B,C,D):");
  const nodes = nodesInput.split(",").map(node => node.trim());
  
  // Step 2: Input the edges
  const edgesInput = prompt("Enter edges with weights (e.g., A-B:4, B-C:5, A-C:2):");
  const edges = edgesInput.split(",").map(edge => edge.trim());
  
  // Step 3: Input the starting node
  const startNode = prompt("Enter the starting node (e.g., A):");
  
  // Step 4: Build the graph from the input
  const graph = {};
  
  nodes.forEach(node => {
    graph[node] = {};
  });
  
  edges.forEach(edge => {
    const [edgePart, weight] = edge.split(":");
    const [from, to] = edgePart.split("-");
    graph[from][to] = parseInt(weight);
    graph[to][from] = parseInt(weight);  // Assuming undirected graph
  });
  
  // Step 5: Run Dijkstra's Algorithm and output results
  const result = dijkstraWithMetrics(graph, startNode);
  
  console.log("Shortest Distances from " + startNode + ":");
  console.log(result.distances);
  console.log(`Execution time: ${result.timeMs} ms`);
  console.log(`Time Complexity: ${result.timeComplexity}`);
  console.log(`Space Complexity: ${result.spaceComplexity}`);