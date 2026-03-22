import fs from "node:fs";

// createReadableStream
const readStream = fs.createReadStream("./chars.txt", {
  autoClose: true,
  highWaterMark: 3
});

// readStream.close();
readStream.on("close", function () {
  console.log("Closed!!");
});

/*
ERROR HANDLING-
- EACCES (Permission)
- ENOENT (File not found)
- EBADF (invalid fd)
*/

// creating writable stream
const writeStream = fs.createWriteStream("./new-file2.txt", {
  autoClose: true,
  highWaterMark: 4
});

readStream.on("data", function (data) {
  let write = writeStream.write(data);
  if (!write) {
    readStream.pause();
  }
});

writeStream.on("drain", function () {
  console.log((readStream.bytesRead / 64) * 100);
  readStream.resume();
});
