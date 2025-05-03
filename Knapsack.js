function fractionalKnapsack(weights, values, capacity) {
    const startTime = performance.now();
  
    const items = weights.map((w, i) => ({
      weight: w,
      value: values[i],
      ratio: values[i] / w,
    }));
  
    // Sort by value-to-weight ratio (descending)
    items.sort((a, b) => b.ratio - a.ratio);
  
    let totalValue = 0;
    let remaining = capacity;
  
    for (const item of items) {
      if (item.weight <= remaining) {
        totalValue += item.value;
        remaining -= item.weight;
      } else {
        // Take fraction of the item
        totalValue += item.ratio * remaining;
        break; // Knapsack is full
      }
    }
  
    const endTime = performance.now();
  
    return {
      totalValue,
      timeMs: endTime - startTime,
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    };
  }
  
  
  const weights = prompt("Enter weights (comma-separated): ").split(",").map(Number);
  const values = prompt("Enter values (comma-separated): ").split(",").map(Number);
  const capacity = parseInt(prompt("Enter capacity: "), 10);
  
  console.log(fractionalKnapsack(weights, values, capacity));
  
  