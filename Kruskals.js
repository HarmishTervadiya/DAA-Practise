class Edge {
    constructor(u, v, w) {
        this.u = u;
        this.v = v;
        this.w = w;
    }
}

// Union-Find (Disjoint Set Union) with path compression
function find(parent, i) {
    if (parent[i] !== i)
        parent[i] = find(parent, parent[i]);
    return parent[i];
}

function union(parent, rank, x, y) {
    const xroot = find(parent, x);
    const yroot = find(parent, y);

    if (rank[xroot] < rank[yroot]) {
        parent[xroot] = yroot;
    } else if (rank[xroot] > rank[yroot]) {
        parent[yroot] = xroot;
    } else {
        parent[yroot] = xroot;
        rank[xroot]++;
    }
}

// Main logic
const n = parseInt(prompt("Enter number of nodes:")); // number of nodes
const nodes = [];
for (let i = 0; i < n; i++) {
    nodes.push(String.fromCharCode(97 + i)); // a, b, c, ...
}

const edges = [];

console.log("Enter edge weights (0 means no edge)");
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
        let input = prompt(`Weight between (${nodes[i]}, ${nodes[j]}):`);
        let w = parseInt(input);
        if (w !== 0 && !isNaN(w)) {
            edges.push(new Edge(i, j, w));
        }
    }
}

// Kruskal’s algorithm
// Time Complexity: O(E log E + E*α(N)) ≈ O(E log E)
edges.sort((a, b) => a.w - b.w);

let parent = [];
let rank = [];
for (let i = 0; i < n; i++) {
    parent[i] = i;
    rank[i] = 0;
}

const result = [];
let totalWeight = 0;

for (let edge of edges) {
    const uRoot = find(parent, edge.u);
    const vRoot = find(parent, edge.v);

    if (uRoot !== vRoot) {
        result.push(edge);
        totalWeight += edge.w;
        union(parent, rank, uRoot, vRoot);
    }
}

// Output
console.log("\nMinimum Spanning Tree Edges:");
result.forEach(edge => {
    console.log(`(${nodes[edge.u]}, ${nodes[edge.v]}) - ${edge.w}`);
});
console.log(`Total weight of MST: ${totalWeight}`);
