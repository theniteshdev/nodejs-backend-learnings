// console.log(0b1100001 === 0b1100001);
// console.log(parseInt("0b11111001100001000", 2) === parseInt("0xF09F8C88", 16))

import fs from "fs/promises";
const content = await fs.readFile("./practice.txt");
content.forEach((v) => {
    console.log(v, "\t:\t", v.toString(2).padStart(8, 0));
});