import fs from "node:fs";
import { pipeline } from "node:stream";

const readStream = fs.createReadStream("./sample-data/index.html");
const writeStream = fs.createWriteStream("./sample-data/index.html");

pipeline(readStream, writeStream, (error) => {
  console.log("Error", error?.message);
});