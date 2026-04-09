import dgram from "node:dgram";


const server = dgram.createSocket('udp6');

const PORT = 41234;

server.on('message', (msg, rinfo) => {
    console.log(`Message from ${rinfo.address}:${rinfo.port}`);
    console.log(`Data: ${msg}`);

    server.send(
        Buffer.from('Hello from IPv6 UDP server!'),
        rinfo.port,
        rinfo.address
    );
});

// Error handling
server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});

// Start server
server.bind(PORT, '::', () => {
    console.log(`UDP IPv6 server running on port ${PORT}`);
});