import fs from 'node:fs'

const fd = fs.openSync("./file.txt")

console.log(fd)

const myBuff = Buffer.alloc(26);

let buffer = fs.read(parseInt(String(fd)), {
    position: 2,
    length: 2,
    offset: 2,
    buffer: myBuff,
}, (err, btyesRead, buffData) => {
    if (err) {
        console.log(err);
    };
    console.log(btyesRead);
    console.log(buffData.toString());
    // console.log()
});

// console.log(buffer); // this is undefined