import fs from 'node:fs'

const buffer16KB = Buffer.alloc(16384);

const fd = fs.openSync("./number.txt", 'w');
const internalBuffer = Buffer.alloc(16384);

for (let i = 1; i <= 100000; i++) {
    const bytesReturn = internalBuffer.write(i.toString(), );
};
