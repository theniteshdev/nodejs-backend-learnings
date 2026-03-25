import fs from "node:fs";
// there are about - 12 String flags to open a file
// by deafult open in reading mode

// open a file in write mode
const openedfdw = fs.openSync("./file.txt", "r"); // this is set in the deafult
const openedfdr = fs.openSync("./file.txt", "w"); // this is flag set the mode to write
console.log(openedfdr);
console.log(openedfdw);

console.log(fs.readdirSync("/proc/self/fd"));