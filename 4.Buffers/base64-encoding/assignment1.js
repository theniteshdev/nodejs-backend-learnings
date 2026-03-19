import fs from "node:fs/promises";

const base64 = await fs.readFile("./image.jpeg", "base64");

await fs.writeFile("./test.txt", base64);
// console.log(base64);

