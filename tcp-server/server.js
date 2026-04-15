import net from "node:net";
const server = net.createServer((socket) => {
    socket.on("connect", () => {
        console.log(`Connected to: ${socket.remoteAddress}`);
    });
    socket.on("data", (data) => {
        console.log(data.toString());
    })
});
server.listen(4000, '127.1.0.1', function(){
    console.log("listening..")
})