import fs from "node:fs";
// States of Writable Stream-
/*
    1. Writable State
    2. Corked State
*/


const writableStream = fs.createWriteStream("./new-file.txt");

console.log(writableStream.writable); // true
writableStream.write("Wrting...");
writableStream.end("OK Fine!"); // ending of the writable state

console.log(writableStream.writable); // now its false


console.log(writableStream.writableCorked);