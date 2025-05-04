function modExpo(x, y, p) {
    let result = 1;
    x = x % p;  
    if (x === 0) return 0; 

    let operations = 0;

    while (y > 0) {
        if (y % 2 === 1) {  
            result = (result * x) % p;
            operations++;
        }

        y = Math.floor(y / 2); 
        x = (x * x) % p;  
        operations++;
    }

    console.log("🕒 Total Operations (Time Complexity Estimate):", operations);
    console.log("🔁 Asymptotic Time Complexity: O(log y)");
    return result;
}

// === Input Handling ===
const x = parseInt(prompt("Enter base (x):"));
const y = parseInt(prompt("Enter exponent (y):"));
const p = parseInt(prompt("Enter modulus (p):"));

const result = modExpo(x, y, p);
console.log("Result:", result);
console.log("🧵 Asymptotic Space Complexity: O(1)");  // Constant space usage
