const n = parseInt(prompt("Enter number of vertices:"));
const e = parseInt(prompt("Enter number of edges:"));

const adjMatrix = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
const visited = new Array(n + 1).fill(false);

for (let i = 0; i < e; i++) {
    let input = prompt(`Enter edge ${i + 1} (e.g. 1 2 or 1-2):`).replace("-", " ");
    let [u, v] = input.split(" ").map(Number);
    adjMatrix[u][v] = 1;
    adjMatrix[v][u] = 1; 
}

const start = parseInt(prompt("Enter starting node:"));

let operations = 0;
let maxDepth = 0;

function dfs(node, depth) {
    visited[node] = true;
    console.log(node);
    operations++;
    if (depth > maxDepth) maxDepth = depth;

    for (let i = 1; i <= n; i++) {
        operations++;
        if (adjMatrix[node][i] === 1 && !visited[i]) {
            dfs(i, depth + 1);
        }
    }
}

console.log("DFS Traversal:");
dfs(start, 1);

console.log("📋 DFS complete.");
console.log("🕒 Total Operations (Time Complexity Estimate):", operations);
console.log("📚 Max Recursion Depth (Space Complexity Estimate):", maxDepth);
console.log("🔁 Asymptotic Time Complexity: O(V + E)");
console.log("🧵 Asymptotic Space Complexity: O(V) in recursion stack");
