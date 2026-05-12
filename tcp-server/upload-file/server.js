import { createWriteStream } from 'node:fs';
import net from 'node:net'

const server = net.createServer((socket) => {
    socket.write(`HTTP/1.1 200 OK\n\n`);

    const writeStream = createWriteStream("./uploaded-file.txt");
    socket.on('data', (chunks) => {
        writeStream.write(chunks);
        if (chunks.toString().includes("--")) {
            socket.end("File Uploaded Succesfully !");
        }
    });


});

server.listen(5000, '0.0.0.0');