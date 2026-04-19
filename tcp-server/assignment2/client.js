import { createReadStream } from 'node:fs';
import net from 'node:net'
import { pipeline } from 'node:stream';

const socket = net.createConnection({ port: 5500, host: "127.1.1.1" });

socket.on("data", msg => {
    console.log(`------start------`)
    console.log(`Message from: ${socket.remoteAddress}`);
    console.log(msg.toString());
    console.log(`------end--------\n\n`)
})

function sendFile(filePath, writeStream) {
    console.log("sendfile running..")
    filePath.toString().trim();
    const readStream = createReadStream(filePath);
    console.log("sendfile running..")
    pipeline(readStream, writeStream);
}

process.stdin;
process.stdin.on('data', dta => {
    const [cmd, path] = dta.toString().split("|");
    cmd.toString().trim();
    sendFile(`${path}\b`, socket);
    socket.write(String(dta).trim());
});
