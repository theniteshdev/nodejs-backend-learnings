// we have mp4 file i have to convert it into base64 then view on browser

import fs from "node:fs/promises";

const data = await fs.readFile("./video.mp4", "base64");

await fs.writeFile("./test2.txt",data);

console.log("DONE")
