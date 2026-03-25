import fs from 'node:fs/promises'

const fileHandle = await fs.open("./test.txt", 'w');
console.log(fileHandle.fd);

// close file
fileHandle.close();