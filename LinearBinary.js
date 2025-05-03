function linearSearch(arr, target) {
  const startTime = performance.now();

  let comparisons = 0;
  let result = -1;

  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    if (arr[i] === target) {
      result = i;
      break;
    }
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime; // in milliseconds

  const estimatedSpace = 4 + 4 + 4; // arr ref + comparisons + result (approx)

  return {
    index: result,
    comparisons: comparisons,
    timeMs: timeTaken,
    estimatedSpaceBytes: estimatedSpace,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
  };
}

function binarySearch(arr, target) {
  const startTime = performance.now();

  let left = 0,
    right = arr.length - 1;
  let comparisons = 0;
  let result = -1;
  const sortedArr = [...arr].sort((a, b) => a - b);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    if (sortedArr[mid] === target) {
      result = mid;
      break;
    } else if (sortedArr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  const endTime = performance.now();
  const timeTaken = endTime - startTime;

  const estimatedSpace = 4 * 5; // left, right, mid, result, comparisons (approx)

  return {
    index: result,
    comparisons: comparisons,
    timeMs: timeTaken,
    estimatedSpaceBytes: estimatedSpace,
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
  };
}

arr = prompt("Enter the array").split(",").map(Number);
value = parseInt(prompt("Enter the value to find"));
console.log(linearSearch(arr, value));
console.log(binarySearch(arr, value));
