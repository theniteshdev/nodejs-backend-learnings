import fs from "node:fs";
// i have to write 3 lakh numbers without using stream but faster than stream
console.time();
// open a file - 1
const fd = fs.openSync("./assign.txt", 'w');

for(let i = 0; i <= 30000; i++){
    fs.writeSync(fd, `${i.toString()}\n`);
    if(i == 100000){
        fs.closeSync(fd);
    }
};
console.timeEnd();