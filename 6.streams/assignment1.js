// show percentage of the progress

import fs from "node:fs";

const readStream = fs.createReadStream("./sample.txt", { highWaterMark: 4 });
// setting 4 bytes high water mark

readStream.on("data", function (chunk) {
    console.clear()
    console.log(`Reading: ${Math.round(((readStream.bytesRead / 64) * 100))}%`)
    readStream.pause();
    setTimeout(() => {
        readStream.resume();
    }, 200);
});
