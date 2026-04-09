import dgram from "node:dgram";

const socket = dgram.createSocket("udp4", () => {
    console.log("Socket created successfully.");
});

socket.on("message", (msg, remoteInfo) => {
    console.log(`Icoming Message: ${msg}`);
    console.log(`Message from: ${remoteInfo.address}`);
});

socket.on("connect", () => {
    console.log("socket connected successfully.")
});

socket.on("listening", () => {
    console.log(`Socket is listening..`);
})

socket.on("error", (err) => {
    console.log("error is there !!");
});

socket.bind("4000", "0.0.0.0", () => {
    console.log("Socket binded on port no- 4000");
});
