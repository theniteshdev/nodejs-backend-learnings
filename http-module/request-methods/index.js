import http from 'node:http';

const server = http.createServer((req, res) => {
    // res.statusCode = 400;
    console.log(`URL:: ${req.url}`)

    if (req.url == "/bad") {
        res.statusCode = 400;
    } else if (req.url == "/not") {
        res.statusCode = 404;
    } else if (req.url == "srver") {
        res.statusCode = 333;
    } else {
        // res.statusCode = 200;
        res.statusCode = 333;
    }
    req.on("data", (chunks) => {
        console.log(`client:: ${chunks.toString()}`);
    });
    res.write("Hello World from nodejs server.");
    res.end();
});

server.listen(4000, '0.0.0.0', () => {
    console.log("serer up!")
});





/*
there are seven request methods in http and they are-
1. POST
2. GET
3. DELETE
4. PUT
5. PATCH
6. HEAD
7. OPTIONS
// these are guidlines but depends on me
*/