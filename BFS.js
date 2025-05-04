const n = parseInt(prompt("Enter number of vertices:"));
const e = parseInt(prompt("Enter number of edges:"));

// Initialize adjacency matrix and visited array
const adjMatrix = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
const visited = new Array(n + 1).fill(false);

// Read edges and build adjacency matrix
for (let i = 0; i < e; i++) {
    let input = prompt(`Enter edge ${i + 1} (e.g. 1 2 or 1-2):`).replace("-", " ");
    let [u, v] = input.split(" ").map(Number);
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1; // assuming undirected graph
}

// Read starting node
const start = parseInt(prompt("Enter starting node:"));

// === BFS with metrics ===
const queue = [];
queue.push(start);
visited[start] = true;

let operations = 0;
let maxQueueSize = 1;

console.log("BFS Traversal:");
while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    operations++;

    for (let i = 1; i <= n; i++) {
        operations++;
        if (adjMatrix[node][i] === 1 && !visited[i]) {
            queue.push(i);
            visited[i] = true;
            if (queue.length > maxQueueSize) {
                maxQueueSize = queue.length;
            }
        }
    }
}

// === Output Metrics ===
console.log("📋 BFS complete.");
console.log("🕒 Total Operations (Time Complexity Estimate):", operations);
console.log("🧠 Max Queue Size During Execution (Space Complexity Estimate):", maxQueueSize);
console.log("🔁 Asymptotic Time Complexity: O(V + E)");
console.log("🧵 Asymptotic Space Complexity: O(V)");
