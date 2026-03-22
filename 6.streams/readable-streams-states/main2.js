import fs from "node:fs";

const writeStream = fs.createWriteStream("./sample1.txt", { highWaterMark: 4 });
console.log(writeStream.writableHighWaterMark, "bytes");

let writingStatus = writeStream.write("a");
console.log(writingStatus);
writingStatus = writeStream.write("a");
console.log(writingStatus);

writingStatus = writeStream.write("a");
console.log(writingStatus);

writingStatus = writeStream.write("a");
console.log(writingStatus);

writeStream.write("a");
console.log(writingStatus);

writingStatus = writeStream.write("a");
console.log(writingStatus);

console.log(writeStream.writableLength);
console.log(writeStream.writableHighWaterMark);
