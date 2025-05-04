function karatsuba(x, y, metrics) {
    metrics.calls++; 

    x = x.toString();
    y = y.toString();

    const maxLength = Math.max(x.length, y.length);
    if (maxLength === 1) {
        return (parseInt(x) * parseInt(y)).toString();
    }

    while (x.length < maxLength) x = '0' + x;
    while (y.length < maxLength) y = '0' + y;

    const n = maxLength;
    const half = Math.floor(n / 2);

    const a = x.substring(0, n - half);
    const b = x.substring(n - half);
    const c = y.substring(0, n - half);
    const d = y.substring(n - half);

    const ac = karatsuba(a, c, metrics);
    const bd = karatsuba(b, d, metrics);
    const abcd = karatsuba(
        (BigInt(a) + BigInt(b)).toString(),
        (BigInt(c) + BigInt(d)).toString(),
        metrics
    );

    const ad_plus_bc = (BigInt(abcd) - BigInt(ac) - BigInt(bd)).toString();

    const product = BigInt(ac) * BigInt(10) ** BigInt(2 * half) +
                    BigInt(ad_plus_bc) * BigInt(10) ** BigInt(half) +
                    BigInt(bd);

    return product.toString();
}

const num1 = prompt("Enter the first large number:");
const num2 = prompt("Enter the second large number:");

const metrics = {
    calls: 0
};

const result = karatsuba(num1, num2, metrics);

const inputLength = Math.max(num1.length, num2.length);

const depthEstimate = Math.ceil(Math.log2(inputLength));

console.log("✳️ Result:", result);
console.log("🕒 Recursive Calls (Estimated Time Complexity):", metrics.calls);
console.log("🧠 Recursive Depth (Estimated Space Complexity):", depthEstimate);
console.log("🔁 Asymptotic Time Complexity: O(n^log₂3) ≈ O(n^1.585)");
console.log("🧵 Asymptotic Space Complexity: O(log n) due to recursion stack");
