import fs from "node:fs";
let t = true;
console.time("start");
for (let i = 1; i <= 300000; i++) {
    if (t) {
        fs.writeFileSync("thirty-thousand.txt", `${i}`);
        t = false;
    } else {
        fs.appendFileSync("./thirty-thousand.txt", `\n${i}`);
    }
}

console.timeEnd("start");