// built-in NODEJS method

import {Buffer} from "node:buffer";
import fs from "node:fs/promises";

const data = await fs.readFile("./image.jpeg", "base64");

const base64 = Buffer.from(data);

await fs.writeFile("./test3.txt", base64);
const base64text = await fs.readFile("./test3.txt","utf-8");
const baseBuffer = Buffer.from(base64text,"base64");

await fs.writeFile("output.mp4",baseBuffer);