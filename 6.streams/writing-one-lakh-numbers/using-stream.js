import fs from 'node:fs'

console.time("measuring time-")
const writeStream = fs.createWriteStream('./number-using-stream.txt', {
    autoClose: true,
    highWaterMark: 1073741824
});

for (let i = 1; i <= 300000; i++) {
    writeStream.write(`${i}\n`);
};
writeStream.close(() => {
    console.log("closed..")
})
console.timeEnd('measuring time-');