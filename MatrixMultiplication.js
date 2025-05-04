
const n = parseInt(prompt("Enter number of rows for Matrix A:"));
const m = parseInt(prompt("Enter number of columns for Matrix A / rows for Matrix B:"));
const p = parseInt(prompt("Enter number of columns for Matrix B:"));

function readMatrix(rows, cols, name) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = parseInt(prompt(`Enter ${name}[${i}][${j}]:`));
        }
    }
    return matrix;
}

console.log("📥 Enter values for Matrix A:");
const A = readMatrix(n, m, "A");

console.log("📥 Enter values for Matrix B:");
const B = readMatrix(m, p, "B");

const C = Array.from({ length: n }, () => Array(p).fill(0));

// Time Complexity: O(n * m * p)
let operations = 0;
let maxMemoryUsed = n * p;

console.log("🔄 Performing Matrix Multiplication...");
for (let i = 0; i < n; i++) {
    for (let j = 0; j < p; j++) {
        for (let k = 0; k < m; k++) {
            C[i][j] += A[i][k] * B[k][j];
            operations++;
        }
    }
}

console.log("✅ Resultant Matrix C:");
for (let i = 0; i < n; i++) {
    console.log(C[i].join(" "));
}

console.log("📋 Matrix Multiplication complete.");
console.log("🕒 Total Multiplications (Time Complexity Estimate):", operations);
console.log("🔁 Asymptotic Time Complexity: O(n * m * p)");
console.log("🧠 Estimated Space Usage for Result Matrix: O(n * p) =", maxMemoryUsed, "cells");
