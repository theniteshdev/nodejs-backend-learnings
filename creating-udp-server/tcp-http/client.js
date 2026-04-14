import net from 'node:net'

const socket = net.createConnection({ port: 4000, host: "127.1.1.1" });

socket.on("data", (data) => {
    console.log(data.toString());
});

setTimeout(() => {
    socket.write("Hello from client.js");
    socket.end();
})