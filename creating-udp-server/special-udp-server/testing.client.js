import dgram from 'node:dgram'
const socket = dgram.createSocket("udp6", () => {
    console.log("Socket created successfully !!");
});

socket.send("Message from client !!", 3000, "0::0");
