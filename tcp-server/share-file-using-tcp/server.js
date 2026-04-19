import { createWriteStream } from 'node:fs';
import net from 'node:net'
const clientsSocket = {};
const server = net.createServer((socket) => {
    console.clear();
    clientsSocket[`${socket.address}`] = socket;
    console.log(`Connected to: ${socket.remoteAddress}`)

    socket.on("data", (msg) => {
        console.log(`${socket.remoteAddress}:${msg.toString()}`);
        const writeStream = createWriteStream("./client.pac.json");
        writeStream.write(msg)
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log("server bound");
});

process.stdin;
process.stdin.on("data", (str) => {
    Object.keys(clientsSocket).forEach((client) => {
        clientsSocket[client].write(str)
    })
});

