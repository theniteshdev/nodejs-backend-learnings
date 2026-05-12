import { createReadStream, fstat } from "node:fs";
import { stat } from "node:fs/promises";
import net from "node:net";

const server = net.createServer(async (socket) => {
    // const stats = await stat("./ts-notes.pdf")
    const stats = await stat("./sampl.txt")
    socket.write('HTTP/1.1 200 OK \n')
    socket.write("Access-Control-Origin-Allow: *\n")
    // socket.write(`Content-Length:${stats.size}\n`);
    socket.write("Access-Control-Expose-Headers: *\n")
    // socket.write("Content-Type: application/pdf; chatset=utf-8\n\n")
    socket.write("Content-Disposition: attachment; filename=ff.txt\n")
    socket.write("Content-Type: plain/txt; chatset=utf-8\n\n")
    // const readstream = createReadStream("./ts-notes.pdf")
    const readstream = createReadStream("./sampl.txt")
    // readstream.pipe(socket);

    readstream.on("data", (chnks) => {
        if (!socket.write(chnks)) {
            readstream.pause();
        }
    });
    socket.on("error", (err) => {
        console.log(err.message)
    })

    readstream.on("pause", () => {
        console.log("paused");
    });
    readstream.on("resume", () => {
        console.log("resume");
    });
    // resume the data sending again
    socket.on("drain", () => {
        readstream.resume();
    });

    readstream.on("end", () => {
        console.log("file sent.")
    });

    // socket.end({ "whoami": "iamnitesh", "myage": 34 });
});

server.listen(4999, '0.0.0.0');
