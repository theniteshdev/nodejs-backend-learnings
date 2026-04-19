import net from 'node:net';

const allClients = {};
const tcpServer = net.createServer(socket => {
    socket.write("Welcome !");

    const uniqueId = new Date().getTime();
    allClients[uniqueId] = socket;

    socket.write(`userId: ${uniqueId}`);

    receiveMessage();
});

tcpServer.listen(5500, '0.0.0.0');

function receiveMessage() {
    Object.keys(allClients).forEach(key => {
        const socket = allClients[key];

        socket.on("data", (msg) => {
            console.log(`------start------`)
            console.log(`Message from: ${socket.remoteAddress}`);
            console.log(msg.toString());
            console.log(`------end--------\n\n`)
        });
    });
};

receiveMessage();

function sendMessageAll(data) {
    Object.keys(allClients).forEach(key => {
        const socket = allClients[key];
        socket.write(data);
    });
};

function sendMessage(data, userId) {
    Object.keys(allClients).forEach(key => {
        if (key === userId) {
            const socket = allClients[key];
            socket.write(data);
        }
    });
};

process.stdin;
process.stdin.on("data", dta => {
    sendMessageAll(dta);
});