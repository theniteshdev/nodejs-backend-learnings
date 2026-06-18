// @ts-check
"use-strict"

/**@type {string} */
const myname = "nitesh";

/**@type {string|number} */
let age = 3;

// age=true; // this is false

var isAdmin = true;
isAdmin = "appl"; // this is error


// works with function

/**@returns {boolean} */
/**@param {number} age */
function isAdult(age) {
    return age >= 18 ? true : false;
};

isAdult(45);
// age = "apple"; // this is not ok
isAdult(age);

age = "apple"; // this is ok
/**
 * @typedef {Object} User
 * @property {number} age
 * @property {string} name
 * @property {boolean|number} isMaried
 */

/**
 * @param {number} age
 * @param {string} name
 * @param {boolean|number} isMaried
 * @returns {User}
 */

function createUser(age, name, isMaried) {
    return {
        // id: 34,
        age, name, isMaried
    }
};
createUser(88, "nites", 5); 

/**@type {User} */
const user = {age: 45, isMaried: false, name: "aman"};
