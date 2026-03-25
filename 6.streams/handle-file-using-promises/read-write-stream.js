import fs from "node:fs/promises"

async function readFileStream() {
    const readStream = fs.createReadStream("input.txt", {
        encoding: "utf-8"
    });

    for await (const chunk of readStream) {
        console.log(chunk);
    }
}

readFileStream();