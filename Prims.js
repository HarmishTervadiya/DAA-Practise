const n = parseInt(prompt("Enter number of nodes:"));
const nodes = [];
for (let i = 0; i < n; i++) {
    nodes.push(String.fromCharCode(97 + i)); // a, b, c, ...
}

// Build the graph as an adjacency matrix
let graph = Array.from({ length: n }, () => Array(n).fill(0));

console.log("Enter edge weights (0 for no edge):");
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        let weight = parseInt(prompt(`Weight between (${nodes[i]}, ${nodes[j]}):`));
        if (!isNaN(weight) && weight > 0) {
            graph[i][j] = weight;
            graph[j][i] = weight; // undirected graph
        }
    }
}

// Prim’s Algorithm
// Time Complexity: O(N^2)
let selected = Array(n).fill(false);
let parent = Array(n).fill(-1);
let key = Array(n).fill(Infinity);
key[0] = 0;

for (let count = 0; count < n - 1; count++) {
    // Pick the minimum key vertex from the set of vertices not yet included
    let min = Infinity, u = -1;
    for (let v = 0; v < n; v++) {
        if (!selected[v] && key[v] < min) {
            min = key[v];
            u = v;
        }
    }

    selected[u] = true;

    // Update key and parent of the adjacent vertices
    for (let v = 0; v < n; v++) {
        if (graph[u][v] && !selected[v] && graph[u][v] < key[v]) {
            parent[v] = u;
            key[v] = graph[u][v];
        }
    }
}

// Output the MST
console.log("\nMinimum Spanning Tree using Prim's Algorithm:");
let totalWeight = 0;
for (let i = 1; i < n; i++) {
    if (parent[i] !== -1) {
        console.log(`(${nodes[parent[i]]}, ${nodes[i]}) - ${graph[i][parent[i]]}`);
        totalWeight += graph[i][parent[i]];
    }
}
console.log(`Total weight of MST: ${totalWeight}`);
