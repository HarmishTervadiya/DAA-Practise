function bubbleSort(arr) {
    let n = arr.length, ops = 0;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            ops++;
            if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
    }
    return ops;
}


function insertionSort(arr) {
    let ops = 0;
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            ops++;
        }
        arr[j + 1] = key;
    }
    return ops;
}


function selectionSort(arr) {
    let ops = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            ops++;
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return ops;
}


function quickSort(arr, low = 0, high = arr.length - 1, count = { ops: 0 }) {
    if (low < high) {
        let pi = partition(arr, low, high, count);
        quickSort(arr, low, pi - 1, count);
        quickSort(arr, pi + 1, high, count);
    }
    return count.ops;
}

function partition(arr, low, high, count) {
    let pivot = arr[high], i = low - 1;
    for (let j = low; j < high; j++) {
        count.ops++;
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}


function mergeSort(arr, count = { ops: 0 }) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), count);
    const right = mergeSort(arr.slice(mid), count);
    return merge(left, right, count);
}

function merge(left, right, count) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        count.ops++;
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}



// Radix
function getMax(arr) {
    return Math.max(...arr);
}

function countingSort(arr, exp, ops) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
        ops.count++;
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
        let idx = Math.floor(arr[i] / exp) % 10;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
        ops.count++;
    }

    for (let i = 0; i < arr.length; i++) arr[i] = output[i];
}

function radixSort(arr) {
    const max = getMax(arr);
    const ops = { count: 0 };
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp, ops);
    }
    return ops.count;
}


function shellSort(arr) {
    let n = arr.length;
    let ops = 0;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i], j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
                ops++;
            }
            arr[j] = temp;
        }
    }
    return ops;
}


function runSort(name, sortFunc, returnSorted = false) {
    let input = prompt(`Enter array elements for ${name} (space-separated):`);
    let arr = input.trim().split(" ").map(Number);
    let arrCopy = [...arr];

    const start = performance.now(); // Start time
    let ops;
    let sortedOutput;

    if (name === "Merge Sort") {
        let counter = { ops: 0 };
        sortedOutput = sortFunc(arrCopy, counter);
        ops = counter.ops;
    } else if (name === "Quick Sort") {
        ops = sortFunc(arrCopy);
        sortedOutput = arrCopy;
    } else {
        ops = sortFunc(arrCopy);
        sortedOutput = arrCopy;
    }
    const end = performance.now(); // End time

    const executionTime = (end - start).toFixed(3); // in milliseconds

    // Estimate space: input array + copy + working vars (rough approximation)
    const estimatedSpaceBytes = (arr.length * 2 + 10) * 8; // assume 8 bytes per number
    const estimatedSpaceKB = (estimatedSpaceBytes / 1024).toFixed(2);

    console.log(`🔄 ${name} Result:`, sortedOutput);
    console.log(`🕒 Operation Count: ${ops}`);
    console.log(`⏱️ Execution Time: ${executionTime} ms`);
    console.log(`💾 Estimated Memory Usage: ~${estimatedSpaceKB} KB`);
}
