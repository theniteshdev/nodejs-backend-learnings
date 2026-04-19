import net from 'node:net'

// now create a  tcp server
const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        console.log(data.toString());
    });

    socket.write(`HTTP/1.1 200 OK \n`);
    socket.write(`Access-Control-Allow-Origin: *\n`);
    socket.write(`Access-Control-Expose-Headers: *\n`);
    socket.write(`header1: hello-ji\n`);
    socket.write(`header2: hello-ji2\n\n`);
    socket.write("Hmm Now ok")
    socket.end();
});
// listening to the clients on port- 4000
server.listen(4000, '0.0.0.0');