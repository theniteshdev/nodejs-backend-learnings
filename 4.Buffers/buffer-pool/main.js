import {Buffer } from "node:buffer";

const a = Buffer.alloc(4);
const b = Buffer.allocUnsafe(8);
const c = Buffer.allocUnsafe(4);


const d = Buffer.allocUnsafeSlow()

b[0] = 0x45;
c[0] = 0x45;

// console.log(a.byteLength);
// console.log(a.byteLength);

console.log(b.byteOffset);
console.log(c.byteOffset);

console.log("End")