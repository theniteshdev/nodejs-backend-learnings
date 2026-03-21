import fs, { read } from "node:fs";

const readStream = fs.createReadStream("./test.txt", { autoClose: false });
readStream.on("data", function (chunk) {
    console.log(chunk);
});


readStream.on("end", function () {
    readStream.close((err) => {
        console.log("closed manually.");
    });
})

readStream.on("close", function () {
    console.log("closed!")
});

readStream.on("readable", function(){
    console.log(readStream.read(3).toString())
})