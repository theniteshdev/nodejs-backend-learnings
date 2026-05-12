import http from 'node:http';

const server = http.createServer((req, res) => {

});
http.setMaxIdleHTTPParsers = 300000000;
server.listen(3000, '0.0.0.0', (err) => {
    console.log("Server Up");
});