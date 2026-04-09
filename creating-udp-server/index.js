import dgram from 'node:dgram'; // dgram means data gram

const socket = dgram.createSocket("udp4");

// socket -> this is a event emitter

socket.on("message", (a, b) => {
    console.log(a, b);
})

// socket.on("listening", ()=>{
//     console.log("socket listening...")
//     console.log(socket.address());
// })

// socket.bind(); -> start listnening with random port

socket.bind({port: 5000, address: "0.0.0.0"}, () => {
    console.log("Listening on")
    console.log(socket.address().port)
    console.log(socket.address().address)
})