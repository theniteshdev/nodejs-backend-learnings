import fs from "fs";
const buffer = new ArrayBuffer(.1 * 1024 ** 3);
// create 1.99GB of buffer
const view = new DataView(buffer);

// buffer.setInt8(0, 1); // this is not the method for buffer
// console.log(buffer)

for (let i = 0; i < buffer.byteLength; i++) {
    view.setInt8(i, i + 1);
    // console.log(i + 1)
};

console.log("loggin buffer");
// console.log(buffer);
console.log("loggin view");

fs.writeFileSync("helloju.txt", view)
let data = fs.readFileSync("./helloju.txt");
console.log(data.toString())