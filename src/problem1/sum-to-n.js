function sumIteration(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

function sumRecursive(n) {
    if (n <= 0) return 0;
    return n + sumRecursive(n - 1);
}

function sumFormula(n) {
    return (n * (n + 1)) / 2;
}

[5, 6, 11, 15, 21, 28, 33, 39, 47, 100].map(n => {
    console.log('n: ', n);
    console.log('Iteration Result: ', sumIteration(n));
    console.log('Recursive Result: ', sumRecursive(n));
    console.log('Formula Result: ', sumFormula(n));
    console.log('---------------------');
});