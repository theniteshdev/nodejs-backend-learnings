import fs from "node:fs";
import { Buffer } from "node:buffer";

const buff = Buffer.from([0x61, 0x62, 0x63, 97]);

// write stream
const writeStream = fs.createWriteStream("./sample-data/test1.txt", {});
writeStream.write(buff, "hex", function (err) {
  if (err) console.log("Error");
  console.log(fs.readFileSync("./sample-data/test1.txt", "utf-8"));
});
