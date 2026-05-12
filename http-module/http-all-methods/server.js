import http from 'node:http';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello! Connection is kept alive.');
});

server.keepAliveTimeout = 6000;
server.headersTimeout = 65000;

server.listen(3000, '0.0.0.0');