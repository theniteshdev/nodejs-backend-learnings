/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        let n1 = nums[i];
        for (let j = 0; j < nums.length; j++) {
            if (i != j && n1 + nums[j] === target) {
                return [i, j];
            }
        }
    }
};

// console.log(twoSum([2, 4, 5], 4));

var reverse = function (x) {
  
};

console.log(reverse(123))