import dgram from "node:dgram";

const socket = dgram.createSocket("udp4", () => {
    console.log("Socket created successfully.");
});

socket.on("message", (msg, remoteInfo) => {
    console.log(msg)
    console.log(remoteInfo)
})

socket.send("Hello World from Nitesh's Client", 4000, '127.1.1.1');
