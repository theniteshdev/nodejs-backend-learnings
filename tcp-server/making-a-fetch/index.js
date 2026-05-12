import net from 'node:net'

const server = net.createServer((socket) => {
    console.log(`Connected to ${socket.remoteAddress}`);
    socket.write("HTTP/1.1 200 ok\n");
    socket.write(`Content-Type: application/json; chatset=utf-8\n`);
    socket.write(`Access-Control-Origin-Allow: * \n`);
    socket.write(`Access-Control-Expose-Headers: * \n\n`);

    socket.write(JSON.stringify({
        "username": "nitesh-kumar-gosai",
        "age": 45,
        "tech-stack": "nodejs",
        "role": "backend-engineer",
        "language": "javascript/js,typescript/ts"
    }));

    socket.on("error", (err) => { console.log(err.message) });
    socket.on("unpipe", (er) => { console.log(er) });
    socket.end();

});

server.listen(3000, "0.0.0.0");

/*
// useful headers
 socket.write('HTTP/1.1 200 OK \n')
 socket.write("Access-Control-Origin-Allow: *\n")
 socket.write(`Content-Length:${stats.size}\n`);
 socket.write("Access-Control-Expose-Headers: *\n")
 socket.write("Content-Type: application/pdf; chatset=utf-8\n\n")
 socket.write("Content-Disposition: attachment; filename=ff.txt\n")
 socket.write("Content-Type: plain/txt; chatset=utf-8\n\n")
 const readstream = createReadStream("./ts-notes.pdf")
 const readstream = createReadStream("./sampl.txt")
 readstream.pipe(socket);
 */