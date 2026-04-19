import { createReadStream } from 'node:fs';
import net from 'node:net'
import Stream from 'node:stream';

const socket = net.createConnection({ port: 3000, host: '127.1.1.1' });

socket.write("Hello World, I'm nitesh");
socket.on("data", (msg) => {
    console.log(`${socket.remoteAddress}: ${msg}`)
});
const readStream = createReadStream("./package.json");
readStream.pipe(socket);

process.stdin;
process.stdin.on('data', (str) => {
    socket.write(str);
});
