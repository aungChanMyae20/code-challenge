function sum_to_n_a(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
}

function sum_to_n_b(n) {
    if (n <= 0) return 0;
    return n + sumRecursive(n - 1);
}

function sum_to_n_c(n) {
    return (n * (n + 1)) / 2;
}

[5, 6, 11, 15, 21, 28, 33, 39, 47, 100].map(n => {
    console.log('n: ', n);
    console.log('Iteration Result: ', sum_to_n_a(n));
    console.log('Recursive Result: ', sum_to_n_b(n));
    console.log('Formula Result: ', sum_to_n_c(n));
    console.log('---------------------');
});