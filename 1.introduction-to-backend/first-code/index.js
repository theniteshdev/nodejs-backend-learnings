const fs = require("fs")
const { exec } = require("child_process")

const text = fs.readFileSync("./data.txt");
console.log(String(text))
console.log("code exit.")

// console.log(globalThis)
// console.log(global)
console.log(global === globalThis); // this is true
// console.log(window);

// writing some text on a file
const writeFile = fs.writeFileSync("./app.js", "console.log('Hello, World');\nlet a = 'apple';\nconsole.log('Hmmm');")

console.log(writeFile); // return undefined

// rename a file
fs.renameSync("./app.js", "./app/index.js");

// deleting a file
// fs.unlinkSync("./app/index.js");

// lets open chrome application using nodejs
let isOpened = exec("google-chrome");
console.log(`Google chrome is openen on PID${isOpened.pid}`)
setTimeout(() => {
    exec(`kill ${isOpened.pid}`)
    console.log("google chrome closed")
}, 5000)

console.log("programme end");