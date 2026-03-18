// what is the difference between Buffer.alloc vs Buffer.allocUnsafe
import {Buffer} from "node:buffer";
const alloc = Buffer.alloc(4000);
const allocUnsafe = Buffer.allocUnsafe(4000);

console.log(alloc.buffer);
console.log(allocUnsafe.buffer);