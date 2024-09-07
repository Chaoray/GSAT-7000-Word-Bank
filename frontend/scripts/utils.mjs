const $ = (p) => document.querySelector(p);

function rand_choice(arr=[], weight=undefined) {
    if (weight === undefined) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    let sum = weight.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    let acc = 0;
    for (let i in arr) {
        acc += weight[i];
        if (r < acc) {
            return arr[i];
        }
    }
}

export {
    $,
    rand_choice
};
