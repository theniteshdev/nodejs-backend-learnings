import { createReadStream, readFile, readFileSync } from 'node:fs';
import http from 'node:http'

const server = http.createServer(async (req, res) => {
    if (req.url == '/') {
        const readStream = createReadStream('./public/index.html');
        readStream.pipe(res);
    } else {
        const readStream = createReadStream(`./public${req.url}`);
        readStream.pipe(res);
        readStream.on('error', (err) => {
            const notFoundPage = createReadStream("./public/NotFoundPage.html");
            notFoundPage.pipe(res);
        })
    }
});

server.listen(3000, '0.0.0.0');