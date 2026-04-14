import net from 'node:net'

const server = net.createServer((socket) => {
    console.log(`connected:: ${socket.remoteAddress}`);
    
    socket.on("data", (data) => {
        // console.log(data.toString());
        socket.write("HTTP\n\nHello from tcp server")
        socket.end();
    });
    socket.on("close", (had) => {
        console.log(`disconnected:: ${socket.remoteAddress}`)
    })
});

// server.on("connection", (socket) => {
//     console.log(`connected:: ${socket.remoteAddress}`)
//     socket.on("data", (data) => {
//         // console.log(data.toString());
//         socket.write("HTTP\n\nHello from tcp server")
//         socket.end();
//     });
//     socket.on("close", (had) => {
//         console.log(`disconnected:: ${socket.remoteAddress}`)
//     })
// })

server.listen(4000, '0.0.0.0', () => {
    console.log("listening...");
});