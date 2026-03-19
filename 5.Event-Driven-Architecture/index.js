import fs from "node:fs";
// import fsPromises from "node:fs/promises";

setTimeout(()=>{
    console.log(new Date().getMilliseconds());
}, 0);

// Async I/O
// await fsPromises.writeFile("test.txt", "Hello, World");
// console.log("Done")

// Sync I/O
fs.writeFileSync("test3.txt", "hel3",)