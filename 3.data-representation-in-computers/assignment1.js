// using symbols- 2,4,6,5 i have to create a number

const sim = [2, 4, 6, 5];
const sim2 = [7, 3, 2];
let number = 0;
let number2 = 0;
sim.forEach((s, i) => {
    number += s * (10 ** i);
})
sim2.forEach((s, i) => {
    number2 += s * (10 ** i);
})
// console.log(number);
// console.log(number2);


function digitsToNumber(arr) {
    return arr.reduce((acc, curr, index) => acc + curr * (10 ** index), 0)
};

console.log(
    digitsToNumber([4, 5, 2, 4, 5])
)