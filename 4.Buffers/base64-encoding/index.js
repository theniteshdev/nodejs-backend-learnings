console.log(btoa("apple"));
console.log(atob("YXBwbGU="));

/*
Sir, you teach us how to covert ascii character to base64 encoding but what about unicode's characters like emojies,
So, to convert enojies we have-
    first covert it into binary
    then covery it into base64
*/

// onsole.log(parseInt("111000", 2));
// console.log(parseInt("101001", 2));
// console.log(parseInt("110010", 2));
// console.log(parseInt("000101", 2));
// console.log(btoa("✅"))

const bytes = new TextEncoder().encode("Hello 🌍");
const base64 = btoa(String.fromCharCode(...bytes));

console.log(bytes)
console.log(base64)